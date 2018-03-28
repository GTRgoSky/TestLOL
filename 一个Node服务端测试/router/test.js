const express = require('express');
const router = express.Router();

// 定义网站主页的路由
router.get('/', function(req,res,next){
    console.log('i get request & send it to next');
    next();
},function (req, res) {
    res.send(`Test:Birds home page --- Time:${req.getTime}`);
});
// 定义 about 页面的路由
router.get('/about', function (req, res) {
    res.send(`Test:About birds--- Time:${req.getTime}`);
});



module.exports = router