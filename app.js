import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyACDxXTBt1ns0VKuNsnFqCTUslZFJipZNk",
    authDomain: "lights-7c4ff.firebaseapp.com",
    databaseURL: "https://lights-7c4ff.firebaseio.com",
    projectId: "lights-7c4ff",
    storageBucket: "lights-7c4ff.appspot.com",
    messagingSenderId: "464365479427",
    appId: "1:464365479427:web:ae87bcaca0a802cfed9036"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const motorStatusRef = ref(db, "MotorStatus");

let isOn = false;
let timer = null;

function turnOn() {
    if (!isOn) {
        isOn = true;
        set(motorStatusRef, 1); // set MotorStatus to 1

        // start countdown timer
        timer = setTimeout(() => {
            turnOff();
        }, 90000); // 90 seconds in milliseconds
    }
}

function turnOff() {
    if (isOn) {
        isOn = false;
        set(motorStatusRef, 0); // set MotorStatus to 0
        clearTimeout(timer); // clear the timer
    }
}

onValue(motorStatusRef, (snapshot) => {
    const motorStatus = snapshot.val();
    if (motorStatus === 1) {
        // motor is on
        isOn = true;
        timer = setTimeout(() => {
            turnOff();
        }, 90000);
    } else if (motorStatus === 0) {
        // motor is off
        isOn = false;
        clearTimeout(timer);
    }
});
