import { Inject, Logger } from 'egg';
import { CronParams, Schedule, ScheduleType } from 'egg/schedule';

@Schedule<CronParams>({
    type: ScheduleType.WORKER,
    scheduleData: {
        cron: '0 0 22 * * *',
        // 每 5 秒执行一次
        // cron: '*/5 * * * * *',
    },
})
export class CronSubscriber {
    @Inject()
    private logger: Logger;

    async subscribe() {
        this.logger.info('schedule called');
    }
}