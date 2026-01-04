/**
 * Pinia Store 入口文件
 */
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();

// 配置持久化插件
pinia.use(
	createPersistedState({
		storage: {
			getItem: (key) => uni.getStorageSync(key),
			setItem: (key, value) => uni.setStorageSync(key, value)
		}
	})
);

export default pinia;

// 导出所有store
export * from './chat';
