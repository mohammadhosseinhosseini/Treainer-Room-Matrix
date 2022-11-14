import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyAWG0wqHIBrEroaEZzwHl1kuGb-6Wp0bIU',
    authDomain: 'room-matrix.firebaseapp.com',
    projectId: 'room-matrix',
    storageBucket: 'room-matrix.appspot.com',
    messagingSenderId: '715707145704',
    appId: '1:715707145704:web:a938048f69a64337f7985d',
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const db = getFirestore(app)
