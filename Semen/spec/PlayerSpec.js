let webdriver = require('selenium-webdriver');
let driver;
describe("task", function() {

  beforeAll(function (done) {
    driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
    driver.get('https://www.google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('iTechArt\n').then(done);
  },10000);

  it("Check Num Of Results",async function(){
    let numOfResults = await driver.findElement(webdriver.By.xpath('//*[@id="resultStats"]'));
    let text = await numOfResults.getText();
    let numRes = await text.slice(0,text.indexOf('('));
    let timeRes = await text.slice(text.indexOf('('));
    expect(+numRes.replace(/\D+/g,"")).toBeGreaterThan(1000);
  },10000);

  it("Check URL",async function(){
    let numOfResults = await driver.findElements(webdriver.By.xpath('//cite'));
    for(let result of numOfResults)
    {
      let text = await result.getText();
      expect(text.toString().toLowerCase().includes("itechart")).toBe(true);
    }
  },10000);

  it("Check Label",async function(){
    let numOfResults = await driver.findElements(webdriver.By.className('LC20lb'));
    for(let result of numOfResults)
    {
      let text = await result.getText();
      expect(text.toString().toLowerCase().includes("itechart")).toBe(true);
    }
  },10000);

  it("Check Label",async function(){
    let numOfResults = await driver.findElements(webdriver.By.className('st'));
    for(let result of numOfResults)
    {
      let text = await result.getText();
      expect(text.toString().toLowerCase().includes("itechart")).toBe(true);
    }
  },10000);

  afterAll(function () {
    driver.quit();
  });
  });




