let webdriver = require('selenium-webdriver');
let browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
browser.get('https://www.google.com/');
browser.findElements(webdriver.By.name('q'))
    .then(function(callbacks){
    console.log('Found', callbacks.length, 'className');
    });