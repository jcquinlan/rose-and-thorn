const {getLetters, createAndSendLetterPairs} = require('../services/letters.ts')

const sendLettersFunction = (context: any) => {
    return getLetters()
        .then(createAndSendLetterPairs);
}

export default sendLettersFunction;
