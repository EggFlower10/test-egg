import tracerPlugin from '@eggjs/tracer';

export default {
  // enable tracer plugin
  teggAop: true,
  tracer: {
    enable: true,
    package: 'egg-tracer',
  },
  ...tracerPlugin(),
};
