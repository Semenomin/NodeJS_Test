const Page = require('./Page');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');

let driver;

class SearchPage extends Page {

    setDriver(value){
        driver = value;
    }

    getDriver(){
        return driver;
    }
    open() {
        super.open("https://www.google.com",driver);
    }

    async writeSearch(request){
       let res = await driver.findElement(webdriver.By.name('q'));
       await res.sendKeys(request);
    }
}
module.exports = new SearchPage();