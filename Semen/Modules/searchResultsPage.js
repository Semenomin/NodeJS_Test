const Page = require('./Page');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
const { Builder, By, Key, until } = require('selenium-webdriver');
let browser = 'chrome';
let driver;

class SearchResultsPage extends Page {

    setDriver(value){
        driver = value;
    }

    getDriver(){
        return driver;
    }

    async getURL(){
        return await driver.findElements(webdriver.By.xpath('//cite'));
    }

    async getLabel(){
        return await driver.findElements(webdriver.By.className('LC20lb'));
    }

    async getDesc(){
        return await driver.findElements(webdriver.By.xpath('//span[@class = "st"]'));
    }

    async getNumOfResults(){
        let numOfResults = await driver.findElement(webdriver.By.xpath('//*[@id="resultStats"]'));
        let text = await numOfResults.getText();
        return text.slice(0, text.indexOf('('));
    }

    async getTimeOfSearching(){
        let numOfResults = await driver.findElement(webdriver.By.xpath('//*[@id="resultStats"]'));
        let text = await numOfResults.getText();
        return text.slice(text.indexOf('('));
    }

    async getblock(){
        return await driver.findElements(webdriver.By.xpath('//*[@class="g"]'));
    }

    async goNextPage(){
        await driver.wait(until.elementLocated(By.id('pnnext')));
        await driver.findElement(By.id('pnnext'))
            .then(element => element.click());
    }
}
module.exports = new SearchResultsPage();