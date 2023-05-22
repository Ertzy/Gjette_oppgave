const firebaseConfig = {
    apiKey: "AIzaSyCCQ7JGFpCc2LI8X66hZdw7WQoqrqgBEhE",
    authDomain: "fir-oppgave-772ed.firebaseapp.com",
    projectId: "fir-oppgave-772ed",
    storageBucket: "fir-oppgave-772ed.appspot.com",
    messagingSenderId: "865927898864",
    appId: "1:865927898864:web:dd60c0d7642055420f0435"
  };

import {initializeApp} from 'firebase/app'
import {
    query, addDoc, collection, getFirestore, onSnapshot, orderBy
} from 'firebase/firestore'

initializeApp(firebaseConfig)


const db = getFirestore()
const colRef = collection(db, 'påloggging')

// getDocs(colRef)
//     .then((snapshot)=>{
//         let påloggging = []
//         snapshot.docs.forEach((doc) => {
//             påloggging.push({...doc.data(), id: doc.id })
//         })
//         console.log(påloggging)
//     })
let correctAnswer = Math.floor(Math.random()*100);
console.log(correctAnswer)

const form = document.querySelector('#number');
const felt = document.querySelector('#feedback');
const scorefield = document.querySelector('.scorefield')
const navnin = document.querySelector('.navnin')
const name = document.querySelector('#name')
const game = document.querySelectorAll('.game')
const leaderboard = document.querySelector('.leaderboard')
const queri = query(colRef, orderBy('score'))
let interval    
let nameout



form.addEventListener('keydown', e=>{
    if(e.key == 'Enter') {

    if(count == 0){
        counter()
    }

    const tall = form.value * 1
    if(tall === correctAnswer){
        felt.textContent = `${tall} is the correct number!`
        clearInterval(interval)
        sendinfo()
        restart()
    }
    else if(tall > correctAnswer){
        felt.textContent = `${tall} is too high`
        addten()
    }
    else if(tall < correctAnswer){
        felt.textContent = `${tall} is too low`
        addten()
    }
}})

let count = 0;

function counter() {
    interval = setInterval(() => {
        count++
        console.log(count)
        scorefield.textContent = count
    }, 100);
}

function addten() {
    count += 10;
}

navnin.addEventListener('submit', (e)=> {
    e.preventDefault()
    console.log(name.value)
    nameout = name.value
    name.value = ''
    // game.classList.toggle("hidden")
    console.log("game", game)
    game.forEach(element =>{
        element.classList.toggle("hidden")
        console.log(e)

    })
});

function sendinfo(){
    console.log(nameout, count)
    addDoc(colRef, {
        score : count,
        name : nameout
    })
}

function scoreboardout(par1){
    console.log(par1[1])
    const liste = []
    for (let i = 0; i < par1.length && i < 10; i++){
        const sui = document.createElement('li')
        sui.textContent = `${i+1} - ${par1[i].score} ${par1[i].name}`
        sui.classList.add('suilist')
        liste.push(sui)
    }
    leaderboard.replaceChildren(...liste)
}

onSnapshot(queri, (snapshot) => {
    let scores = []
    snapshot.docs.forEach((doc) =>{
        scores.push({...doc.data(), id: doc.id })
    })
    console.log(scores)
    console.log(scores[2])
    scoreboardout(scores)
})

function restart(){
    correctAnswer = Math.floor(Math.random()*100);
    count = 0;
    scorefield.textContent = "Gratulerer du vant!"
    felt.textContent = ""
    game.forEach(element =>{
        element.classList.toggle("hidden")
    })}