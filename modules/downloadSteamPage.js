const Page = require('./Page');
const { Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
let driver;

class steamPage extends Page {
    setDriver(value) {
        driver = value;
    }

    async downloadSteam(){
        let Button = await driver.wait (
            until.elementLocated(webdriver.By.className('about_install_steam_link')),
            20000
        );
        Button.click();
    }
}
module.exports = new steamPage();