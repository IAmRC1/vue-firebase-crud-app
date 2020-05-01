import firebase from 'firebase'


let config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(config);
const db = firebase.firestore()
const eventsCollection = db.collection('events')

export {db, eventsCollection};
