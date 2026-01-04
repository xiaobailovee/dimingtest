/**
 * Mock数据文件
 * 包含对话列表、联系人列表、聊天消息、用户信息等模拟数据
 */

// 对话列表数据
export const chatList = [
	{
		id: 1,
		avatar: 'https://cdn.xfzh.top/default-user-avatar/user.jpeg',
		nickname: 'Companion AI',
		lastMessage: '当然，我推荐《未来简史》...',
		time: '10:30',
		unread: 2
	},
	{
		id: 2,
		avatar: 'https://cdn.xfzh.top/default-user-avatar/user1.jpeg',
		nickname: '张三',
		lastMessage: '好的，明天见',
		time: '昨天',
		unread: 0
	},
	{
		id: 3,
		avatar: 'https://cdn.xfzh.top/default-user-avatar/user2.jpeg',
		nickname: '李四',
		lastMessage: '周末一起吃饭吗？',
		time: '周五',
		unread: 1
	}
];

// 联系人列表数据
export const contacts = [
	{
		id: 1,
		avatar: 'https://cdn.xfzh.top/default-user-avatar/user.jpeg',
		nickname: 'Companion AI',
		signature: '你的AI助手',
		level: 'VIP'
	},
	{
		id: 2,
		avatar: 'https://cdn.xfzh.top/default-user-avatar/user1.jpeg',
		nickname: '张三',
		signature: '工作使我快乐',
		level: '普通'
	},
	{
		id: 3,
		avatar: 'https://cdn.xfzh.top/default-user-avatar/user2.jpeg',
		nickname: '李四',
		signature: '生活美好',
		level: '普通'
	},
	{
		id: 4,
		avatar: 'https://cdn.xfzh.top/default-user-avatar/user3.jpeg',
		nickname: '王五',
		signature: '热爱编程',
		level: 'VIP'
	}
];

// 聊天消息数据（按chatId分组）
export const messages = {
	1: [
		{
			id: 1,
			type: 'received',
			content: '你好！我是你的AI助手，有什么可以帮你的吗？',
			time: '10:20'
		},
		{
			id: 2,
			type: 'sent',
			content: '给我推荐一本关于未来城市的书',
			time: '10:25'
		},
		{
			id: 3,
			type: 'received',
			content: '当然，我推荐《未来简史》。它探索了很深、宏转、的地界面，更新的谱集心性命。',
			time: '10:30',
			image: 'https://cdn.xfzh.top/blog-image/treeHole.png',
			hasActions: true
		}
	],
	2: [
		{
			id: 1,
			type: 'received',
			content: '在吗？',
			time: '昨天 14:20'
		},
		{
			id: 2,
			type: 'sent',
			content: '在的，什么事？',
			time: '昨天 14:25'
		},
		{
			id: 3,
			type: 'received',
			content: '好的，明天见',
			time: '昨天 14:30'
		}
	],
	3: [
		{
			id: 1,
			type: 'received',
			content: '周末一起吃饭吗？',
			time: '周五 18:00'
		}
	]
};

// 当前用户信息
export const userInfo = {
	avatar: 'https://cdn.xfzh.top/default-user-avatar/user4.jpeg',
	nickname: '用户昵称',
	id: 'user_001',
	signature: '这是我的个性签名'
};
