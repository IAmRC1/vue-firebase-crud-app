import firebase from 'firebase/app'
import 'firebase/firestore'
import { customconfig } from  './config/customconfig.js'


let config = {
  apiKey: customconfig.apiKey,
  authDomain: customconfig.authDomain,
  databaseURL: customconfig.databaseURL,
  projectId: customconfig.projectId,
  storageBucket: customconfig.storageBucket,
  messagingSenderId: customconfig.messagingSenderId,
  appId: customconfig.appId
};

firebase.initializeApp(config);
const db = firebase.firestore()
const eventsCollection = db.collection('events')

export {db, eventsCollection};
