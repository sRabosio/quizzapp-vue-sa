import {initializeApp } from 'firebase/app'
import {getFirestore, collection, getDocs, getDoc, doc} from 'firebase/firestore'


const firebaseApp = initializeApp({
    apiKey: "AIzaSyDQzKDdOL_q6xeQNuFsROR0rWDPUMbPtpI",
    authDomain: "quizzapp-vue-sa.firebaseapp.com",
    projectId: "quizzapp-vue-sa",
    storageBucket: "quizzapp-vue-sa.appspot.com",
    messagingSenderId: "788646095739",
    appId: "1:788646095739:web:237ae11629f231ada7ebde"
})
const db = getFirestore(firebaseApp)

export const getQuizz = async (quizzId)=>{
    const snapshot = await getDocs(collection(db, `quizzes/${quizzId}/quizzList`))
    const result = []
    snapshot.forEach(d=>{
        if(d.data())
        result.push(d.data())
    })
    return result
}

export const getQuizzIds = async ()=>{
    const result = []
    const snapshot = await getDocs(collection(db, 'quizzes'))
    snapshot.forEach(d=>result.push(d.id))
    return result
}