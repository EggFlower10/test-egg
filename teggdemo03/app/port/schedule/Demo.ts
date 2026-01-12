// app/port/schedule/Demo.ts
import { Inject, Logger } from 'egg';
import { IntervalParams, Schedule, ScheduleType } from 'egg/schedule';

@Schedule<IntervalParams>({
    type: ScheduleType.WORKER,
    scheduleData: {
        interval: 100, // 每 100ms 执行一次
        // interval: '5s', // 每 5s 执行一次
    },
})
export class IntervalScheduler {
    @Inject()
    private logger: Logger;

    async subscribe() {
        this.logger.info('schedule called');
    }
}