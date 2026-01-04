<template>
	<view class="container">
		<view class="header">
			<text class="title">联系人</text>
		</view>
		
		<view class="contact-list">
			<u-cell-group :border="false">
				<u-cell 
					v-for="contact in contacts" 
					:key="contact.id"
					@click="openChat(contact.id)"
				>
					<template #icon>
						<u-avatar 
							:src="contact.avatar"
							size="50"
						></u-avatar>
					</template>
					<template #title>
						<view class="cell-title">
							<text class="nickname">{{ contact.nickname }}</text>
							<u-tag 
								v-if="contact.level === 'VIP'"
								text="VIP"
								type="warning"
								size="mini"
								plain
							></u-tag>
						</view>
					</template>
					<template #label>
						<text class="signature">{{ contact.signature }}</text>
					</template>
					<template #right-icon>
						<u-icon name="arrow-right" color="#ccc"></u-icon>
					</template>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { contacts as contactsData } from '@/utils/mock-data.js';

// 联系人列表数据
const contacts = ref([]);

/**
 * 页面加载时初始化联系人列表
 */
onMounted(() => {
	contacts.value = contactsData;
});

/**
 * 打开联系人详情页
 * @param {number} contactId - 联系人ID
 */
const openChat = (contactId) => {
	uni.navigateTo({
		url: `/pages/contact-detail/contact-detail?id=${contactId}`
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

.contact-list {
	padding-top: 20rpx;
}

.cell-title {
	display: flex;
	align-items: center;
	gap: 15rpx;
}

.nickname {
	font-size: 32rpx;
	font-weight: 500;
	color: #333;
}

.signature {
	font-size: 26rpx;
	color: #999;
}
</style>
