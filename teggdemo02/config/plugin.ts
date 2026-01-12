import tracerPlugin from '@eggjs/tracer';

export default {
  // enable tracer plugin
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  ...tracerPlugin(),
};
