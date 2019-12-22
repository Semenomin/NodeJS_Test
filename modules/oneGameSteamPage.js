const Page = require('./Page');
const { Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
let driver;

class OneGameSteamPage extends Page {
    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    async getDiscount(){
        let discount = await driver.wait (
            until.elementLocated(By.xpath('//div[@class="game_purchase_action_bg"]//div[@class=\'discount_pct\']')),
            10000
        );
        return await discount.getText();
    }

    async getFinalPrice(){
        let price = await driver.findElement(By.xpath('(//div[@class=\'game_purchase_action_bg\']//div[@class=\'discount_final_price\'])[1]'));
        return await price.getText();
    }

    async getPrice(){
        let price = await driver.wait (
            until.elementLocated(By.xpath('(//*[@class=\'game_purchase_price price\'])[1]')),
            10000
        );
        return await price.getText();
    }

    async goSteamInstall(){
        let Button = await driver.wait(
            until.elementLocated(webdriver.By.className('header_installsteam_btn')),
            20000
        );
        Button.click();
    }
}
module.exports = new OneGameSteamPage();