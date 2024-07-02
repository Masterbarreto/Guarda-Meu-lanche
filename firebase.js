import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAtLySXiEHoNN6_siJ6fVdTkzxAZTHa82Y",
    authDomain: "guardameulanche.firebaseapp.com",
    projectId: "guardameulanche",
    storageBucket: "guardameulanche.appspot.com",
    messagingSenderId: "143175532237",
    appId: "1:143175532237:web:818d9a7757ee3b02ccb384",
    measurementId: "G-5CQ9GZ93XT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };