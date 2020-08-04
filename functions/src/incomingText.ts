const {saveLetter} = require('../services/letters.ts')
const {parseRoseAndThorn} = require('../services/textParsers.js');
const moment = require('moment-timezone');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const handleIncomingText = (request: any, response: any): void => {
    const twiml = new MessagingResponse();
    const body: string = request.body.Body;
    const from: string = request.body.From;

    const parsedRoseAndThorn = parseRoseAndThorn(body);

    if (!(parsedRoseAndThorn.rose || parsedRoseAndThorn.thorn)) {
        twiml.message(
            `Unable to parse your message. Please try again and begin your rose with "rose:" or "rose-", and your thorn with "thorn:" or "thorn-".`
        );
        response.writeHead(200, {'Content-Type': 'text/xml'});
        response.end(twiml.toString());
    } else {
        saveLetter(from, parsedRoseAndThorn)
            .then((letter: any) => {
                const hour = moment().tz("America/New_York").hour();
                // 22 refers to 10pm on the East Coast of the US.
                const isAfterCutoff = hour >= 22;
                const savedLetter = letter.data();

                if (savedLetter.rose && savedLetter.thorn) {
                    const afterCutoffMessage = `Thanks, we've saved your responses. We've already sent out the messages for today, so we'll reach out tomorrow evening with someone else's rose and thorn.`
                    const beforeCutoffMessage = `Thanks, we've saved your responses, and we'll reach out this evening with someone else's rose and thorn.`

                    twiml.message(isAfterCutoff ? afterCutoffMessage : beforeCutoffMessage);
                } else if (savedLetter.rose) {
                    twiml.message(`We've saved your rose, please also text us your thorn.`);
                } else if (savedLetter.thorn) {
                    twiml.message(`We've saved your thorn, please also text us your rose.`);
                }
            
                response.writeHead(200, {'Content-Type': 'text/xml'});
                response.end(twiml.toString());
            })
            .catch((err: any) => {
                console.error(err);
                twiml.message(`We've encountered a problem, please try again later.`);
                response.writeHead(200, {'Content-Type': 'text/xml'});
                response.end(twiml.toString());
            });
    }

};

export default handleIncomingText;
