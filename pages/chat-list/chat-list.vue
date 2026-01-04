<template>
	<view class="container">
		<view class="header">
			<text class="title">对话列表</text>
		</view>
		
		<scroll-view 
			class="chat-list-scroll"
			scroll-y
			refresher-enabled
			:refresher-triggered="refreshing"
			@refresherrefresh="onRefresh"
			@refresherrestore="onRestore"
		>
			<view class="chat-list">
				<u-cell-group :border="false">
					<u-cell 
						v-for="chat in chatList" 
						:key="chat.id"
						@click="openChat(chat.id)"
					>
						<template #icon>
							<u-avatar 
								:src="chat.avatar"
								size="50"
							></u-avatar>
						</template>
						<template #title>
							<view class="cell-title">
								<text class="nickname">{{ chat.nickname }}</text>
								<u-badge 
									v-if="chat.unread > 0"
									:value="chat.unread"
									:offset="[0, 0]"
								></u-badge>
							</view>
						</template>
						<template #label>
							<text class="last-message">{{ chat.lastMessage }}</text>
						</template>
						<template #value>
							<text class="time">{{ chat.time }}</text>
						</template>
					</u-cell>
				</u-cell-group>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { chatList as chatListData } from '@/utils/mock-data.js';
import { useChatStore } from '@/stores/chat.js';

// 使用Pinia store
const chatStore = useChatStore();

// 对话列表数据
const refreshing = ref(false); // 下拉刷新状态

/**
 * 计算属性：动态生成对话列表，包含最新消息和未读数量
 */
const chatList = computed(() => {
	return chatListData.map(chat => {
		// 从store获取该对话的消息列表
		const messages = chatStore.getMessagesByChatId(chat.id);
		
		// 获取最后一条消息
		const lastMsg = messages.length > 0 ? messages[messages.length - 1] : null;
		
		// 生成最后消息预览文本
		let lastMessage = chat.lastMessage; // 默认值
		if (lastMsg) {
			if (lastMsg.content) {
				// 有文字内容，显示文字（最多20个字符）
				lastMessage = lastMsg.content.length > 20 
					? lastMsg.content.substring(0, 20) + '...' 
					: lastMsg.content;
			} else if (lastMsg.images && lastMsg.images.length > 0) {
				// 纯图片消息
				lastMessage = `[图片]`;
			} else if (lastMsg.image) {
				// 旧版单图
				lastMessage = `[图片]`;
			}
		}
		
		// 获取未读消息数量（只计算对方发送的消息）
		const unread = chatStore.getUnreadCount(chat.id);
		
		return {
			...chat,
			lastMessage,
			time: lastMsg ? lastMsg.time : chat.time, // 使用最新消息的时间
			unread // 动态未读数量
		};
	});
});

/**
 * 页面显示时刷新列表
 */
onShow(() => {
	// 列表会自动更新，因为使用了computed
});

/**
 * 打开聊天详情页
 * @param {number} chatId - 聊天ID
 */
const openChat = (chatId) => {
	// 标记为已读（清除未读气泡）
	chatStore.markAsRead(chatId);
	
	// 跳转到聊天详情页
	uni.navigateTo({
		url: `/pages/chat-detail/chat-detail?id=${chatId}`
	});
};

/**
 * 下拉刷新对话列表
 */
const onRefresh = () => {
	refreshing.value = true;
	
	// 模拟刷新数据（实际项目中应调用API）
	setTimeout(() => {
		uni.showToast({
			title: '刷新成功',
			icon: 'success',
			duration: 1500
		});
		
		refreshing.value = false;
	}, 1000);
};

/**
 * 刷新恢复回调
 */
const onRestore = () => {
	refreshing.value = false;
};
</script>

<style scoped>
.container {
	min-height: 100vh;
	background: #F8F8F8;
	display: flex;
	flex-direction: column;
}

.header {
	background: #6ECFBD;
	padding: calc(var(--status-bar-height) + 20rpx) 30rpx 30rpx;
	flex-shrink: 0;
}

.title {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
}

.chat-list-scroll {
	flex: 1;
	height: 0;
}

.chat-list {
	padding-top: 20rpx;
}

.cell-title {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.nickname {
	font-size: 32rpx;
	font-weight: 500;
	color: #333;
}

.last-message {
	font-size: 28rpx;
	color: #999;
}

.time {
	font-size: 24rpx;
	color: #999;
}
</style>
