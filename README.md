# Companion AI - 智能聊天应用

基于 uni-app + Vue3 (Composition API) + Pinia + uview-plus 开发的跨平台 AI 聊天应用

## 项目概述

一款功能完整的AI聊天应用，采用温馨舒适的UI设计，支持多端运行（H5、微信小程序、APP）。使用 Composition API + Pinia 状态管理，代码结构清晰，数据持久化，交互流畅自然。

## 核心技术栈

- **框架**：uni-app (Vue3)
- **编程范式**：Composition API (`<script setup>`)
- **UI组件库**：uview-plus
- **状态管理**：Pinia + pinia-plugin-persistedstate
- **数据持久化**：uni.setStorageSync (本地存储)
- **生命周期**：onLoad、onShow、computed

## 已实现功能

### 📱 核心页面（共6个）

#### 1. 对话列表页 (chat-list)
- ✅ 展示所有会话记录（头像、昵称、最后消息、时间）
- ✅ **动态最新消息**：实时显示每个对话的最后一条消息
  - 文字消息：显示内容（最多20字）
  - 图片消息：显示`[图片]`
  - 图文混合：优先显示文字
- ✅ **智能未读提示**：
  - 只统计对方发送的消息
  - 动态计算未读数量
  - 点击进入后自动清除
- ✅ 下拉刷新对话列表
- ✅ 点击跳转到聊天详情页
- ✅ 流畅的列表滚动和点击反馈

#### 2. 聊天详情页 (chat-detail)
- ✅ 完整的对话记录展示（支持文本和图片消息）
- ✅ 左右分布区分发送方
  - 用户消息：右侧，橙色气泡 (#FFD4A3)
  - AI消息：左侧，白色气泡
- ✅ 温馨米黄色背景 (#F5F1E8)
- ✅ **图片发送功能**：
  - 选择图片后显示预览缩略图
  - 支持删除已选图片
  - 点击+号继续添加（最多9张）
  - 支持文字+图片混合发送
  - 图片预览区域横向滚动
- ✅ **多图智能布局**：
  - 1张图：大图显示（200-400rpx）
  - 2-4张：2列网格（180x180rpx）
  - 5-9张：3列网格（120x120rpx）
  - 固定尺寸，视觉舒适
- ✅ **图片预览**：点击消息中的图片可放大查看
- ✅ 底部输入框（固定定位，支持发送消息）
- ✅ 语音输入按钮（UI已实现）
- ✅ 发送按钮（使用本地图标 fasong.png）
- ✅ 发送后自动滚动到底部（带动画）
- ✅ 模拟AI自动回复功能
- ✅ **消息点赞/点踩功能**：
  - 仅在接收的消息中显示
  - 支持切换状态（互斥）
  - 带过渡动画效果
  - 操作后显示Toast提示
  - 状态持久化保存
- ✅ 下拉刷新（加载历史消息）
- ✅ 上拉加载更多
- ✅ 导航栏右侧预留空间（避免与小程序胶囊重叠）
- ✅ **消息持久化**：发送的消息永久保存

#### 3. 联系人列表页 (contact)
- ✅ 展示所有联系人（头像、昵称、个性签名）
- ✅ VIP等级标识（金色标签）
- ✅ 点击跳转到联系人详情页

#### 4. 联系人详情页 (contact-detail)
- ✅ 展示联系人完整信息
  - 大头像展示
  - 昵称、等级徽章
  - 个性签名
- ✅ 底部"发起对话"按钮
- ✅ 点击跳转到聊天详情页
- ✅ 精美的卡片式布局

#### 5. 个人中心页 (profile)
- ✅ 展示当前用户信息
  - 头像、昵称
  - 账号ID
  - 个性签名
- ✅ 功能菜单
  - 编辑资料（可跳转）
  - 设置
  - 帮助与反馈
  - 关于
- ✅ 使用 onShow 生命周期（返回时自动刷新数据）

#### 6. 编辑资料页 (profile-edit)
- ✅ **头像修改**：支持相册/相机选择，实时预览
- ✅ **昵称编辑**：最多20字，必填验证
- ✅ **个性签名编辑**：最多100字，支持多行
- ✅ 账号ID显示（只读，不可编辑）
- ✅ 表单验证（昵称必填）
- ✅ **保存功能**：
  - 显示加载状态
  - 保存成功提示
  - 自动返回上一页
  - 数据实时同步到个人中心

### 🎨 UI/UX 特性

#### 配色方案
- **主题色**：薄荷绿 (#6ECFBD)
- **聊天背景**：温馨米黄 (#F5F1E8)
- **用户消息气泡**：温暖橙 (#FFD4A3)
- **AI消息气泡**：纯白 (#FFFFFF)
- **TabBar选中色**：天蓝 (#1296db)

#### 交互动画
- 消息发送淡入动画
- 按钮点击缩放反馈
- 点赞/点踩过渡效果
- 自动滚动带动画
- 下拉刷新加载动画
- 图片预览缩略图动画

#### 细节优化
- 消息气泡圆角、阴影效果
- 输入框圆角、阴影设计
- 卡片式布局，视觉层次分明
- 底部安全区域适配
- 小程序胶囊按钮避让（200rpx右侧padding）
- 图片等比缩放，固定尺寸范围
- 预览区域横向滚动

### 🔧 状态管理 (Pinia)

#### Chat Store (stores/chat.js)
```javascript
// 状态
- messages: {}           // 所有聊天消息（按chatId分组）
- lastReadMessageId: {}  // 每个聊天的最后已读消息ID

// Getters
- getMessagesByChatId(chatId)  // 获取指定聊天的消息列表
- getUnreadCount(chatId)       // 获取未读消息数量（只统计对方消息）

// Actions
- addMessage(chatId, message)           // 添加新消息
- updateMessage(chatId, msgId, updates) // 更新消息（点赞/点踩）
- markAsRead(chatId)                    // 标记为已读
- deleteMessage(chatId, msgId)          // 删除消息
- clearChat(chatId)                     // 清空聊天
- resetAllMessages()                    // 重置所有消息
```

#### 持久化配置
- 使用 `pinia-plugin-persistedstate` 插件
- 数据自动保存到 `uni.setStorageSync`
- 应用重启后数据不丢失

### 📦 使用的 uview-plus 组件

| 组件 | 用途 |
|------|------|
| u-navbar | 顶部导航栏 |
| u-avatar | 头像展示 |
| u-cell / u-cell-group | 列表单元格 |
| u-badge | 未读消息徽章 |
| u-tag | VIP等级标签 |
| u-icon | 图标 |
| u-input | 输入框 |
| u-image | 图片展示 |

### 📂 数据结构

#### Mock数据 (utils/mock-data.js)
```javascript
// 对话列表
chatList: [
  { id, avatar, nickname, lastMessage, time, unread }
]

// 联系人列表
contacts: [
  { id, avatar, nickname, signature, level }
]

// 聊天消息（按chatId分组）
messages: {
  1: [
    { 
      id, 
      type,        // 'sent' | 'received'
      content,     // 文字内容
      images,      // 图片数组（新）
      image,       // 单图（兼容旧版）
      time, 
      liked,       // 点赞状态
      disliked     // 点踩状态
    }
  ]
}

// 当前用户信息
userInfo: { avatar, nickname, id, signature }
```

#### Store数据 (Pinia持久化)
```javascript
// 聊天消息（持久化）
messages: {
  1: [...],  // 聊天1的所有消息
  2: [...],  // 聊天2的所有消息
}

// 已读状态（持久化）
lastReadMessageId: {
  1: 5,   // 聊天1已读到消息ID 5
  2: 10,  // 聊天2已读到消息ID 10
}
```

### 🎯 页面导航流程

```
TabBar导航：
├─ 对话列表 (chat-list)
│  └─ 点击对话 → 聊天详情 (chat-detail)
│     ├─ 发送文字消息
│     ├─ 发送图片消息（支持多图）
│     ├─ 点赞/点踩消息
│     └─ 预览图片
│
├─ 联系人 (contact)
│  └─ 点击联系人 → 联系人详情 (contact-detail)
│     └─ 发起对话 → 聊天详情 (chat-detail)
│
└─ 个人中心 (profile)
   └─ 编辑资料 → 编辑资料页 (profile-edit)
      ├─ 选择头像（相册/相机）
      ├─ 编辑昵称和签名
      └─ 保存 → 返回个人中心（数据已更新）
```

### 🚀 运行方式

```bash
# 安装依赖
npm install

# 运行到H5
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到APP
npm run dev:app
```

或在 HBuilderX 中直接运行到浏览器/模拟器/真机

## 核心功能详解

### 1. 图片发送功能

#### 选择图片
- 点击图片按钮打开相册/相机
- 最多选择9张图片
- 自动压缩图片

#### 预览编辑
- 选择后显示缩略图预览区
- 横向滚动查看所有图片
- 点击缩略图可放大预览
- 点击×删除不需要的图片
- 点击+号继续添加

#### 发送方式
- 纯文字：直接输入发送
- 纯图片：只选图片不输入文字
- 图文混合：文字+图片一起发送

#### 消息展示
- 1张图：大图显示
- 2-4张：2列网格
- 5-9张：3列网格
- 点击图片可预览原图

### 2. 消息持久化

#### 实现原理
- 使用Pinia管理消息状态
- 配置持久化插件自动保存
- 数据存储在本地Storage
- 应用重启后自动恢复

#### 数据同步
- 发送消息：立即保存到store
- 点赞/点踩：实时更新状态
- 对话列表：自动显示最新消息
- 未读数量：动态计算并显示

### 3. 智能未读提示

#### 统计规则
- 只统计对方发送的消息（type === 'received'）
- 基于最后已读消息ID计算
- 自己发送的消息不计入未读

#### 交互流程
1. 对方发送消息 → 未读数量+1
2. 点击进入聊天 → 调用markAsRead()
3. 未读数量变为0 → 红点消失
4. 返回列表 → 显示最新未读数量

### 4. 动态最新消息

#### 显示逻辑
- 从store获取该对话的所有消息
- 取最后一条消息作为预览
- 文字消息：显示内容（最多20字+...）
- 图片消息：显示`[图片]`
- 更新时间为最新消息的时间

#### 实时更新
- 使用computed计算属性
- 发送消息后自动更新列表
- 返回列表页时显示最新内容

## 项目特点

✨ **代码简洁**：Composition API，逻辑清晰，易于维护  
🎨 **UI精美**：温馨配色，细节打磨，交互流畅  
📱 **跨平台**：一套代码，多端运行  
🔧 **易扩展**：模块化设计，便于功能迭代  
⚡ **性能优化**：列表滚动优化，动画流畅自然  
💾 **数据持久化**：Pinia + 本地存储，数据永不丢失  
🔴 **智能未读**：只统计对方消息，自动清除  
🖼️ **完善图片功能**：预览、编辑、多图发送

## 项目结构

```
talking/
├── pages/                      # 页面目录
│   ├── chat-list/             # 对话列表页
│   ├── chat-detail/           # 聊天详情页
│   ├── contact/               # 联系人列表页
│   ├── contact-detail/        # 联系人详情页
│   ├── profile/               # 个人中心页
│   └── profile-edit/          # 编辑资料页
├── stores/                     # Pinia状态管理
│   ├── index.js               # Store入口
│   └── chat.js                # 聊天消息Store
├── utils/                      # 工具函数
│   └── mock-data.js           # Mock数据
├── static/                     # 静态资源
│   ├── fasong.png             # 发送按钮图标
│   ├── yuyin.png              # 语音按钮图标
│   ├── like.png / like-s.png  # 点赞图标
│   └── nolike.png / nolike-s.png # 点踩图标
├── App.vue                     # 应用入口
├── main.js                     # 主入口文件
├── pages.json                  # 页面配置
├── manifest.json               # 应用配置
├── uni.scss                    # 全局样式
└── package.json                # 依赖配置
```

## 开发注意事项

### 1. 图片路径
- 本地图片：使用相对路径 `/static/xxx.png`
- 网络图片：使用完整URL
- 临时图片：使用 `uni.chooseImage` 返回的临时路径

### 2. 状态管理
- 消息数据统一通过store管理
- 不要直接修改mock数据
- 使用computed获取响应式数据

### 3. 生命周期
- `onLoad`：页面加载时执行一次
- `onShow`：页面显示时执行（包括返回）
- `computed`：响应式计算属性

### 4. 持久化
- Store数据自动持久化
- 清除数据：调用 `resetAllMessages()`
- 或手动清除：`uni.removeStorageSync('chat-messages')`
