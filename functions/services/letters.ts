const admin = require('firebase-admin');
const functions = require('firebase-functions');

const accountSid = 'ACf6de0e1d9d7df1052e94e54f44268a6d';
const authToken = '587b8f2fd4e3ebacf6a4910fb1cf86b8';
const client = require('twilio')(accountSid, authToken);

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

const getLetter = (id) => {
    return db.collection("letters")
        .doc(id)
        .get();
};

const createLetterBody = (rose, thorn) => {
    return `An anonymous rose and thorn:

${rose}

${thorn}`;
}

const sendLetter = (to, rose, thorn) => {
    return client.messages
        .create({
            body: createLetterBody(rose, thorn),
            from: '+12564144677',
            to
        })
}

const sendLetterPair = (letter1, letter2) => {
    const letter1Data = letter1.data();
    const letter2Data = letter2.data();

    sendLetter(letter2.id, letter1Data.rose, letter1Data.thorn)
        .then(() => letter1.ref.delete());

    sendLetter(letter1.id, letter2Data.rose, letter2Data.thorn)
        .then(() => letter2.ref.delete());
}

// @TODO - We can probably DRY up the logic for sending pairs and trios of
// emails, but for now, I'm really not worried about being verbose.
const sendLetterTrio = (letter1, letter2, letter3) => {
    const letter1Data = letter1.data();
    const letter2Data = letter2.data();
    const letter3Data = letter3.data();

    sendLetter(letter3.id, letter2Data.rose, letter2Data.thorn)
        .then(() => letter2.ref.delete());

    sendLetter(letter2.id, letter1Data.rose, letter1Data.thorn)
        .then(() => letter1.ref.delete());

    sendLetter(letter1.id, letter3Data.rose, letter3Data.thorn)
        .then(() => letter3.ref.delete());
}

exports.createAndSendLetterPairs = (letters) => {
    const thereAreAnOddNumberOfLetters = letters.length % 2 === 1;
    const numberOfPairs = Math.floor(letters.length / 2);

    for (let i = 0; i < numberOfPairs; i++) {
        const startingLetterIndex = i * 2;
        const letter1 = letters[startingLetterIndex];
        const letter2 = letters[startingLetterIndex + 1];

        // If we know there are an odd amount of letters to be sent out,
        // that means on the last iteration of this loop we actually want
        // to send a trio of texts.
        if (i === numberOfPairs - 1 && thereAreAnOddNumberOfLetters) {
            const letter3 = letters[startingLetterIndex + 2]
            // Just as a sanity check, let's just ensure we aren't flowing over the end of the array
            // by ensuring the third text is actually present.
            if (!!letter3) {
                sendLetterTrio(letter1, letter2, letter3);
            }
        } else {
            sendLetterPair(letter1, letter2);
        }
    }
};

exports.getLetters = () => {
    return db.collection("letters")
        .where('completed', '==', true)
        .get()
        .then(({docs}) => docs);
};

exports.saveLetter = async (from, parsedRoseAndThorn) => {
    return getLetter(from)
        .then((letter) => {
            const letterData = letter.data();
            const hypotheticalLetter = {...letterData, ...parsedRoseAndThorn};
            const completed = !!(hypotheticalLetter.rose && hypotheticalLetter.thorn);

            if (letter.exists) {
                return letter.ref.update({...parsedRoseAndThorn, completed});
            } else {
                return letter.ref.set({...parsedRoseAndThorn, completed});
            }
        })
        // fetch and return the newly updated document
        .then(() => getLetter(from));
};
