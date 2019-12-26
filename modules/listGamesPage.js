const Page = require('./Page');
const {By, until} = require('selenium-webdriver');
let driver;
let index = 1;

const newReleases = `tab_select_NewReleases`;
const discount = '//div[@id="tab_content_NewReleases"]//div[@class=\'discount_pct\']';
const price = `(//div[@id="tab_content_NewReleases"]//div[@class='discount_pct']/..//div[@class='discount_final_price'])[`;
const max_price = '//div[@id="tab_content_NewReleases"]//div[@class=\'discount_final_price\']';
class ListGamesPage extends Page {

    setDriver(value) {
        driver = value;
    }

    getDriver() {
        return driver;
    }

    goNewReleases(){
        driver.wait (
            until.elementLocated(By.id(newReleases)),
            10000
        ).click();
    }

    async findMaxDiscount(){
        let min = 0;
        let minDiscount;
        let discounts = await driver.wait (
            until.elementsLocated(By.xpath(discount)),
            10000
        );
        if(discounts === null){
            return null
        }
        let i=0;
        for(let discount of await discounts)
        {
            i++;
            let text = await discount.getText();
            text = await text.slice(0,3);
            if(min > +text){
                index=i;
                min = +text;
                minDiscount = discount;
            }
        }
        return minDiscount;
    }

    getPrice(){
        return driver.findElement(By.xpath(price+index+`]`)).getText();
    }

    async findMaxPrice(){
        let max = 0;
        let maxPrice;
        let prices = await driver.findElements(By.xpath(max_price));
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
module.exports = new ListGamesPage();