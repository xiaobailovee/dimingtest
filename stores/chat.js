/**
 * 聊天消息状态管理
 * 使用Pinia管理聊天消息，支持持久化到本地存储
 */
import { defineStore } from 'pinia';
import { messages as initialMessages } from '@/utils/mock-data.js';

export const useChatStore = defineStore('chat', {
	state: () => ({
		// 所有聊天消息，按chatId分组
		messages: { ...initialMessages },
		// 每个聊天的最后已读消息ID
		lastReadMessageId: {}
	}),
	
	getters: {
		/**
		 * 获取指定聊天的消息列表
		 * @param {number} chatId - 聊天ID
		 */
		getMessagesByChatId: (state) => (chatId) => {
			return state.messages[chatId] || [];
		},
		
		/**
		 * 获取指定聊天的未读消息数量（只计算对方发送的消息）
		 * @param {number} chatId - 聊天ID
		 */
		getUnreadCount: (state) => (chatId) => {
			const messages = state.messages[chatId] || [];
			const lastReadId = state.lastReadMessageId[chatId] || 0;
			
			// 统计最后已读ID之后的、对方发送的消息数量
			return messages.filter(msg => 
				msg.id > lastReadId && msg.type === 'received'
			).length;
		}
	},
	
	actions: {
		/**
		 * 添加新消息
		 * @param {number} chatId - 聊天ID
		 * @param {Object} message - 消息对象
		 */
		addMessage(chatId, message) {
			if (!this.messages[chatId]) {
				this.messages[chatId] = [];
			}
			this.messages[chatId].push(message);
		},
		
		/**
		 * 更新消息（用于点赞/点踩）
		 * @param {number} chatId - 聊天ID
		 * @param {number} messageId - 消息ID
		 * @param {Object} updates - 更新的字段
		 */
		updateMessage(chatId, messageId, updates) {
			const messages = this.messages[chatId];
			if (messages) {
				const msg = messages.find(m => m.id === messageId);
				if (msg) {
					Object.assign(msg, updates);
				}
			}
		},
		
		/**
		 * 标记聊天为已读（进入聊天时调用）
		 * @param {number} chatId - 聊天ID
		 */
		markAsRead(chatId) {
			const messages = this.messages[chatId];
			if (messages && messages.length > 0) {
				// 记录最后一条消息的ID
				const lastMsg = messages[messages.length - 1];
				this.lastReadMessageId[chatId] = lastMsg.id;
			}
		},
		
		/**
		 * 删除消息
		 * @param {number} chatId - 聊天ID
		 * @param {number} messageId - 消息ID
		 */
		deleteMessage(chatId, messageId) {
			const messages = this.messages[chatId];
			if (messages) {
				const index = messages.findIndex(m => m.id === messageId);
				if (index > -1) {
					messages.splice(index, 1);
				}
			}
		},
		
		/**
		 * 清空指定聊天的消息
		 * @param {number} chatId - 聊天ID
		 */
		clearChat(chatId) {
			this.messages[chatId] = [];
			this.lastReadMessageId[chatId] = 0;
		},
		
		/**
		 * 重置所有消息到初始状态
		 */
		resetAllMessages() {
			this.messages = { ...initialMessages };
			this.lastReadMessageId = {};
		}
	},
	
	// 持久化配置
	persist: {
		enabled: true,
		strategies: [
			{
				key: 'chat-messages',
				storage: {
					getItem: (key) => uni.getStorageSync(key),
					setItem: (key, value) => uni.setStorageSync(key, value)
				}
			}
		]
	}
});
