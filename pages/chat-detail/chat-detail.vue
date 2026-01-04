<template>
	<view class="page">
		<!-- 顶部导航 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="back-btn" @tap="goBack">
					<u-icon name="arrow-left" size="20" color="#333"></u-icon>
				</view>
				<text class="nav-title">{{ chatInfo.nickname }}</text>
				<view class="nav-right">
					<!-- 右侧留空，避免与小程序胶囊按钮重叠 -->
				</view>
			</view>
		</view>
		
		<!-- 消息列表 -->
		<scroll-view 
			class="message-list" 
			scroll-y 
			:scroll-into-view="scrollToView"
			scroll-with-animation
			@scrolltoupper="onRefresh"
			@scrolltolower="onLoadMore"
			upper-threshold="50"
			lower-threshold="100"
		>
			<!-- 下拉刷新提示 -->
			<view v-if="refreshing" class="loading-tip">
				<view class="loading-spinner"></view>
				<text class="loading-text">加载中...</text>
			</view>
			
			<!-- 消息列表 -->
			<view 
				v-for="msg in messages" 
				:key="msg.id" 
				:id="'msg-' + msg.id"
				class="message-item"
				:class="msg.type"
			>
				<u-avatar 
					:src="msg.type === 'sent' ? userInfo.avatar : chatInfo.avatar"
					size="40"
					class="msg-avatar"
				></u-avatar>
				<view class="msg-content-wrapper">
					<view class="msg-bubble">
						<text class="msg-text">{{ msg.content }}</text>
						<u-image 
							v-if="msg.image" 
							:src="msg.image" 
							width="300rpx"
							height="400rpx"
							radius="12"
							:showLoading="true"
							class="msg-image"
						></u-image>
						<!-- 点赞按钮只在接收的消息中显示 -->
						<view v-if="msg.type === 'received'" class="msg-actions">
							<view class="action-btn" @tap="toggleLike(msg.id)">
								<image 
									:src="msg.liked ? '/static/like-s.png' : '/static/like.png'" 
									class="action-icon"
									:class="{ 'action-active': msg.liked }"
									mode="aspectFit"
								></image>
							</view>
							<view class="action-btn" @tap="toggleDislike(msg.id)">
								<image 
									:src="msg.disliked ? '/static/nolike-s.png' : '/static/nolike.png'" 
									class="action-icon"
									:class="{ 'action-active': msg.disliked }"
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
					<text class="msg-time">{{ msg.time }}</text>
				</view>
			</view>
			
			<!-- 上拉加载提示 -->
			<view v-if="loadingMore || noMoreData" class="loading-tip bottom">
				<view v-if="loadingMore" class="loading-spinner"></view>
				<text class="loading-text">{{ noMoreData ? '暂无更多消息' : '加载中...' }}</text>
			</view>
		</scroll-view>
		
		<!-- 底部输入框 - 固定定位 -->
		<view class="input-bar-fixed">
			<view class="input-bar">
				<view class="input-wrapper">
					<input 
						class="input-native"
						v-model="inputText"
						placeholder="输入消息..."
						@confirm="sendMessage"
					/>
					<image src="/static/yuyin.png" class="voice-icon" mode="aspectFit"></image>
				</view>
				<view class="send-btn" @tap="sendMessage">
					<image src="/static/fasong.png" class="send-icon" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { chatList, messages as messagesData, userInfo as userInfoData } from '@/utils/mock-data.js';

// 聊天相关数据
const chatId = ref(null); // 当前聊天ID
const chatInfo = ref({}); // 聊天对象信息
const messages = ref([]); // 消息列表
const inputText = ref(''); // 输入框内容
const scrollToView = ref(''); // 滚动目标元素ID
const userInfo = ref({}); // 当前用户信息

// 加载状态
const refreshing = ref(false); // 下拉刷新状态
const loadingMore = ref(false); // 上拉加载状态
const noMoreData = ref(false); // 是否没有更多数据

/**
 * 页面加载时初始化数据
 */
onLoad((options) => {
	chatId.value = parseInt(options.id);
	chatInfo.value = chatList.find(c => c.id === chatId.value) || {};
	
	// 为每条消息添加点赞/点踩状态
	messages.value = (messagesData[chatId.value] || []).map(msg => ({
		...msg,
		liked: false,
		disliked: false
	}));
	
	userInfo.value = userInfoData;
	scrollToBottom();
});

/**
 * 返回上一页
 */
const goBack = () => {
	uni.navigateBack();
};

/**
 * 发送消息
 */
const sendMessage = () => {
	if (!inputText.value.trim()) return;
	
	// 创建新消息
	const newMsg = {
		id: messages.value.length + 1,
		type: 'sent',
		content: inputText.value,
		time: getCurrentTime(),
		liked: false,
		disliked: false
	};
	
	messages.value.push(newMsg);
	inputText.value = '';
	
	// 滚动到底部
	nextTick(() => {
		scrollToBottom();
	});
	
	// 模拟AI回复（1秒后）
	setTimeout(() => {
		simulateReply();
	}, 1000);
};

/**
 * 模拟AI自动回复
 */
const simulateReply = () => {
	const replies = [
		'收到！让我想想...',
		'这是个好问题！',
		'我明白了，让我为你分析一下',
		'好的，我来帮你'
	];
	
	const reply = {
		id: messages.value.length + 1,
		type: 'received',
		content: replies[Math.floor(Math.random() * replies.length)],
		time: getCurrentTime(),
		liked: false,
		disliked: false
	};
	
	messages.value.push(reply);
	nextTick(() => {
		scrollToBottom();
	});
};

/**
 * 切换点赞状态
 * @param {number} msgId - 消息ID
 */
const toggleLike = (msgId) => {
	const msg = messages.value.find(m => m.id === msgId);
	if (msg) {
		msg.liked = !msg.liked;
		
		if (msg.liked) {
			// 点赞时自动取消点踩（互斥）
			if (msg.disliked) {
				msg.disliked = false;
			}
			uni.showToast({
				title: '已点赞',
				icon: 'success',
				duration: 1500
			});
		} else {
			uni.showToast({
				title: '已取消点赞',
				icon: 'none',
				duration: 1500
			});
		}
	}
};

/**
 * 切换点踩状态
 * @param {number} msgId - 消息ID
 */
const toggleDislike = (msgId) => {
	const msg = messages.value.find(m => m.id === msgId);
	if (msg) {
		msg.disliked = !msg.disliked;
		
		if (msg.disliked) {
			// 点踩时自动取消点赞（互斥）
			if (msg.liked) {
				msg.liked = false;
			}
			uni.showToast({
				title: '已标记不喜欢',
				icon: 'none',
				duration: 1500
			});
		} else {
			uni.showToast({
				title: '已取消标记',
				icon: 'none',
				duration: 1500
			});
		}
	}
};

/**
 * 滚动到消息列表底部
 */
const scrollToBottom = () => {
	if (messages.value.length > 0) {
		scrollToView.value = 'msg-' + messages.value[messages.value.length - 1].id;
	}
};

/**
 * 获取当前时间（HH:MM格式）
 */
const getCurrentTime = () => {
	const now = new Date();
	return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
};

/**
 * 下拉刷新（加载历史消息）
 */
const onRefresh = () => {
	if (refreshing.value) return;
	
	refreshing.value = true;
	
	// 模拟加载历史消息（实际项目中应调用API）
	setTimeout(() => {
		uni.showToast({
			title: '已是最新消息',
			icon: 'none',
			duration: 1500
		});
		refreshing.value = false;
	}, 1000);
};

/**
 * 上拉加载更多历史消息
 */
const onLoadMore = () => {
	if (loadingMore.value || noMoreData.value) return;
	
	loadingMore.value = true;
	
	// 模拟加载更多历史消息（实际项目中应调用API）
	setTimeout(() => {
		uni.showToast({
			title: '暂无更多消息',
			icon: 'none',
			duration: 1500
		});
		noMoreData.value = true;
		loadingMore.value = false;
	}, 1000);
};

/**
 * 滚动事件处理（未使用，保留供参考）
 */
const onScroll = (e) => {
	const { scrollTop, scrollHeight } = e.detail;
	
	// 滚动到顶部，触发下拉刷新
	if (scrollTop <= 50 && !refreshing.value) {
		onRefresh();
	}
	
	// 滚动到底部，触发上拉加载
	if (scrollTop + 100 >= scrollHeight && !loadingMore.value && !noMoreData.value) {
		onLoadMore();
	}
};
</script>

<style scoped>
page {
	background: #F5F1E8;
}

.page {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	background: #F5F1E8;
	position: relative;
}

/* 自定义导航栏 */
.navbar {
	background: transparent;
	padding-top: calc(var(--status-bar-height) + 10rpx);
	flex-shrink: 0;
}

.nav-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
	padding-right: 200rpx; /* 给小程序胶囊按钮留出空间 */
}

.back-btn {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.nav-title {
	flex: 1;
	text-align: center;
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	padding: 0 20rpx;
}

.nav-right {
	width: 60rpx;
	flex-shrink: 0;
}

.message-list {
	flex: 1;
	padding: 30rpx 30rpx;
	overflow-y: auto;
	box-sizing: border-box;
	margin-bottom: 0;
}

.message-item {
	display: flex;
	margin-bottom: 40rpx;
	animation: fadeIn 0.3s ease;
	align-items: flex-start;
	width: 100%;
	box-sizing: border-box;
}

.message-item:last-child {
	margin-bottom: 30rpx;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.message-item.received {
	flex-direction: row;
}

.message-item.sent {
	flex-direction: row-reverse;
}

.msg-avatar {
	flex-shrink: 0;
	width: 80rpx;
	height: 80rpx;
	margin-top: 10rpx;
}

.msg-content-wrapper {
	max-width: calc(100% - 140rpx);
	flex-shrink: 1;
	min-width: 0;
	margin: 0 20rpx;
}

.sent .msg-content-wrapper {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.msg-bubble {
	background: #FFFFFF;
	border-radius: 24rpx;
	padding: 28rpx 32rpx;
	box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);
	word-wrap: break-word;
	position: relative;
}

.sent .msg-bubble {
	background: #FFD4A3;
	box-shadow: 0 6rpx 20rpx rgba(255, 179, 102, 0.15);
}

.msg-text {
	font-size: 32rpx;
	color: #333;
	line-height: 1.7;
	word-break: break-word;
}

.msg-image {
	margin-top: 15rpx;
	display: block;
}

.msg-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 12rpx;
	margin-top: 16rpx;
	padding-top: 16rpx;
	border-top: 1rpx solid rgba(0, 0, 0, 0.06);
}

.action-btn {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	background: #F5F5F5;
	border-radius: 50%;
}

.action-btn:active {
	transform: scale(0.88);
	background: #E8E8E8;
}

.action-icon {
	width: 32rpx;
	height: 32rpx;
	transition: all 0.3s ease;
	opacity: 0.65;
}

.action-icon.action-active {
	opacity: 1;
	transform: scale(1.1);
}

.msg-time {
	font-size: 24rpx;
	color: #999;
	margin-top: 8rpx;
	padding: 0 8rpx;
}

/* 加载提示 */
.loading-tip {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15rpx;
	padding: 30rpx 0;
}

.loading-tip.bottom {
	padding: 20rpx 0 30rpx;
}

.loading-spinner {
	width: 40rpx;
	height: 40rpx;
	border: 3rpx solid #E0E0E0;
	border-top-color: #6ECFBD;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.loading-text {
	font-size: 26rpx;
	color: #999;
}

/* 固定底部输入框 */
.input-bar-fixed {
	position: relative;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: transparent;
	flex-shrink: 0;
	padding: 0 30rpx 30rpx;
}

.input-bar {
	display: flex;
	align-items: center;
	gap: 20rpx;
	padding-bottom: env(safe-area-inset-bottom);
}

.input-wrapper {
	flex: 1;
	display: flex;
	align-items: center;
	background: #FFFFFF;
	border-radius: 50rpx;
	padding: 0 35rpx;
	height: 90rpx;
	gap: 20rpx;
	box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
}

.input-native {
	flex: 1;
	height: 90rpx;
	font-size: 30rpx;
	border: none;
	background: transparent;
	color: #333;
}

.voice-icon {
	width: 44rpx;
	height: 44rpx;
	flex-shrink: 0;
	opacity: 0.7;
}

.send-btn {
	width: 90rpx;
	height: 90rpx;
	background: linear-gradient(135deg, #FFB366, #FF9A4D);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 6rpx 20rpx rgba(255, 179, 102, 0.4);
	transition: all 0.3s;
	flex-shrink: 0;
}

.send-icon {
	width: 44rpx;
	height: 44rpx;
}

.send-btn:active {
	transform: scale(0.92);
	box-shadow: 0 4rpx 15rpx rgba(255, 179, 102, 0.5);
}
</style>
