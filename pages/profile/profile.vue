<template>
	<view class="container">
		<view class="header">
			<text class="title">个人中心</text>
		</view>
		
		<view class="profile-card">
			<view class="user-info">
				<u-avatar 
					:src="userInfo.avatar"
					size="70"
				></u-avatar>
				<view class="user-details">
					<text class="nickname">{{ userInfo.nickname }}</text>
					<text class="user-id">ID: {{ userInfo.id }}</text>
					<text class="signature">{{ userInfo.signature }}</text>
				</view>
			</view>
		</view>
		
		<view class="menu-section">
			<u-cell-group :border="false">
				<u-cell 
					title="编辑资料"
					isLink
					@click="goToEdit"
				>
					<template #icon>
						<u-icon name="account" size="20" color="#6ECFBD"></u-icon>
					</template>
				</u-cell>
				<u-cell 
					title="设置"
					isLink
				>
					<template #icon>
						<u-icon name="setting" size="20" color="#6ECFBD"></u-icon>
					</template>
				</u-cell>
				<u-cell 
					title="帮助与反馈"
					isLink
				>
					<template #icon>
						<u-icon name="question-circle" size="20" color="#6ECFBD"></u-icon>
					</template>
				</u-cell>
				<u-cell 
					title="关于"
					isLink
				>
					<template #icon>
						<u-icon name="info-circle" size="20" color="#6ECFBD"></u-icon>
					</template>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { userInfo as userInfoData } from '@/utils/mock-data.js';

// 当前用户信息
const userInfo = ref({});

/**
 * 页面显示时刷新用户数据
 * 使用onShow而非onMounted，确保从编辑页返回时能看到最新数据
 */
onShow(() => {
	userInfo.value = { ...userInfoData };
});

/**
 * 跳转到编辑资料页
 */
const goToEdit = () => {
	uni.navigateTo({
		url: '/pages/profile-edit/profile-edit'
	});
};
</script>

<style scoped>
.container {
	min-height: 100vh;
	background: #F8F8F8;
}

.header {
	background: #6ECFBD;
	padding: calc(var(--status-bar-height) + 20rpx) 30rpx 30rpx;
}

.title {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
}

.profile-card {
	margin: 30rpx;
	background: #fff;
	border-radius: 20rpx;
	padding: 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.user-info {
	display: flex;
	align-items: center;
	gap: 30rpx;
}

.user-details {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.nickname {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.user-id {
	font-size: 26rpx;
	color: #999;
}

.signature {
	font-size: 28rpx;
	color: #666;
	margin-top: 10rpx;
}

.menu-section {
	margin: 30rpx;
	border-radius: 20rpx;
	overflow: hidden;
}
</style>
