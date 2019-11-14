require('jasmine');
const logger = require('../support/log4js');
const gmail = require('../code/gmailAPI');
const config = require('../support/config');

console.log = logger.info.bind(logger);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
let auth;
describe('GmailApi', function() {

    beforeAll(async function() {
        logger.debug("Start Gmail Api Test");
        auth = await gmail.authorize(logger);
    });

    it('Check Subjects',async function() {
        logger.debug("Start IT Check Subjects");
        for(let sub of await gmail.getSubjects(logger, auth)){
            expect(sub.toLowerCase()).toContain(`${config.subjectSearch.toLowerCase()}`);
        }
        logger.debug("Finish IT Check Subjects");
    });

    it('Check Count of Messages',async function() {
        logger.debug("Start IT Check Count of Messages");
        expect(await gmail.getMessagesAmount(logger,auth)).toBe(2);
        logger.debug("Finish IT Check Count of Messages");
    });

});