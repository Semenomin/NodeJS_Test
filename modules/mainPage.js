const Page = require('./Page');
const { Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
let driver;

class MainSteamPage extends Page {

    setDriver(value){
        driver = value;
    }

    getDriver(){
        return driver;
    }

    open() {
        super.open("https://store.steampowered.com/",driver);
    }

    async goMenuItem(item){
        let Button = await driver.wait (
            until.elementLocated(webdriver.By.linkText(
                item)),
            30000
        );

        await Button.click();
    }
}
module.exports = new MainSteamPage();