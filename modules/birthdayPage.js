const Page = require('./Page');
const { Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
const config = require('../config.js');
let driver;

class BirthdayPage extends Page {

    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    async isExists(){
        let url = await driver.getCurrentUrl().toString();
        if(url.replace('/',' ').includes('agecheck')){
            return true
        }
        else return false
    }

    async inputKeys(){
        await driver.findElement(By.id('ageDay')).sendKeys(config.birth_day);
        await driver.findElement(By.id('ageMonth')).sendKeys(config.birth_month);
        await driver.findElement(By.id('ageYear')).sendKeys(config.birth_year);
        await driver.findElement(By.xpath('//*[@class=\'btnv6_blue_hoverfade btn_medium\'][@onclick=\'ViewProductPage()\']')).click();
    }
}
module.exports = new BirthdayPage();