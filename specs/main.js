const logger = require('../logger').logger;
const Page = require('../specs/Page.js');
const assert = require('assert').strict;

describe('Android', function () {
        logger.info('Start describe');
        it('0 task',async ()=>{
            await Page.click("~Login Logo", 5);
            await Page.click('android=new UiSelector().className("android.widget.TextView").textContains("QA1")');
            await Page.back();
        });

        it('1 task\'click login Button\'',async ()=>{
            logger.info("Start task 1");
            logger.debug("Click on LogIn button");
            await Page.click('~Login Button');
            logger.info("Final task 1");
        });

        it('2 task \'Enter username and password\'',async ()=>{
            logger.info("Start task 2");
            await Page.setCreeds(`user_username`, 11);
            await Page.setCreeds(`user_password`, 13);
            logger.info("Final task 2");
        });

        it('3 task \'Click Sign In\'',async ()=>{
            logger.info("Start task 3");
            logger.debug("Click Submit Button");
            await Page.click(`android=new UiSelector().resourceId("submit")`);
            logger.info("Final task 3");
        });

        it('4 task \'Catch Error\'',async ()=>{
            logger.info("Start task 4");
            const err = await Page.getError('android=new UiSelector().className("android.view.View").textContains("error")');
            expect(err).toContain('We didn\'t recognize the username or password you entered.');
            logger.info("Final task 4");
            logger.info('End describe');
        });
});
