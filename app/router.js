module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get(`/classify`,controller.classify.index);
    router.get('/wx',controller.wx.index);
    router.post('/wx',controller.wx.wxMsg);
    router.post('/wx/menu',controller.wx.wxMsg);
};
