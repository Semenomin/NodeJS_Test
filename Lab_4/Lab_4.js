let webdriver = require('selenium-webdriver');
let browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
browser.get('https://www.onliner.by/');

browser.findElements(webdriver.By.className('onliner_logo'))
    .then(function(callbacks){
    console.log('Found', callbacks.length, 'className');
    });
browser.findElements(webdriver.By.id('fast-search'))
    .then(function(callbacks){
        console.log('Found', callbacks.length, 'id');
    });
browser.findElements(webdriver.By.tagName('body'))
    .then(function(callbacks){
        console.log('Found', callbacks.length, 'tagname');
    });
browser.findElements(webdriver.By.name('ym-native-frame'))
    .then(function(callbacks){
        console.log('Found', callbacks.length, 'name');
    });
browser.findElements(webdriver.By.linkText('МНЕНИЯ'))
    .then(function(callbacks){
        console.log('Found', callbacks.length, 'LinkText');
    });
browser.findElements(webdriver.By.partialLinkText('НОВОЕ'))
    .then(function(callbacks){
        console.log('Found', callbacks.length, 'partialLinkText');
    });
browser.findElements(webdriver.By.css('a[href="https://support.onliner.by/"]'))
    .then(function(callbacks){
        console.log('Found', callbacks.length, 'css');
        browser.quit();
    });