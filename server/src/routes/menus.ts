import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const menuItemSchema = z.object({
  name: z.string().min(1),
  nameEn: z.string().optional(),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(['entrees', 'plats', 'desserts', 'vins']),
  image: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
  allergens: z.string().optional(),
});

// Get all menu items (Public)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { category, featured, available } = req.query;
    
    const where: any = {};
    if (category) where.category = category;
    if (featured !== undefined) where.isFeatured = featured === 'true';
    if (available !== undefined) where.isAvailable = available === 'true';

    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: [{ category: 'asc' }, { isFeatured: 'desc' }, { name: 'asc' }],
    });

    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ error: '获取菜单失败' });
  }
});

// Get menu item by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!menuItem) {
      return res.status(404).json({ error: '菜品不存在' });
    }

    res.json(menuItem);
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ error: '获取菜单失败' });
  }
});

// Get menu items by category
router.get('/category/:category', async (req: AuthRequest, res: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        category: req.params.category,
        isAvailable: true,
      },
      orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
    });

    res.json(menuItems);
  } catch (error) {
    console.error('Get menu by category error:', error);
    res.status(500).json({ error: '获取菜单失败' });
  }
});

// Create menu item (Admin)
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const data = menuItemSchema.parse(req.body);
    
    const menuItem = await prisma.menuItem.create({
      data,
    });

    res.status(201).json(menuItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Create menu item error:', error);
    res.status(500).json({ error: '创建菜品失败' });
  }
});

// Update menu item (Admin)
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const data = menuItemSchema.partial().parse(req.body);
    
    const menuItem = await prisma.menuItem.update({
      where: { id: parseInt(req.params.id) },
      data,
    });

    res.json(menuItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Update menu item error:', error);
    res.status(500).json({ error: '更新菜品失败' });
  }
});

// Delete menu item (Admin)
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.menuItem.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: '菜品已删除' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ error: '删除菜品失败' });
  }
});

// Toggle featured status
router.patch('/:id/featured', async (req: AuthRequest, res: Response) => {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!menuItem) {
      return res.status(404).json({ error: '菜品不存在' });
    }

    const updated = await prisma.menuItem.update({
      where: { id: parseInt(req.params.id) },
      data: { isFeatured: !menuItem.isFeatured },
    });

    res.json(updated);
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ error: '更新失败' });
  }
});

// Toggle availability
router.patch('/:id/availability', async (req: AuthRequest, res: Response) => {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!menuItem) {
      return res.status(404).json({ error: '菜品不存在' });
    }

    const updated = await prisma.menuItem.update({
      where: { id: parseInt(req.params.id) },
      data: { isAvailable: !menuItem.isAvailable },
    });

    res.json(updated);
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({ error: '更新失败' });
  }
});

export default router;
