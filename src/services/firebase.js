/* eslint-disable import/prefer-default-export */
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAJQk-ROX1Xd69hzcw1vUhZCCOlopGOe_E",
  authDomain: "motordoc-a0dc7.firebaseapp.com",
  databaseURL: "https://motordoc-a0dc7.firebaseio.com",
  projectId: "motordoc-a0dc7",
  storageBucket: "motordoc-a0dc7.appspot.com",
  messagingSenderId: "347152729591",
  appId: "1:347152729591:web:444f16e2edb55a1440daf2",
  measurementId: "G-DHMT8YN077"
};

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database();

export const referenciaFirebase = databaseRef;
