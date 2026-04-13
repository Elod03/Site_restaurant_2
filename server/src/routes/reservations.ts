import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const reservationSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  time: z.string(),
  guests: z.number().min(1).max(20),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  occasion: z.string().optional(),
  notes: z.string().optional(),
});

// Get all reservations (Admin)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { status, date, page = '1', limit = '20' } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    if (date) where.date = { gte: new Date(date as string) };

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        orderBy: [{ date: 'desc' }, { time: 'desc' }],
        skip,
        take: parseInt(limit as string),
      }),
      prisma.reservation.count({ where }),
    ]);

    res.json({
      reservations,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Get reservations error:', error);
    res.status(500).json({ error: '获取预订失败' });
  }
});

// Get reservation by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!reservation) {
      return res.status(404).json({ error: '预订不存在' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Get reservation error:', error);
    res.status(500).json({ error: '获取预订失败' });
  }
});

// Get reservations by date
router.get('/date/:date', async (req: AuthRequest, res: Response) => {
  try {
    const targetDate = new Date(req.params.date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const reservations = await prisma.reservation.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { not: 'cancelled' },
      },
      orderBy: { time: 'asc' },
    });

    res.json(reservations);
  } catch (error) {
    console.error('Get reservations by date error:', error);
    res.status(500).json({ error: '获取预订失败' });
  }
});

// Create reservation (Public)
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const data = reservationSchema.parse(req.body);

    // Check for conflicting reservations
    const existingReservations = await prisma.reservation.findMany({
      where: {
        date: data.date,
        time: data.time,
        status: { not: 'cancelled' },
      },
    });

    const totalGuests = existingReservations.reduce((sum, r) => sum + r.guests, 0);
    if (totalGuests + data.guests > 40) {
      return res.status(400).json({ error: '该时段预订已满，请选择其他时间' });
    }

    const reservation = await prisma.reservation.create({
      data: {
        ...data,
        status: 'pending',
      },
    });

    res.status(201).json({
      message: '预订成功！我们将尽快与您联系确认',
      reservation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Create reservation error:', error);
    res.status(500).json({ error: '预订失败，请稍后重试' });
  }
});

// Update reservation (Admin)
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { status, notes } = req.body;
    
    const reservation = await prisma.reservation.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
    });

    res.json(reservation);
  } catch (error) {
    console.error('Update reservation error:', error);
    res.status(500).json({ error: '更新预订失败' });
  }
});

// Delete reservation (Admin)
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.reservation.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: '预订已删除' });
  } catch (error) {
    console.error('Delete reservation error:', error);
    res.status(500).json({ error: '删除预订失败' });
  }
});

// Get today's reservations summary (Admin)
router.get('/stats/today', async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const [todayReservations, weekReservations] = await Promise.all([
      prisma.reservation.findMany({
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        orderBy: { time: 'asc' },
      }),
      prisma.reservation.findMany({
        where: {
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { date: 'asc' },
      }),
    ]);

    const todayGuests = todayReservations.reduce((sum, r) => sum + r.guests, 0);

    res.json({
      todayCount: todayReservations.length,
      todayGuests,
      todayReservations,
      weekTrend: weekReservations.map((r) => ({
        date: r.date,
        guests: r.guests,
      })),
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: '获取统计失败' });
  }
});

export default router;
