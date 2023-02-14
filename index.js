const express = require ('express')
const bcrypt = require ('bcrypt')
const { initializeApp } = require ('firebase/app')
const { getFirestore } = require ('firebase/firestore')
const dotEnv = require('dotenv')    

//Configuracion de firebase
const firebaseConfig = {
    apiKey: "AIzaSyBbG0eV2a39I2I_iIuyW12veUz2JnIftfs",
    authDomain: "back-firebase-a381f.firebaseapp.com",
    projectId: "back-firebase-a381f",
    storageBucket: "back-firebase-a381f.appspot.com",
    messagingSenderId: "647683381597",
    appId: "1:647683381597:web:be1662a3695ded826db0b4"
  };

  //Inicializar BD de firebase
  const firebase = initializeApp(firebaseConfig)
  const db = getFirestore()


  //Inicializar el servidor
  const app = express()

  const PORT = process.env.PORT || 19000

  //Ejecutamos el servidor
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto:  ${PORT}`)
  })