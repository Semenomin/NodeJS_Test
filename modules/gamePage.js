const Page = require('./Page');
const { Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
let driver;

class GamePage extends Page {
    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    async getDiscount(){
        let discount = await driver.findElement(By.xpath('//div[@class="game_purchase_action_bg"]//div[@class=\'discount_pct\']'));
        return await discount.getText();
    }

    async getPrice(){
        let price = await driver.findElement(By.xpath('//div[@class="game_purchase_action_bg"]//div[@class=\'discount_final_price\']'));
        return await price.getText();
    }

    async goSteamInstall(){
        let Button = await driver.wait (
            until.elementLocated(webdriver.By.className('header_installsteam_btn')),
            20000
        );
        Button.click();
    }
}
module.exports = new GamePage();