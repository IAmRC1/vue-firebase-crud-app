# event-management-vue-firebase

Project assumes you to have knowledge of setting up firestore and paste the config in Firebase.js file, also, create a database with name 'events' along with the keys in AddEvent.vue.
Change the rules in firestore..
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if ##true;
    }
  }
}
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
