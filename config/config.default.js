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
     ignore: ['/wx','/data/import'],
     
  },
}

exports.cluster = {
  listen: {
    port: 30050,
    hostname: '127.0.0.1',
    // path: '/var/run/egg.sock',
  }
}

exports.wxApi = {
   "access_token":"https://api.weixin.qq.com/cgi-bin/token",
   "menu": "https://api.weixin.qq.com/cgi-bin/menu/create?access_token="
}

exports.wxParam ={
  appId:"wx4aa6e37fb8fb1a82",
  appSecret:"dbc812b7a1507046dca742764889e951"
}

exports.search = {
  shfb: "http://trash.lhsr.cn/sites/feiguan/trashTypes_2/TrashQuery.aspx",
  lsdq: "http://api.lvsediqiu.com/official/wiki/search"
}