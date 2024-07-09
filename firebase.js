import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: "AIzaSyAtLySXiEHoNN6_siJ6fVdTkzxAZTHa82Y",
authDomain: "guardameulanche.firebaseapp.com",
projectId: "guardameulanche",
storageBucket: "guardameulanche.appspot.com",
messagingSenderId: "143175532237",
appId: "1:143175532237:web:818d9a7757ee3b02ccb384",
measurementId: "G-5CQ9GZ93XT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // Remove the app parameter