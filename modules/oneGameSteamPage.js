const Page = require('./Page');
const { By, until} = require('selenium-webdriver');
let driver;

const discount = '//div[@class="game_purchase_action_bg"]//div[@class=\'discount_pct\']';
const final_price = '(//div[@class=\'game_purchase_action_bg\']//div[@class=\'discount_final_price\'])[1]';
const price = '(//*[@class=\'game_purchase_price price\'])[1]';
const intall_steam_btn = 'header_installsteam_btn';

class OneGameSteamPage extends Page {
    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    async getDiscount(){
        let discount = await driver.wait (
            until.elementLocated(By.xpath(discount)),
            10000
        );
        return await discount.getText();
    }

    async getFinalPrice(){
        let price = await driver.findElement(By.xpath(final_price));
        return await price.getText();
    }

    async getPrice(){
        let price = await driver.wait (
            until.elementLocated(By.xpath(price)),
            10000
        );
        return await price.getText();
    }

    async goSteamInstall(){
        let Button = await driver.wait(
            until.elementLocated(By.className(intall_steam_btn)),
            20000
        );
        Button.click();
    }
}
module.exports = new OneGameSteamPage();