import { ContextProto, AccessLevel, LifecyclePreDestroy } from 'egg';
import { setInterval, clearInterval } from 'node:timers';

@ContextProto({
    accessLevel: AccessLevel.PUBLIC,
})
export class ContextTimer {
    timer: NodeJS.Timeout;

    constructor() {
        this.timer = setInterval(() => {
            console.log('⏰ 定时器执行中...');
        }, 1000);
    }

    @LifecyclePreDestroy()
    protected async _preDestroy() {
        clearInterval(this.timer);
        console.log('⏹️  定时器已释放');
    }
}