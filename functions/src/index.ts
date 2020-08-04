import * as functions from 'firebase-functions';
import handleIncomingText from './incomingText';
import sendLettersFunction from './sendLetters';

export const incomingText = functions.https.onRequest(handleIncomingText);
export const sendLetters = functions.pubsub.schedule('0 22 * * *')
    .timeZone('America/New_York')
    .onRun(sendLettersFunction);
