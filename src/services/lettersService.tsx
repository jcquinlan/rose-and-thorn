import firebase from '../firebase_init';
const db = firebase().firestore();

export type Letter = {
    id?: string;
    rose?: string;
    thorn?: string;
};

export const getLetters = (): Promise<firebase.firestore.DocumentData> => {
    return db.collection("letters")
        .where('completed', '==', true)
        .get()
        .then(({docs}: any) => docs);
}

export const getLetter = (id: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> => {
    return db.collection("letters")
        .doc(id)
        .get();
}
