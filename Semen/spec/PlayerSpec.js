const { Builder, By, Key, until } = require('selenium-webdriver');
const Config = require('../resourses.js');
const SearchPage = require('../Modules/searchPage.js');
const SearchResPage = require('../Modules/searchResultsPage.js');
require('jasmine');
require('chromedriver');
require('geckodriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

let driver;
let browser = "chrome";
driver = new Builder().forBrowser(browser).build();

if (process.argv[2] !== undefined){
  browser = process.argv[2].slice(process.argv[2].indexOf('=')+1);
}

describe("Google Search test", function() {

  beforeAll(async function (done) {
    await SearchPage.setDriver(driver);
    await SearchPage.open();
    await SearchPage.writeSearch('iTechArt\n');
    driver = await SearchPage.getDriver();
    await done();
  });

  afterAll(async function(){
    console.log(await SearchResPage.getNumOfResults());
    console.log(await SearchResPage.getTimeOfSearching());
    await driver.quit();
  });

  it("Check Text page 1", async function (done) {
    await SearchResPage.setDriver(driver);
    let res = await SearchResPage.getblock();
    for(let result of res){
      let text = await result.getText();
      expect(text.toLowerCase()).toContain(`${Config.searchString.toLowerCase()}`);
    }
    done();
  });

  it("Check Text page 2", async function (done) {
    await SearchResPage.goNextPage();
    let res = await SearchResPage.getblock();
    for(let result of res){
      let text = await result.getText();
      expect(text.toLowerCase()).toContain(`${Config.searchString.toLowerCase()}`);
    }
    done();
  });

  it("Check Num Of Results",async function(done){
    let numRes = await SearchResPage.getNumOfResults();
    expect(+numRes.replace(/\D+/g,"")).toBeGreaterThan(Config.numOfResults);
    done();
  });
});




