import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('只支持 jpeg, jpg, png, webp 格式的图片'));
    }
  },
});

// Validation schema
const galleryItemSchema = z.object({
  title: z.string().min(1),
  category: z.enum(['interior', 'exterior', 'food', 'team', 'other']),
  order: z.number().optional(),
});

// Get all gallery items (Public)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { category } = req.query;
    
    const where: any = {};
    if (category) where.category = category;

    const galleryItems = await prisma.galleryItem.findMany({
      where,
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    res.json(galleryItems);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: '获取画廊失败' });
  }
});

// Get gallery item by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const galleryItem = await prisma.galleryItem.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!galleryItem) {
      return res.status(404).json({ error: '图片不存在' });
    }

    res.json(galleryItem);
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ error: '获取画廊失败' });
  }
});

// Upload image and create gallery item (Admin)
router.post('/', upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请上传图片' });
    }

    const { title, category, order } = req.body;
    
    const data = galleryItemSchema.parse({
      title,
      category,
      order: order ? parseInt(order) : 0,
    });

    const galleryItem = await prisma.galleryItem.create({
      data: {
        ...data,
        image: `/uploads/${req.file.filename}`,
      },
    });

    res.status(201).json(galleryItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Create gallery item error:', error);
    res.status(500).json({ error: '上传失败' });
  }
});

// Update gallery item (Admin)
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, order } = req.body;
    
    const data = galleryItemSchema.partial().parse({
      title,
      category,
      order: order ? parseInt(order) : undefined,
    });

    const galleryItem = await prisma.galleryItem.update({
      where: { id: parseInt(req.params.id) },
      data,
    });

    res.json(galleryItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Update gallery item error:', error);
    res.status(500).json({ error: '更新失败' });
  }
});

// Delete gallery item (Admin)
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.galleryItem.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: '图片已删除' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ error: '删除失败' });
  }
});

// Reorder gallery items
router.post('/reorder', async (req: AuthRequest, res: Response) => {
  try {
    const { items } = req.body;
    
    await Promise.all(
      items.map((item: { id: number; order: number }) =>
        prisma.galleryItem.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    res.json({ message: '排序已更新' });
  } catch (error) {
    console.error('Reorder gallery error:', error);
    res.status(500).json({ error: '排序失败' });
  }
});

export default router;
