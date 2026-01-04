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
import { ref, onMounted } from 'vue';
import { chatList as chatListData } from '@/utils/mock-data.js';

// 对话列表数据
const chatList = ref([]);
// 下拉刷新状态
const refreshing = ref(false);

// 页面加载时初始化数据
onMounted(() => {
	chatList.value = chatListData;
});

/**
 * 打开聊天详情页
 * @param {number} chatId - 聊天ID
 */
const openChat = (chatId) => {
	// 清除未读消息红点
	const chat = chatList.value.find(c => c.id === chatId);
	if (chat) {
		chat.unread = 0;
	}
	
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
		chatList.value = chatListData;
		
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
