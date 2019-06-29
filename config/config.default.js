exports.keys = 'somekeys';
exports.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'rubbish_db',
    host: '127.0.0.1',
    port: 13306,
    username: 'root',
    password: 'cypshi.x',
    define: {
        freezeTableName: true,
        underscored: false
    }
   
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
  };

exports.security = {
  csrf: {
     ignore: '/wx'
  },
}

exports.cluster = {
  listen: {
    port: 30050,
    hostname: '127.0.0.1',
    // path: '/var/run/egg.sock',
  }
}
