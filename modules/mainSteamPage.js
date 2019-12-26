const Page = require('./Page');
const { By, until } = require('selenium-webdriver');
let driver;

const menu_item = '//a[@class=\'pulldown_desktop\' and contains(text(),';

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

    async goMenu(menu){
        let elem = await driver.wait (
            until.elementLocated(By.xpath(menu_item+`'${menu}'`+')]')),
            10000
        );
        await driver.actions({bridge: true}).move({duration:10,origin:elem,x:0,y:0}).perform();
    }

    async goMenuItem(item){
        await driver.findElement(By.linkText(item)).click();
    }
}
module.exports = new MainSteamPage();