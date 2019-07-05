module.exports = app => {
    const { router, controller } = app;
    //test
    router.get('/', controller.home.index);
    //数据导入
    router.post(`/data/import`,controller.data.import);
    //微信认证
    router.get('/wx',controller.wx.index);
    //自动回复
    router.post('/wx',controller.wx.wxMsg);
    //设置菜单
    router.post('/wx/menu',controller.wx.menu);
};
