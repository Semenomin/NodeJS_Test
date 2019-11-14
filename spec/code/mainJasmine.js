require('jasmine');
const logger = require('../support/log4js');
const gmail = require('../code/gmailAPI');
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
        await gmail.getSubjects(logger, auth);
    });
});