import express from 'express'
import AlumnosRoute from './routes/alumnos.routes.js'


const app = express() // creea el servidor
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('public'))

app.use(AlumnosRoute)


app.listen(2023, function () {
    console.log('Servidor corriendo en el host http://localhost:2023')
})