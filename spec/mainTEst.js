const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const mainSteamPage= require('../Modules/mainPage.js');
const actionGamesPage = require('../modules/actionGamesPage.js');
const gamePage = require('../modules/gamePage.js');
const steamPage = require('../modules/downloadSteamPage.js');

require('jasmine');
let chrome = require('chromedriver');
let chromeCapabilities = webdriver.Capabilities.chrome();
const chromeOption = require('selenium-webdriver/chrome');
let chromeOptions = {
    'prefs': {"download.default_directory":"C:/Users/Semenomin/Downloads"}
};
chromeCapabilities.set('chromeOptions', chromeOptions);
let driver = new webdriver.Builder()
    .withCapabilities(chromeCapabilities)
    .build();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

describe("Steam test", function() {

    beforeAll(async function () {
        await mainSteamPage.setDriver(driver);
        await mainSteamPage.open();
        await mainSteamPage.goMenuItem('Экшен');
        driver = await mainSteamPage.getDriver();
    });

    afterAll(async function(){
        await driver.quit();
    });

    it("Check Discount",async ()=>{
        let textPrice;
        await actionGamesPage.setDriver(driver);
        let maxDiscount = await actionGamesPage.findMaxDiscount();
        let textDisc = await maxDiscount.getText();
        if(maxDiscount == null){
            let maxPrice = await  actionGamesPage.findMaxPrice();
            textPrice = await maxPrice.getText();
            await maxPrice.click();
        }
        await maxDiscount.click();
        driver = await actionGamesPage.getDriver();
        gamePage.setDriver(driver);
        let disc = await gamePage.getDiscount();
        let price = await gamePage.getPrice();
        if(maxDiscount == null){
            expect(price).toContain(textPrice);
        }
        else expect(disc).toContain(textDisc);
    });

    it("Download Steam",async ()=>{
        await gamePage.goSteamInstall();
        driver = await gamePage.getDriver();
        await steamPage.setDriver(driver);
        await steamPage.downloadSteam();
    });
});