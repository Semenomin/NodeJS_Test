const Page = require('./Page');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
const log = require('../log4js');

let driver;

class SearchPage extends Page {

    setDriver(value){
        log.debug("setDriver(value) - Sets driver");
        driver = value;
    }

    getDriver(){
        log.debug("getDriver(value) - Returns driver");
        return driver;
    }
    open() {
        log.debug("open() - opens Google.by");
        super.open("https://www.google.by",driver);
    }

    async writeSearch(request){
        log.debug("writeSearch(request) - writes request in GoogleSearch field");
        let res = await driver.findElement(webdriver.By.name('q'));
       await res.sendKeys(request);
    }
}
module.exports = new SearchPage();