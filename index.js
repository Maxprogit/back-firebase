const express = require('express')
const bcrypt = require('bcrypt')
const { initializeApp } = require('firebase/app')
const { getFirestore, setDoc, getDoc, collection, doc, getDocs } = require('firebase/firestore')
require('dotenv/config')    

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

  app.use(express.json())

  //Rutas para las peticiones EndPoint | API
  //Ruta para el registro
  app.post('/registro', (req, res) => {
    const { name, lastname, email, password, number} = req.body

    //Validacion de los datos 
    if(name.length < 3) {
      res.json({
        'alert': 'nombre requiere minimo 3 caracters'
      })
    } else if(lastname.length < 3) {
      res.json({
        'alert': 'nombre requiere minimo 3 caracters'
      })
    } else if (!email.length){
      res.json({
        'alert': 'debes escribir un correo electronico'
      })
    }else if (password.length < 8) {
      res.json({
        'alert': 'contraseña requiere minimo 8 caracteres'
      })
    } else if (!Number(number) || number.length < 10) {
      res.json({
        'alert': 'Introduce un numero telefonico correcto'
      })
    }  else {
    const users = coleccion(db, 'users')
    //Verificar que el correo no exista en la coleccion
    getDoc(doc(users, email)).then( user => {
      if (user.exists()) {
        'alert'; 'el correo ya existe en la BD'
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash

            //Guardar en la BD 
            setDoc(doc(users, email), req.body).then(() => {
              
              res.json({
                'alert': 'succes',
                 data
              })
            })
          })
        })
      }
    })
  }
})
        
  app.get('/usuarios', (req, res) => {
    const users = collection(db, users)
    //let data = 
    res.json({
      'alert': 'succes', 
      users
    })
  })       

  const PORT = process.env.PORT || 19000

  //Ejecutamos el servidor
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto: ${PORT}`)
  })
