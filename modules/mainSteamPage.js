const Page = require('./Page');
const { By, until } = require('selenium-webdriver');
require('selenium-webdriver');
require('jasmine');
let driver;

class MainSteamPage extends Page {

    setDriver(value){
        driver = value;
    }

    getDriver(){
        return driver;
    }

    open() {
        super.open("https://store.steampowered.com/", driver);
    }

    async goMenuItem(item){
        let elem = await driver.wait (
            until.elementLocated(By.id('genre_tab')),
            10000
        );
        await driver.actions({bridge: true}).move({duration:10,origin:elem,x:0,y:0}).perform();
        await driver.findElement(By.linkText(item)).click();
    }
}
module.exports = new MainSteamPage();