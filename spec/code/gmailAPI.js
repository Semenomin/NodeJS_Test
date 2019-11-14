const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const config = require('../support/config');

exports.authorize = async function authorize(logger) {
    await logger.debug("Start Authorizing Gmail Api");
    await logger.debug("Reading Credentials");
    let content = await fs.readFileSync(config.CREDENTIALS_PATH);
    const { client_secret, client_id, redirect_uris } = await JSON.parse(content).installed;
    const oAuth2Client =await new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    await logger.debug("Reading Token");
    let token = await fs.readFileSync(config.TOKEN_PATH);
    await oAuth2Client.setCredentials(JSON.parse(token));
    await logger.debug("Finish Authorizing Gmail Api");
    return oAuth2Client;
};

exports.getMessagesAmount = async function(logger, auth) {
    await logger.debug('Start Getting Amount Of Messages');
    let messagesList = await getAllMessages(auth);
    await logger.debug('Finish Getting Amount Of Messages');
    return await messagesList.data.messages.length;
};

async function getAllMessages(auth){
    const gmail = await google.gmail({ version: 'v1', auth });
    return await gmail.users.messages.list({ userId: 'me' });
}

async function getMessageData(id,auth){
    const gmail = await google.gmail({ version: 'v1', auth });
    return await gmail.users.messages.get({
        userId: 'me',
        id: id
    });
}
exports.getSubjects = async function getSubjects(logger,auth){
    let messageSubject = "Empty";
    let messagesList = await getAllMessages(auth);
    for(let { id } of messagesList.data.messages){
        let messageData = await getMessageData(id,auth);
        for (let { name, value } of messageData.data.payload.headers) {
            if (name === 'Subject') {
                messageSubject = value;
                break;
            }
            logger.info(messageSubject);
        }
    }
}