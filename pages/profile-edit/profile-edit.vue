<template>
	<view class="container">
		<!-- 顶部导航 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="back-btn" @tap="goBack">
					<u-icon name="arrow-left" size="20" color="#333"></u-icon>
				</view>
				<text class="nav-title">编辑资料</text>
				<view class="nav-right"></view>
			</view>
		</view>
		
		<!-- 编辑表单 -->
		<view class="form-section">
			<!-- 头像 -->
			<view class="form-item" @tap="chooseAvatar">
				<text class="item-label">头像</text>
				<view class="item-value">
					<u-avatar 
						:src="formData.avatar"
						size="60"
					></u-avatar>
					<u-icon name="arrow-right" size="16" color="#ccc"></u-icon>
				</view>
			</view>
			
			<!-- 昵称 -->
			<view class="form-item">
				<text class="item-label">昵称</text>
				<input 
					class="item-input"
					v-model="formData.nickname"
					placeholder="请输入昵称"
					maxlength="20"
				/>
			</view>
			
			<!-- 账号（不可编辑） -->
			<view class="form-item disabled">
				<text class="item-label">账号</text>
				<text class="item-value-text disabled">{{ formData.id }}</text>
			</view>
			
			<!-- 个性签名 -->
			<view class="form-item textarea-item">
				<text class="item-label">个性签名</text>
				<textarea 
					class="item-textarea"
					v-model="formData.signature"
					placeholder="请输入个性签名"
					maxlength="100"
					:auto-height="true"
				></textarea>
			</view>
		</view>
		
		<!-- 保存按钮 -->
		<view class="action-bar">
			<view class="save-btn" @tap="saveProfile">
				<text class="btn-text">保存</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { userInfo as userInfoData } from '@/utils/mock-data.js';

// 表单数据
const formData = ref({
	avatar: '',
	nickname: '',
	id: '',
	signature: ''
});

/**
 * 页面加载时初始化表单数据
 */
onLoad(() => {
	formData.value = { ...userInfoData };
});

/**
 * 返回上一页
 */
const goBack = () => {
	uni.navigateBack();
};

/**
 * 选择头像（支持相册和相机）
 */
const chooseAvatar = () => {
	uni.chooseImage({
		count: 1, // 只选择一张
		sizeType: ['compressed'], // 压缩图片
		sourceType: ['album', 'camera'], // 相册或相机
		success: (res) => {
			formData.value.avatar = res.tempFilePaths[0];
			uni.showToast({
				title: '头像已更新',
				icon: 'success',
				duration: 1500
			});
		},
		fail: () => {
			uni.showToast({
				title: '取消选择',
				icon: 'none',
				duration: 1500
			});
		}
	});
};

/**
 * 保存个人资料
 * 包含表单验证、数据更新、成功提示
 */
const saveProfile = () => {
	// 验证昵称不能为空
	if (!formData.value.nickname.trim()) {
		uni.showToast({
			title: '请输入昵称',
			icon: 'none',
			duration: 1500
		});
		return;
	}
	
	// 显示加载状态
	uni.showLoading({
		title: '保存中...'
	});
	
	// 模拟保存过程（实际项目中应调用API）
	setTimeout(() => {
		uni.hideLoading();
		
		// 更新本地数据（实际应从服务器返回）
		Object.assign(userInfoData, formData.value);
		
		uni.showToast({
			title: '保存成功',
			icon: 'success',
			duration: 1500
		});
		
		// 延迟返回上一页，让用户看到成功提示
		setTimeout(() => {
			uni.navigateBack();
		}, 1500);
	}, 1000);
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

/* 表单区域 */
.form-section {
	margin: 30rpx;
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
}

.form-item {
	display: flex;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
	min-height: 100rpx;
}

.form-item:last-child {
	border-bottom: none;
}

.form-item.textarea-item {
	align-items: flex-start;
	flex-direction: column;
}

.form-item.disabled {
	background: #FAFAFA;
}

.item-label {
	font-size: 30rpx;
	color: #333;
	width: 150rpx;
	flex-shrink: 0;
}

.textarea-item .item-label {
	margin-bottom: 20rpx;
}

.item-value {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
}

.item-value-text {
	font-size: 30rpx;
	color: #666;
}

.item-value-text.disabled {
	color: #999;
}

.item-input {
	flex: 1;
	font-size: 30rpx;
	color: #333;
	text-align: right;
}

.item-textarea {
	width: 100%;
	font-size: 30rpx;
	color: #333;
	line-height: 1.6;
	min-height: 150rpx;
}

/* 底部操作栏 */
.action-bar {
	margin-top: auto;
	padding: 30rpx;
	padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
	background: #fff;
}

.save-btn {
	width: 100%;
	height: 90rpx;
	background: linear-gradient(135deg, #6ECFBD, #5AB9A8);
	border-radius: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 6rpx 20rpx rgba(110, 207, 189, 0.4);
	transition: all 0.3s;
}

.save-btn:active {
	transform: scale(0.98);
	box-shadow: 0 4rpx 15rpx rgba(110, 207, 189, 0.5);
}

.btn-text {
	font-size: 32rpx;
	color: #fff;
	font-weight: 500;
}
</style>
