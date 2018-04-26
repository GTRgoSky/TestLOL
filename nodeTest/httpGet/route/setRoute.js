//设置路由
var routes = {
    '/a': function (req, res) {
        res.end('match /a')
    },

    '/b': function (req, res) {
        res.end(JSON.stringify(req.query))
    },

    '/search': function (req, res) {
        res.end('username=' + req.body.username + ',password=' + req.body.password)

    }

};

module.exports = routes;