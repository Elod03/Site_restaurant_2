# L'Imperial - 米其林三星级餐厅官网

一个高端奢华的餐厅网站，包含完整的用户前端和管理后台。

![L'Imperial](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800)

## 功能特性

### 用户端
- 🎨 **奢华设计** - 高端黑金配色，精致动效，流畅体验
- 📱 **完全响应式** - 完美适配桌面端和移动端
- 📅 **在线预订系统** - 支持日期/时间/人数选择，实时验证
- 📖 **菜单展示** - 分类浏览，主厨推荐，价格展示
- 📷 **图片画廊** - 灯箱效果，分类筛选
- 📍 **位置与联系** - Google地图集成，联系方式，FAQ

### 管理后台
- 📊 **仪表盘** - 今日预订概览，统计数据，趋势图表
- 📋 **预订管理** - 查看、确认、取消预订
- 🍽️ **菜单管理** - CRUD操作，推荐设置，上下架控制
- 🖼️ **画廊管理** - 图片上传，分类管理
- ⚙️ **系统设置** - 餐厅信息，营业时间，联系方式

## 技术栈

### 前端
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (动画)
- React Router v6
- Zustand (状态管理)
- React Hook Form + Zod (表单验证)

### 后端
- Node.js + Express.js
- TypeScript
- Prisma ORM
- SQLite (开发) / PostgreSQL (生产)
- JWT 认证
- Multer (文件上传)

## 快速开始

### 1. 安装依赖

```bash
# 安装所有依赖
npm run install:all

# 或分别安装
cd client && npm install
cd ../server && npm install
```

### 2. 初始化数据库

```bash
cd server
npm run db:seed
```

### 3. 启动开发服务器

```bash
# 同时启动前端和后端
npm run dev

# 或分别启动
npm run dev:client  # 前端: http://localhost:3000
npm run dev:server  # 后端: http://localhost:5000
```

## 项目结构

```
resto2/
├── client/                 # 前端应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   │   ├── ui/        # UI基础组件
│   │   │   ├── layout/    # 布局组件
│   │   │   ├── sections/   # 页面区块
│   │   │   └── admin/     # 管理后台组件
│   │   ├── pages/         # 页面
│   │   ├── hooks/         # 自定义Hooks
│   │   ├── services/      # API服务
│   │   ├── stores/        # 状态管理
│   │   ├── utils/         # 工具函数
│   │   └── types/         # TypeScript类型
│   └── ...
├── server/                  # 后端应用
│   ├── src/
│   │   ├── routes/        # API路由
│   │   ├── middleware/     # 中间件
│   │   └── ...
│   └── prisma/            # 数据库配置
├── SPEC.md                 # 设计规范
└── README.md
```

## 管理后台

访问地址: http://localhost:3000/admin

默认账号:
- 邮箱: `admin@limperial.com`
- 密码: `Imperial2024!`

## API 接口

### 认证
- `POST /api/auth/login` - 管理员登录
- `POST /api/auth/logout` - 登出
- `GET /api/auth/me` - 获取当前用户

### 预订
- `GET /api/reservations` - 获取预订列表
- `POST /api/reservations` - 创建预订
- `PUT /api/reservations/:id` - 更新预订
- `DELETE /api/reservations/:id` - 删除预订

### 菜单
- `GET /api/menus` - 获取菜单
- `POST /api/menus` - 添加菜品
- `PUT /api/menus/:id` - 更新菜品
- `DELETE /api/menus/:id` - 删除菜品

### 画廊
- `GET /api/gallery` - 获取画廊
- `POST /api/gallery` - 上传图片
- `DELETE /api/gallery/:id` - 删除图片

## 设计参考

网站设计灵感来自:
- Louis Vuitton
- Bvlgari
- Four Seasons
- Ritz Paris

配色方案:
- 主色: 深炭黑 `#0D0D0D`
- 强调色: 香槟金 `#C9A962`
- 辅助色: 象牙白 `#F5F3EE`

字体:
- Playfair Display (标题)
- Cormorant Garamond (正文)
- Montserrat (辅助)

## 生产部署

### 前端构建
```bash
npm run build:client
```

### 后端构建
```bash
npm run build:server
```

### 环境变量

后端 `.env`:
```env
PORT=5000
NODE_ENV=production
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
```

## 许可证

MIT License
