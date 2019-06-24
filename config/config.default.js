exports.keys = 'somekeys';
exports.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'rubbish_db',
    host: '47.98.167.18',
    port: 13306,
    username: 'shial',
    password: 'zminfo@123',
    define: {
        freezeTableName: true,
        underscored: false
    }
   
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
  };