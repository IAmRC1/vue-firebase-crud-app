- [x] Added no data image
- [x] Added single event delete
- [x] Added Delete All button
- [x] Modify the database so as to recieve real time updates
- [x] Apply sorting on name & date
- [x] Fix delete all functionality
- [ ] Update the event from event-detail page
- [ ] Add validation using vuelidate/vee-validate
- [ ] Make it fully responsive


# event-management-vue-firebase

Project assumes you to have knowledge of setting up firestore and create a database with name 'events' along with the keys in AddEvent.vue.
Change the rules in firestore..
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
Then create a folder 'config' under src directory and inside config, create a file 'customconfig.js' and paste you config in that file like this

```
let customconfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

export { customconfig }
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
