import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});

// Get all settings (Public)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const settings = await prisma.setting.findMany();
    
    const settingsObj: Record<string, string> = {};
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    res.json(settingsObj);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: '获取设置失败' });
  }
});

// Get setting by key (Public)
router.get('/:key', async (req: AuthRequest, res: Response) => {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: req.params.key },
    });

    if (!setting) {
      return res.status(404).json({ error: '设置不存在' });
    }

    res.json(setting);
  } catch (error) {
    console.error('Get setting error:', error);
    res.status(500).json({ error: '获取设置失败' });
  }
});

// Update or create setting (Admin)
router.put('/:key', async (req: AuthRequest, res: Response) => {
  try {
    const { value } = req.body;
    
    if (!value || typeof value !== 'string') {
      return res.status(400).json({ error: '请提供有效的值' });
    }

    const setting = await prisma.setting.upsert({
      where: { key: req.params.key },
      update: { value },
      create: { key: req.params.key, value },
    });

    res.json(setting);
  } catch (error) {
    console.error('Update setting error:', error);
    res.status(500).json({ error: '更新设置失败' });
  }
});

// Bulk update settings (Admin)
router.put('/', async (req: AuthRequest, res: Response) => {
  try {
    const { settings } = req.body;
    
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ error: '请提供设置对象' });
    }

    await Promise.all(
      Object.entries(settings).map(([key, value]) =>
        prisma.setting.upsert({
          where: { key },
          update: { value: value as string },
          create: { key, value: value as string },
        })
      )
    );

    const allSettings = await prisma.setting.findMany();
    const settingsObj: Record<string, string> = {};
    allSettings.forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    res.json(settingsObj);
  } catch (error) {
    console.error('Bulk update settings error:', error);
    res.status(500).json({ error: '批量更新设置失败' });
  }
});

export default router;
