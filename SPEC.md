# SPEC.md - 奢华高端餐厅网站「L'Imperial」

## 1. 概念与愿景

**L'Imperial** 是一家位于巴黎的米其林三星级法式餐厅，网站将传达极致奢华、精致优雅与现代创新的品牌形象。整体设计灵感源自高端酒店品牌如Ritz、Four Seasons，以及奢侈品网站如Louis Vuitton、Bvlgari的视觉语言。网站应该让访客感受到：步入一个私密、尊贵、充满仪式感的美食殿堂。

---

## 2. 设计语言

### 美学方向
**参考风格**: 新古典主义奢华 × 当代极简主义
- 以深色系为主调，金色作为点睛之笔
- 大量留白创造"呼吸感"
- 精致的装饰线条和微妙的纹理
- 如同翻阅一本高端杂志的沉浸式体验

### 色彩体系
```
Primary (深炭黑):     #0D0D0D
Secondary (象牙白):   #F5F3EE
Accent (香槟金):      #C9A962
Accent-Light (玫瑰金): #D4AF37
Background (墨黑):   #1A1A1A
Background-Alt:       #252525
Text-Primary:         #FFFFFF
Text-Secondary:       #A0A0A0
Text-Dark:            #1A1A1A
Success:              #4A7C59
Error:                #8B2635
```

### 字体系统
```
标题字体: Playfair Display (衬线体, 优雅经典)
正文字体: Cormorant Garamond (衬线体, 高贵易读)
辅助字体: Montserrat (无衬线体, 现代感)
中文备选: Noto Serif SC / Noto Sans SC
字重层级:
- Display: 700
- Heading: 600
- Body: 400
- Caption: 300
```

### 空间系统
```
基础单位: 8px
间距层级: 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192px
容器最大宽度: 1440px
内容区域: 1200px
移动端边距: 24px
```

### 动效哲学
```
过渡时长:
- 快速: 200ms (微交互)
- 标准: 400ms (元素出现)
- 缓慢: 800ms (页面转场)
缓动函数: cubic-bezier(0.4, 0, 0.2, 1)

核心动效:
1. 滚动触发动画 (Intersection Observer)
2. 文字逐字/逐行显示
3. 图片视差滚动
4. 导航栏滚动变色
5. 悬停时优雅的放大与发光效果
6. 页面加载时的优雅入场动画
```

### 视觉资产
```
图标库: Lucide Icons (线性风格)
装饰元素:
- 金色分隔线
- 精致的边框花纹
- 半透明渐变遮罩
- 微妙的噪点纹理
```

---

## 3. 布局与结构

### 页面架构

#### 公共区域
```
1. 导航栏 (固定, 滚动时添加背景)
2. 页脚 (联系信息, 社交媒体, 快速链接)
```

#### 首页 (/)
```
1. Hero 全屏视差区
   - 全屏视频背景 (餐厅内景)
   - 餐厅名称动画入场
   - 副标题与CTA按钮
   - 向下滚动指示器

2. 品牌故事区
   - 左侧大图 + 右侧文字
   - 历史沿革与理念

3. 精选体验区
   - 横向滚动的卡片 (午餐/晚餐/品酒/私人包厢)
   - 悬停显示详情

4. 菜单预览区
   - 标签式分类 (主厨推荐/季节限定/经典菜品)
   - 精美的菜品卡片

5. 预订区块
   - 全宽背景图
   - 预订表单 (日期/时间/人数/特殊要求)
   - 联系信息

6. 荣誉展示区
   - 米其林星级
   - 媒体评价
   - 合作荣誉

7. 画廊预览
   - 网格布局的图片展示
   - 点击放大查看

8. 位置与时间
   - 地图嵌入
   - 营业时间
   - 联系方式
```

#### 菜单页面 (/menu)
```
- 顶部大图Banner
- 分类导航 (头盘/主菜/甜点/酒单)
- 精美排版的菜品列表
- 价格与描述
- 主厨特别推荐高亮
```

#### 关于我们 (/about)
```
- 品牌故事
- 团队介绍 (主厨/侍酒师/服务团队)
- 餐厅环境
- 发展历程时间线
```

#### 联系与位置 (/contact)
```
- 预订表单
- 联系方式
- 地图
- FAQ
```

#### 管理后台 (/admin)
```
- 仪表盘概览
- 预订管理
- 菜单管理
- 图片/视频管理
- 客户评价管理
- 系统设置
```

### 响应式策略
```
Desktop:  > 1024px (完整体验)
Tablet:   768px - 1024px (简化布局)
Mobile:   < 768px (单栏布局, 优化触摸)
```

---

## 4. 功能与交互

### 核心功能

#### 4.1 用户端

**预订系统**
- 选择日期 (禁用过去日期, 显示可用时间槽)
- 选择时间 (午餐 12:00-14:30 / 晚餐 19:00-22:30)
- 选择人数 (1-20人)
- 特殊要求 (过敏/庆祝/座位偏好)
- 联系方式收集
- 实时验证与错误提示
- 预订成功确认 + 邮件通知

**菜单浏览**
- 分类筛选
- 搜索功能
- 过敏原标注
- 菜品大图预览
- 价格显示

**图片画廊**
- 灯箱放大查看
- 分类浏览
- 视频播放

**联系表单**
- 姓名/邮箱/电话/主题/内容
- 表单验证
- 提交反馈

#### 4.2 管理端

**仪表盘**
- 今日预订概览
- 本周趋势图表
- 最近评价
- 快速操作

**预订管理**
- 日历视图
- 列表视图
- 状态管理 (待确认/已确认/已完成/已取消)
- 详情查看与编辑
- 导出数据

**菜单管理**
- CRUD 操作
- 分类管理
- 图片上传
- 价格设置
- 上下架控制

**内容管理**
- 轮播图管理
- 画廊管理
- 公告管理

**系统设置**
- 营业时间
- 联系方式
- 社交媒体链接
- SEO设置

### 交互细节

**导航栏**
```
默认: 透明背景, 白色文字
滚动后: 深色背景, 白色文字, 添加阴影
移动端: 汉堡菜单, 全屏覆盖式导航
```

**按钮**
```
主要按钮: 金色背景, 深色文字, 悬停发光效果
次要按钮: 透明边框, 金色边框, 悬停填充
悬停: 0.3s ease, 轻微放大1.05x
点击: 轻微缩小0.98x
禁用: 灰色调, 无交互
```

**卡片**
```
默认: 深色背景, 微边框
悬停: 提升阴影, 图片放大1.1x, 金色边框发光
点击反馈: 波纹效果
```

**表单**
```
聚焦: 金色边框, 发光效果
错误: 红色边框, 错误提示文字
成功: 绿色边框, 成功提示
```

---

## 5. 组件清单

### 导航组件
| 组件 | 状态 | 说明 |
|------|------|------|
| Navbar | default, scrolled, mobile-open | 响应式导航栏 |
| MobileMenu | open, closed | 移动端全屏菜单 |
| Logo | light, dark | 不同背景下的Logo |

### 展示组件
| 组件 | 状态 | 说明 |
|------|------|------|
| Hero | loading, loaded, video, image | 全屏英雄区 |
| ParallaxImage | default | 视差图片 |
| Gallery | grid, lightbox | 图片画廊 |
| VideoPlayer | play, pause, fullscreen | 视频播放器 |
| AwardBadge | default, animated | 荣誉徽章 |

### 卡片组件
| 组件 | 状态 | 说明 |
|------|------|------|
| MenuCard | default, hover, featured | 菜单卡片 |
| ExperienceCard | default, hover | 体验卡片 |
| TeamMemberCard | default, hover | 团队成员卡片 |
| ReviewCard | default | 评价卡片 |

### 表单组件
| 组件 | 状态 | 说明 |
|------|------|------|
| Input | default, focus, error, disabled | 输入框 |
| Select | default, open, selected | 下拉选择 |
| DatePicker | default, open, disabled | 日期选择 |
| TimePicker | default, open | 时间选择 |
| Textarea | default, focus, error | 多行文本 |
| Button | default, hover, active, loading, disabled | 按钮 |

### 反馈组件
| 组件 | 状态 | 说明 |
|------|------|------|
| Toast | success, error, warning, info | 消息提示 |
| Modal | open, closed | 模态框 |
| Loading | spinner, skeleton | 加载状态 |
| EmptyState | default | 空状态 |

### 布局组件
| 组件 | 状态 | 说明 |
|------|------|------|
| Section | default, dark, alt | 页面区块 |
| Container | default, narrow, wide | 容器 |
| Divider | gold, line, ornamental | 分隔线 |

---

## 6. 技术方案

### 技术栈

#### 前端
```
框架: React 18 + TypeScript
构建: Vite
路由: React Router v6
样式: Tailwind CSS + 自定义CSS
动画: Framer Motion
图标: Lucide React
图片: React Lazy Load
日期: React DatePicker
表单: React Hook Form + Zod
HTTP: Axios
状态: Zustand (管理端)
```

#### 后端
```
运行时: Node.js
框架: Express.js
语言: TypeScript
数据库: SQLite (开发) / PostgreSQL (生产)
ORM: Prisma
认证: JWT
验证: Zod
```

#### 开发工具
```
包管理: npm
代码规范: ESLint + Prettier
Git钩子: Husky
```

### API 设计

#### 认证
```
POST /api/auth/login     - 管理员登录
POST /api/auth/logout    - 登出
GET  /api/auth/me        - 获取当前用户
```

#### 预订
```
GET    /api/reservations        - 获取预订列表
POST   /api/reservations        - 创建预订
GET    /api/reservations/:id    - 获取单个预订
PUT    /api/reservations/:id    - 更新预订
DELETE /api/reservations/:id    - 删除预订
GET    /api/reservations/date/:date - 获取某日预订
```

#### 菜单
```
GET    /api/menus               - 获取菜单列表
POST   /api/menus               - 创建菜品
GET    /api/menus/:id           - 获取单个菜品
PUT    /api/menus/:id           - 更新菜品
DELETE /api/menus/:id           - 删除菜品
GET    /api/menus/category/:cat - 按分类获取
```

#### 内容
```
GET    /api/gallery             - 获取画廊
POST   /api/gallery             - 上传图片
DELETE /api/gallery/:id         - 删除图片
GET    /api/settings            - 获取设置
PUT    /api/settings            - 更新设置
```

### 数据模型

#### Reservation (预订)
```prisma
model Reservation {
  id          Int      @id @default(autoincrement())
  date        DateTime
  time        String
  guests      Int
  name        String
  email       String
  phone       String
  occasion    String?
  notes       String?
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### MenuItem (菜品)
```prisma
model MenuItem {
  id          Int      @id @default(autoincrement())
  name        String
  nameEn      String?
  description String
  price       Float
  category    String
  image       String?
  isFeatured  Boolean  @default(false)
  isAvailable Boolean  @default(true)
  allergens   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### GalleryItem (画廊)
```prisma
model GalleryItem {
  id          Int      @id @default(autoincrement())
  title       String
  image       String
  category    String
  order       Int      @default(0)
  createdAt   DateTime @default(now())
}
```

#### Setting (设置)
```prisma
model Setting {
  id          Int      @id @default(autoincrement())
  key         String   @unique
  value       String
  updatedAt   DateTime @updatedAt
}
```

### 项目结构
```
resto2/
├── client/                 # 前端应用
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/         # UI组件
│   │   │   ├── layout/      # 布局组件
│   │   │   ├── sections/    # 页面区块
│   │   │   └── admin/       # 管理组件
│   │   ├── pages/           # 页面
│   │   ├── hooks/           # 自定义Hooks
│   │   ├── services/        # API服务
│   │   ├── stores/          # 状态管理
│   │   ├── utils/           # 工具函数
│   │   ├── styles/          # 全局样式
│   │   └── types/           # TypeScript类型
│   ├── index.html
│   └── vite.config.ts
├── server/                  # 后端应用
│   ├── src/
│   │   ├── routes/          # 路由
│   │   ├── controllers/     # 控制器
│   │   ├── services/        # 业务逻辑
│   │   ├── middleware/      # 中间件
│   │   ├── prisma/          # 数据库
│   │   └── utils/           # 工具函数
│   └── package.json
├── prisma/
│   └── schema.prisma
├── package.json             # 根目录npm脚本
└── README.md
```

---

## 7. 内容数据

### 餐厅信息
```
名称: L'Imperial
地址: 15 Avenue Montaigne, 75008 Paris, France
电话: +33 1 42 89 00 00
邮箱: contact@limperial-paris.com
星级: 米其林三星
```

### 营业时间
```
午餐: 12:00 - 14:30 (最后点单 14:00)
晚餐: 19:00 - 22:30 (最后点单 21:30)
休息日: 周一、周二
```

### 菜单分类
```
头盘 (Entrées)
  - 法式鹅肝酱配无花果酱
  - 松露奶油汤
  - 生蚝精选

主菜 (Plats)
  - 和牛牛排配黑松露
  - 香煎龙虾
  - 烤羊排配香草

甜点 (Desserts)
  - 巧克力熔岩蛋糕
  - 法式千层酥
  - 季节水果塔

酒单 (Vins)
  - 波尔多特级庄园
  - 勃艮第名庄
  - 香槟珍藏
```

---

## 8. 图片与视频资源

### 图片资源 (使用Unsplash高质量图片)
```
Hero背景: 奢华餐厅内景
餐厅环境: 优雅的用餐空间
菜品图片:精致的法式料理
团队照片: 主厨、侍酒师
环境图: 私人包厢、酒吧区
```

### 视频资源
```
Hero视频: 餐厅氛围视频 (使用公开视频源)
```

---

## 9. 管理端访问

```
管理员入口: /admin
默认账号: admin@limperial.com
默认密码: Imperial2024!
```

---

## 10. 成功标准

- ✅ 所有页面在桌面和移动端完美呈现
- ✅ 预订系统完整工作
- ✅ 管理后台功能完整
- ✅ 动画流畅无卡顿
- ✅ 图片视频正确加载
- ✅ 表单验证完善
- ✅ 响应式设计完美适配
- ✅ 整体体验奢华、高端、精致
