var firebase = require("firebase/app");
require("firebase/auth");

var config = {
  apiKey: "AIzaSyCyfMa1zkydaN8zTi7lWOoUI9I7gEDpx6o",
  authDomain: "temp-51f90.firebaseapp.com",
  databaseURL: "https://temp-51f90.firebaseio.com",
  projectId: "temp-51f90",
  storageBucket: "temp-51f90.appspot.com",
  messagingSenderId: "818180391362"
};

firebase.initializeApp(config);

export default firebase;