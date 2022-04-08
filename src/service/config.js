import Utils from '@/utils';

// 测试环境
export const testApi = '/test';
// 开发环境
export const devApi = '/api';
export const baseApi = devApi;
export const publicPath = Utils.getPublicPath();
export const mockApi = Utils.getPublicPath('mock');