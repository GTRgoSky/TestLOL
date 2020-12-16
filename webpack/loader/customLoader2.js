const fs = require('fs');

module.exports = function(source) { 
    fs.writeFile('webpack日志.txt', source, (err) => {
        if (err) throw err;
    });
    return source;
}