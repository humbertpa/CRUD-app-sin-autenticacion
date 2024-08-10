const express = require('express');
const app = express();
const cors = require('cors');

const axios = require('axios');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.listen(port, () => {
    console.log("listening on http://localhost:3000");
})

app.get('/consultar', (req, res) => {
    console.log("Entro a consultas")
    const url = 'https://66b48b779f9169621ea3709d.mockapi.io/empresas'
    axios.get(url).
        then(response => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
            res.send("Error en la consulta")
        })
});

app.get('/consultar/:id', (req, res) => {
    console.log("Entro a consultas con id")
    const id = req.params.id
    const url = `https://66b48b779f9169621ea3709d.mockapi.io/empresas/${id}`

    axios.get(url).
        then(response => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch(error => {
            console.log(error)
            res.send("Error en la consulta")
        })
});

app.post('/alta', (req, res) => {
    console.log(req.body);
    const url = 'https://66b48b779f9169621ea3709d.mockapi.io/empresas'
    axios.post(url, req.body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data);
            res.send("Alta exitosa");
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Error en la alta");
        });
});

app.put('/editar', (req, res) => {
    console.log(req.body);
    const { id, ...datos } = req.body;
    console.log(id, datos);

    const url = `https://66b48b779f9169621ea3709d.mockapi.io/empresas/${id}`

    axios.put(url, datos, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data);
            res.send('Empresa editada exitosamente');
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Error en la edición");
        });
});

app.delete('/baja/:id', (req, res) => {
    console.log('Se debe eliminar la empresa ', req.params.id)
    const id = req.params.id
    const url = `https://66b48b779f9169621ea3709d.mockapi.io/empresas/${id}`
    console.log(url)
    axios.delete(url).
        then(response => {
            console.log(response.status)
            res.send('Empresa eliminada exitosamente')
        })
        .catch(error =>
            console.log(error)
        )
});

