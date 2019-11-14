const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const config = require('../support/config');
const base64 = require('js-base64');

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
    let subjectList = [];

    for(let { id } of messagesList.data.messages){
        let messageData = await getMessageData(id,auth);
        for (let { name, value } of messageData.data.payload.headers) {
            if (name === 'Subject') {
                subjectList.push(value);
                await messageOutput(messageData,logger,value);
                break;
            }
        }
    }
    return subjectList;
};

async function messageOutput(messageData,logger,subject){
    logger.debug('Start Output Message');
    let body = await getBody(messageData,logger);
    let deadline = await getDeadline(messageData,logger);
    logger.info(`Задание: ${subject}\r\nСрок выполнения:${deadline}\r\nТело письма:\r\n${body}`);
    logger.debug('Finish Output Message');
}

async function getBody(messageData,logger){
    logger.debug('Start Getting Body');
    let base64 = await require('js-base64').Base64;
    let bodyData = await messageData.data.payload.parts[0].body.data;
    logger.debug('Finish Getting Body');
    return base64.decode(bodyData).replace(/[*]/g, '');
}

async function getDeadline(messageData,logger) {
    logger.debug('Start Getting Deadline');
    let body = await getBody(messageData, logger);
    let findStr = "выполнения";
    let Deadline = await body.slice(body.indexOf(findStr)+findStr.length+3, body.indexOf(findStr)+findStr.length+33);
    logger.debug('Finish Getting Deadline');
    return Deadline;
}