<template>
	<view class="container">
		<!-- 顶部导航 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="back-btn" @tap="goBack">
					<u-icon name="arrow-left" size="20" color="#333"></u-icon>
				</view>
				<text class="nav-title">联系人详情</text>
				<view class="nav-right"></view>
			</view>
		</view>
		
		<!-- 联系人信息卡片 -->
		<view class="contact-card">
			<u-avatar 
				:src="contactInfo.avatar"
				size="120"
			></u-avatar>
			<text class="contact-name">{{ contactInfo.nickname }}</text>
			<view class="contact-level">
				<u-tag 
					v-if="contactInfo.level === 'VIP'"
					text="VIP"
					type="warning"
					size="small"
				></u-tag>
				<text v-else class="level-text">{{ contactInfo.level }}</text>
			</view>
		</view>
		
		<!-- 详细信息 -->
		<view class="info-section">
			<u-cell-group :border="false">
				<u-cell title="个性签名" :label="contactInfo.signature"></u-cell>
				<u-cell title="等级" :value="contactInfo.level"></u-cell>
			</u-cell-group>
		</view>
		
		<!-- 底部操作按钮 -->
		<view class="action-bar">
			<view class="chat-btn" @tap="startChat">
				<u-icon name="chat" size="20" color="#fff"></u-icon>
				<text class="btn-text">发起对话</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { contacts } from '@/utils/mock-data.js';

const contactId = ref(null);
const contactInfo = ref({});

onLoad((options) => {
	contactId.value = parseInt(options.id);
	contactInfo.value = contacts.find(c => c.id === contactId.value) || {};
});

const goBack = () => {
	uni.navigateBack();
};

const startChat = () => {
	uni.navigateTo({
		url: `/pages/chat-detail/chat-detail?id=${contactId.value}`
	});
};
</script>

<style scoped>
.container {
	min-height: 100vh;
	background: #F8F8F8;
	display: flex;
	flex-direction: column;
}

/* 导航栏 */
.navbar {
	background: #6ECFBD;
	padding-top: calc(var(--status-bar-height) + 10rpx);
	flex-shrink: 0;
}

.nav-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
	padding-right: 200rpx;
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

/* 联系人信息卡片 */
.contact-card {
	background: #fff;
	margin: 30rpx;
	border-radius: 20rpx;
	padding: 60rpx 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.contact-name {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
	margin-top: 30rpx;
}

.contact-level {
	margin-top: 15rpx;
}

.level-text {
	font-size: 28rpx;
	color: #666;
	padding: 6rpx 20rpx;
	background: #F0F0F0;
	border-radius: 20rpx;
}

/* 详细信息 */
.info-section {
	margin: 0 30rpx 30rpx;
	border-radius: 20rpx;
	overflow: hidden;
}

/* 底部操作栏 */
.action-bar {
	margin-top: auto;
	padding: 30rpx;
	padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
	background: #fff;
	border-top: 1rpx solid #f0f0f0;
}

.chat-btn {
	width: 100%;
	height: 90rpx;
	background: linear-gradient(135deg, #6ECFBD, #5AB9A8);
	border-radius: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15rpx;
	box-shadow: 0 6rpx 20rpx rgba(110, 207, 189, 0.4);
	transition: all 0.3s;
}

.chat-btn:active {
	transform: scale(0.98);
	box-shadow: 0 4rpx 15rpx rgba(110, 207, 189, 0.5);
}

.btn-text {
	font-size: 32rpx;
	color: #fff;
	font-weight: 500;
}
</style>
