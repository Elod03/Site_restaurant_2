import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 创建管理员账号
  const hashedPassword = await bcrypt.hash('Imperial2024!', 10);
  
  await prisma.admin.upsert({
    where: { email: 'admin@limperial.com' },
    update: {},
    create: {
      email: 'admin@limperial.com',
      password: hashedPassword,
      name: 'Administrateur',
    },
  });

  // 创建菜单数据
  const menuItems = [
    // 头盘
    {
      name: '法式鹅肝酱配无花果酱',
      nameEn: 'Foie Gras Terrine with Fig Compote',
      description: '精选法国西南部鹅肝，配以自制无花果酱和烤布里欧面包',
      price: 85,
      category: 'entrees',
      isFeatured: true,
      allergens: '含有鹅肝、麸质',
    },
    {
      name: '黑松露奶油汤',
      nameEn: 'Black Truffle Cream Soup',
      description: '浓郁的奶油汤配以新鲜黑松露片和香草油',
      price: 65,
      category: 'entrees',
      isFeatured: false,
      allergens: '含有乳制品、麸质',
    },
    {
      name: '生蚝精选',
      nameEn: 'Fine de Claire Oysters',
      description: '六只精选法国芬迪奇生蚝，配以柠檬和红醋栗汁',
      price: 72,
      category: 'entrees',
      isFeatured: false,
      allergens: '含有贝类',
    },
    {
      name: '香煎带子配鱼子酱',
      nameEn: 'Seared Scallops with Caviar',
      description: '北海道扇贝配以俄罗斯鱼子酱和茴香泡沫',
      price: 95,
      category: 'entrees',
      isFeatured: true,
      allergens: '含有贝类、鱼子酱',
    },
    // 主菜
    {
      name: '和牛牛排配黑松露',
      nameEn: 'Wagyu Beef Steak with Black Truffle',
      description: 'A5级日本和牛，配以自制松露酱和时令蔬菜',
      price: 280,
      category: 'plats',
      isFeatured: true,
      allergens: '含有蔬菜、酱汁',
    },
    {
      name: '香煎龙虾',
      nameEn: 'Pan-Seared Lobster',
      description: '整只布列塔尼龙虾配以龙虾浓汤和手指蔬菜',
      price: 195,
      category: 'plats',
      isFeatured: true,
      allergens: '含有甲壳类、乳制品',
    },
    {
      name: '烤羊排配香草',
      nameEn: 'Rack of Lamb with Herbs',
      description: '新西兰羔羊排配以迷迭香烤土豆和薄荷酱',
      price: 145,
      category: 'plats',
      isFeatured: false,
      allergens: '含有乳制品',
    },
    {
      name: '烤鹌鹑配鹅肝',
      nameEn: 'Roasted Quail with Foie Gras',
      description: '嫩烤鹌鹑配以法式鹅肝和黑醋栗酱汁',
      price: 125,
      category: 'plats',
      isFeatured: false,
      allergens: '含有鹅肝',
    },
    // 甜点
    {
      name: '巧克力熔岩蛋糕',
      nameEn: 'Chocolate Lava Cake',
      description: '法芙娜70%黑巧克力熔岩蛋糕，配以香草冰淇淋',
      price: 45,
      category: 'desserts',
      isFeatured: true,
      allergens: '含有巧克力、乳制品、鸡蛋、麸质',
    },
    {
      name: '法式千层酥',
      nameEn: 'Mille-feuille',
      description: '手工制作的法式千层酥，配以香草奶油和焦糖',
      price: 38,
      category: 'desserts',
      isFeatured: false,
      allergens: '含有乳制品、麸质、鸡蛋',
    },
    {
      name: '季节水果塔',
      nameEn: 'Seasonal Fruit Tart',
      description: '新鲜时令水果配以杏仁奶油和覆盆子酱',
      price: 42,
      category: 'desserts',
      isFeatured: false,
      allergens: '含有麸质、乳制品、坚果',
    },
    {
      name: '柠檬塔',
      nameEn: 'Lemon Tart',
      description: '经典法式柠檬塔，配以意式蛋白霜和柠檬冰淇淋',
      price: 40,
      category: 'desserts',
      isFeatured: false,
      allergens: '含有乳制品、鸡蛋、麸质',
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  // 创建画廊数据
  const galleryItems = [
    { title: '主餐厅', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200', category: 'interior', order: 1 },
    { title: '私人包厢', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200', category: 'interior', order: 2 },
    { title: '酒吧区域', image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=1200', category: 'interior', order: 3 },
    { title: '露台夜景', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200', category: 'exterior', order: 4 },
    { title: '和牛牛排', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200', category: 'food', order: 5 },
    { title: '香煎龙虾', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=1200', category: 'food', order: 6 },
    { title: '法式鹅肝', image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=1200', category: 'food', order: 7 },
    { title: '甜点拼盘', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200', category: 'food', order: 8 },
    { title: '主厨团队', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200', category: 'team', order: 9 },
    { title: '侍酒师', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200', category: 'team', order: 10 },
    { title: '酒窖', image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=1200', category: 'interior', order: 11 },
    { title: '精致摆盘', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200', category: 'food', order: 12 },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }

  // 创建设置数据
  const settings = [
    { key: 'restaurant_name', value: "L'Imperial" },
    { key: 'restaurant_name_cn', value: '皇家御膳' },
    { key: 'address', value: '15 Avenue Montaigne, 75008 Paris, France' },
    { key: 'phone', value: '+33 1 42 89 00 00' },
    { key: 'email', value: 'contact@limperial-paris.com' },
    { key: 'lunch_start', value: '12:00' },
    { key: 'lunch_end', value: '14:30' },
    { key: 'dinner_start', value: '19:00' },
    { key: 'dinner_end', value: '22:30' },
    { key: 'closed_days', value: '周一, 周二' },
    { key: 'michelin_stars', value: '3' },
    { key: 'about_text', value: "L'Imperial 是巴黎最负盛名的米其林三星级法式餐厅，自1952年开业以来，始终致力于为宾客呈现最纯正的法式美食体验。我们的主厨以其创新的烹饪理念和对食材的极致追求，将传统法式料理推向新的高度。" },
    { key: 'hero_title', value: "L'Imperial" },
    { key: 'hero_subtitle', value: '米其林三星 · 法式美食殿堂' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('数据库种子数据创建完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
