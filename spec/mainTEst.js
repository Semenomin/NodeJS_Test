const { Builder } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const mainSteamPage= require('../modules/mainSteamPage.js');
const actionGamesPage = require('../modules/listGamesPage.js');
const gamePage = require('../modules/oneGameSteamPage.js');
const steamPage = require('../modules/downloadSteamPage.js');
const birthdayPage = require('../modules/checkBirthdayPage.js');
const config = require('../config.js');
require('jasmine');

require('chromedriver');
let chromeCapabilities = webdriver.Capabilities.chrome();
require('selenium-webdriver/chrome');
let chromeOptions = {
    'prefs': {"download.default_directory":config.download_path}
};
chromeCapabilities.set('chromeOptions', chromeOptions);
let driver = new Builder()
    .withCapabilities(chromeCapabilities)
    .build();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

let textPrice, textFinalPrice, textDiscount, price, disc;

describe("Steam test", function() {

    beforeAll(async function () {
        await mainSteamPage.setDriver(driver);
        await mainSteamPage.open();
        await mainSteamPage.goMenu(config.menu);
        await mainSteamPage.goMenuItem(config.menu_item);
        driver = await mainSteamPage.getDriver();
    });

    afterAll(async function(){
        await driver.quit();
    });

    it("Check Discount or Price", async ()=>{
        await actionGamesPage.setDriver(driver);
        await actionGamesPage.goNewReleases();
        let maxDiscount = await actionGamesPage.findMaxDiscount();
        if(maxDiscount === null){
            let maxPrice = await actionGamesPage.findMaxPrice();
            textPrice = await maxPrice.getText();
            await maxPrice.click();
        }
        else {
            textDiscount = await maxDiscount.getText();
            textFinalPrice = await actionGamesPage.getPrice();
            await maxDiscount.click();
        }
        driver = await actionGamesPage.getDriver();
        await birthdayPage.setDriver(driver);
        if(await birthdayPage.isExists()){
            await birthdayPage.inputKeys();
            driver = await birthdayPage.getDriver();
        }
        gamePage.setDriver(driver);
        if(maxDiscount === null){
            price = await gamePage.getPrice();
            expect(price).toContain(textPrice);
        }
        else {
            disc = await gamePage.getDiscount();
            price = await gamePage.getFinalPrice();
            expect(disc).toContain(textDiscount);
            expect(price).toContain(textFinalPrice);
        }
    });

    it("Download Steam",async ()=>{
        await gamePage.goSteamInstall();
        driver = await gamePage.getDriver();
        await steamPage.setDriver(driver);
        await steamPage.downloadSteam();
        await steamPage.waitDownload();
    });
});