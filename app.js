const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'alumno',
    password: 'alumnoipm',
    database: 'jugadores' 
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Bienvenido a la página. ');
});


app.get('/formulario', (req, res) => {
    res.sendFile(__dirname + 'formulario.html');
});



app.post('/insertar', (req, res) => {
    const { nombre, equipo, pais } = req.body;
    const sql = 'INSERT INTO jugador (nombre, equipo, pais) VALUES (?, ?, ?)';
    const values = [nombre, equipo, pais];

    connection.query(sql, values, (error, result) => {
        if (error) {
            console.error('Error al insertar datos:', error);
            res.sendStatus(500);
            return;
        }

        console.log('Datos insertados correctamente');
        res.sendStatus(200);
    });
});


app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
