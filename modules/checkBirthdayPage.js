const Page = require('./Page');
const config = require('../config.js');
const {By} = require('selenium-webdriver');
let driver;

const submit_btn = '//*[@class=\'btnv6_blue_hoverfade btn_medium\'][@onclick=\'ViewProductPage()\']';

class CheckBirthdayPage extends Page {


    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    async isExists(){
        let url = await driver.getCurrentUrl().toString();
        return url.replace('/', ' ').includes('agecheck');
    }

    async inputKeys(){
        await driver.findElement(By.id('ageDay')).sendKeys(config.birth_day);
        await driver.findElement(By.id('ageMonth')).sendKeys(config.birth_month);
        await driver.findElement(By.id('ageYear')).sendKeys(config.birth_year);
        await driver.findElement(By.xpath(submit_btn)).click();
    }
}
module.exports = new CheckBirthdayPage();