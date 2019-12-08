let webdriverio = require('webdriverio');
describe("app Test",()=>{
    beforeAll(async () => {
        var Selector = 'android=new UiSelector().resourceId("Login Logo")';
        browser.waitForVisible(Selector);
        browser
            .element(Selector)
            .click()
            .click()
            .click()
            .click()
            .click()
            .pause(5000);
    });
});
