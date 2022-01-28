// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDgozn_DjJS1eOwDLfEyN6nfehADuIQQZw',
  authDomain: 'my-unsplash-cceac.firebaseapp.com',
  databaseURL: 'https://my-unsplash-cceac-default-rtdb.firebaseio.com',
  projectId: 'my-unsplash-cceac',
  storageBucket: 'my-unsplash-cceac.appspot.com',
  messagingSenderId: '197227525207',
  appId: '1:197227525207:web:cfe0f2fb3c1c2a11d09f12'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getDatabase(app)

export default db
