const Page = require('./Page');
const config = require('../config.js');
const fs = require('fs');
const path = require('path');
const {until,By} = require('selenium-webdriver');
let driver;

const download_steam = 'about_install win';

class steamPage extends Page {
    setDriver(value) {
        driver = value;
    }

    async downloadSteam(){
        await driver.wait (
            until.elementLocated(By.className(download_steam)),
            20000
        ).click();
    }

    async waitDownload(){
        let isDownloaded = false;
        while (!isDownloaded) {
            let files = fs.readdirSync(config.download_path);
            for (let file of files) {
                let filename = path.join(config.download_path, file);
                if(path.extname(file)===`.crdownload`){
                    isDownloaded = false;
                }
                else if (filename.includes('SteamSetup')) {
                    isDownloaded = true;
                }
            }
        }
    }
}
module.exports = new steamPage();