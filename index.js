const express = require('express')
const bcrypt = require('bcrypt')
const { initializeApp } = require('firebase/app')
const cors = require('cors')
const { getFirestore, setDoc, getDoc, collection, doc, getDocs, deleteDoc } = require('firebase/firestore')
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

  const corsOptions = {
    "origin": "*",
    "optionSuccessStatus": 200
  }

  app.use(express.json())
  app.use(cors(corsOptions))

  //Rutas para las peticiones EndPoint | API
  //Ruta para el registro
  app.post('/registro', (req, res) => {
    const { name, lastname, email, password, number } = req.body

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
    const users = collection(db, 'users')
    //Verificar que el correo no exista en la coleccion
    getDoc(doc(users, email)).then( user => {
      if (user.exists()) {
        res.json({
          'alert': 'el correo ya existe en la BD'
        })
        
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash

            //Guardar en la BD 
            setDoc(doc(users, email), req.body).then(() => {
              
              res.json({
                'alert': 'success',
                 data
              })
            })
          })
        })
      }
    })
  }
})
        
  app.get('/usuarios', async (req, res) => {
    const colRef  = collection(db, users)
    const docsSnap = await getDocs(colRef)
    let data = []
    docsSnap.forEach(doc => {
      data.push(doc.data())
    })
    res.json({
      'alert': 'success',
      data
    })
  })       

  app.post('/login', (req, res) => {
      let { email, password } = req.body

      if(!email.length || !password.length) {
        return res.json({
          'alert': 'no se han resicibdo los datos correctamente'
        })
      }
      
      const users = collection(db, 'users')
      getDoc(doc(users, email)).then( user =>{
        if (!user.exists()){
          return res.json({
            'alerta': 'Correo no registrado en la base de datos'
          })
        } else {
          bcrypt.compare(password, user.data().password, (error, result) => {
            if (result) {
              let data = user.data()
              res.json({
                'alert': 'Success',
                name: data.name,
                email: data.email
              })
            } else {
              return res.json({
                'alert': 'Password incorrecto'
              })
            }
          })
        }
      })
  })

  //Ruta borrar
  app.post('/delete', (req, res) => {
    let { id } = req.body

    deleteDoc(doc(collection(db, 'users'), id))
    .then((response) => {
      res.json({
        'alert': 'success'
      })
    })
    .catch((error) => {
      res.json({
        'alert': error
      })
    })
  })

  app.post('/update', (req, res) => {
    const { email, name, lastname, number } = req.body

    //Validacion de los datos 
    if(name.length < 3) {
      res.json({
        'alert': 'nombre requiere minimo 3 caracters'
      })
    } else if(lastname.length < 3) {
      res.json({
        'alert': 'nombre requiere minimo 3 caracters'
      })

    } else if (!Number(number) || number.length < 10) {
      res.json({
        'alert': 'Introduce un numero telefonico correcto'
      })
    }  else { 
      db.collection('users').doc(email)
      const updateData = {
        name, 
        lastname,
        number
      }
      updateDoc(doc(collection(db, 'users'), updateData, email))
      .then((response) => {
        res.json({
          'alert': 'success'
        })
      })
      .catch(() => {
        res.json({
          'alert': error
        })
      })
    }
  })



  const PORT = process.env.PORT || 19000

  //Ejecutamos el servidor
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto: ${PORT}`)
  })
