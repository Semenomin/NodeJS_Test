const fs = require('fs-extra');
const log4js = require('log4js');
if (!fs.exists("./logs")){
    fs.mkdir("./logs");
}
log4js.configure('log4js.json');
module.exports = log4js.getLogger('file');