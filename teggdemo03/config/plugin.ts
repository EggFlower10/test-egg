import tracerPlugin from '@eggjs/tracer';

export default {
  // enable tracer plugin
  teggSchedule: true,
  ...tracerPlugin(),
};
