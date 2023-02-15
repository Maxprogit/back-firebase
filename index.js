const express = require ('express')
const bcrypt = require ('bcrypt')
const { initializeApp } = require ('firebase/app')
const { getFirestore, setDoc, getDoc, collection } = require ('firebase/firestore')
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

  app.use(express.json())

  //Rutas para las peticiones EndPoint | API
  //Ruta para el registro
  app.post('/registro', (req, res) =>{
    const { name, lastname, email, password, number} = req.body

    //Validacion de los datos 
    if(name.length < 3) {
      res.json({
        'alert': 'nombre requiere minimo 3 caracters'
      })
    } else if (!email.length){
      res.json({
        'alert': 'Debes escribir un correo electronico'
      })
    }else if (password.length) {
      res.json({
        'alert': 'nombre requiere minimo 8 caracteres'
      })
    } else if (!Number(number) || number.length < 10) {
      res.json( {
        'alert': 'Introduce un numero telefonico correcto'
      })
    } else if (lastname.length) {
      res.json({
        'alert': ''
    })
         //Verificar que el correo no exista en la coleccion
         getDoc(doc(user, email)).then((user => {
          if (user.exists()) {

          }
         })
      
    }
    })
    //Guardar en la BD 
    getDoc(doc(user, email), req.body).then(() => {
      res.json({
        
      
    )
    
  app.get('/usuarios', (req, res) => {
    const users = collection(db 'users')
    console.log('usuarios', users)
    res.json({
      'alert': 'success',
      data
    })
  })


  const PORT = process.env.PORT || 19000

  //Ejecutamos el servidor
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto:  ${PORT}`)
  })