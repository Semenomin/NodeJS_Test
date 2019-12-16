const Page = require('./Page');
const { Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
let driver;

class ActionGamesPage extends Page {

    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    async findMaxDiscount(){
        let min = 0;
        let minDiscount;
        let discounts = await driver.findElements(By.xpath('//div[@id="tab_content_NewReleases"]//div[@class=\'discount_pct\']'));
        if(discounts === null){
            return null
        }

        for(let discount of discounts)
        {
            let text = await discount.getText();
            text = text.slice(0,3);
            if(min > +text){
                min = +text;
                minDiscount = discount;
            }
        }
        return minDiscount;
    }

    async findMaxPrice(){
        let max = 0;
        let maxPrice;
        let prices = await driver.findElements(By.xpath('//div[@id="tab_content_NewReleases"]//div[@class=\'discount_final_price\']'));
        let text = await prices[0].getText();
        max = text.slice(1);
        maxPrice = prices[0];
        for(let price of prices)
        {
            let text = await price.getText();
            text = text.slice(1);
            if(max < +text){
                max = +text;
                maxPrice = price;
            }
        }
        return maxPrice
    }
}
module.exports = new ActionGamesPage();