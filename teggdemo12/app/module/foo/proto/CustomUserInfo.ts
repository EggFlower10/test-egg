import { Inject, ContextProto, AccessLevel, LifecycleInit } from 'egg';

// 模拟 User 和 UserProfile 类型
export type User = { userId: string };
export type UserProfile = { mobile: string; name: string };

@ContextProto({
    accessLevel: AccessLevel.PUBLIC,
})
export class CustomUserInfo {
    mobile: string = '';
    profile: UserProfile = { mobile: '', name: '' };

    // @Inject()
    // private readonly userFacade: any; // 模拟 UserFacade
    @Inject()
    private readonly user?: User;

    @LifecycleInit()
    protected async _init() {
        if (!this.user?.userId) {
            throw new Error('非法用户请求');
        }
        // 模拟 RPC 调用
        this.profile = { mobile: '13800138000', name: '测试用户' };
        this.mobile = this.profile.mobile;
        console.log('👤 自定义用户信息初始化完成');
    }
}