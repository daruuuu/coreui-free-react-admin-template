/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6OJTHib5F8mwulbtlb_cIK4DbPipMkas',
  authDomain: 'print-suhu-tubuh.firebaseapp.com',
  databaseURL: 'https://print-suhu-tubuh-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'print-suhu-tubuh',
  storageBucket: 'print-suhu-tubuh.appspot.com',
  messagingSenderId: '552865669790',
  appId: '1:552865669790:web:b66daebdbde98cbb45918f',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
