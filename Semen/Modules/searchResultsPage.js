const Page = require('./Page');
const webdriver = require('selenium-webdriver');
const jasmine = require('jasmine');
const { Builder, By, Key, until} = require('selenium-webdriver');
const TIMEOUT = 90000;
const log = require('../log4js');
let browser = 'chrome';
let driver;

class SearchResultsPage extends Page {

    setDriver(value){
        driver = value;
        log.debug("setDriver(value) - Sets Driver");
    }

    getDriver(){
        log.debug("getDriver() - Returns Driver");
        return driver;
    }

    async getURL(){
        log.debug("getURL() - Returns URLs");
        return await driver.findElements(webdriver.By.xpath('//cite'));
    }

    async getLabel(){
        log.debug("getLabel() - Returns Labels");
        return await driver.findElements(webdriver.By.className('LC20lb'));
    }

    async getDesc(){
        log.debug("getDesc() - Returns Descriptions");
        return await driver.findElements(webdriver.By.xpath('//span[@class = "st"]'));
    }

    async getNumOfResults(){
        log.debug("getNumOfResults() - Returns Number Of Searching Results");
        let numOfResults = await driver.findElement(webdriver.By.xpath('//*[@id="resultStats"]'));
        let text = await numOfResults.getText();
        return text.slice(0, text.indexOf('('));
    }

    async getTimeOfSearching(){
        log.debug("getTimeOfSearching() - Returns Time Of Searching");
        let numOfResults = await driver.findElement(webdriver.By.xpath('//*[@id="resultStats"]'));
        let text = await numOfResults.getText();
        return text.slice(text.indexOf('('));
    }

    async getblock(){
        log.debug("getblock() - Returns Block");
        return await driver.findElements(webdriver.By.xpath('//*[@class="g"]'));
    }

    async goNextPage(){
        log.debug("goNextPage() - goes to the next Page");
        await driver.wait(until.elementLocated(By.id('pnnext')));
        await driver.findElement(By.id('pnnext'))
            .then(element => element.click());
    }
}
module.exports = new SearchResultsPage();