const firebaseConfig = {
apiKey: "AIzaSyA00fFaeffyQ7PLAxFtKYzxp1zausGlUro",
authDomain: "findus-web.firebaseapp.com",
databaseURL: "https://findus-web.firebaseio.com",
projectId: "findus-web",
storageBucket: "findus-web.appspot.com",
messagingSenderId: "755276629971",
appId: "1:755276629971:web:f497e763db3f8539311126",
measurementId: "G-CJ7GC2V2SL"
};

// Cloud Functions
const backendUrl = `https://us-central1-${
  firebaseConfig.projectId
}.cloudfunctions.net/api/api`;

// App Engine
// const backendUrl = `<insert app engine url here>`;

export default {
  firebaseConfig,
  backendUrl,
};
