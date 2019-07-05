const egg = require('egg');
const config = require('./config/config.default')
global.config = config;
const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  baseDir: __dirname,
});