const express = require('express');
const cors = require('cors');
const app = express();

let plan = [
    {
      id: "domingo",
      comida: "",
      encargado: ""
    },
    {
      id: "lunes",
      comida: "",
      encargado: ""
    },
    {
      id: "martes",
      comida: "",
      encargado: ""
    },
    {
      id: "miercoles",
      comida: "",
      encargado: ""
    },
    {
      id: "jueves",
      comid: "",
      encargado: ""
    },
    {
      id: "viernes",
      comida: "",
      encargado: ""
    },
    {
      id: "sabado",
      comida: "",
      encargado: ""
    }
]

app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/plan', (request, response) => {
    response.json(plan)
})

app.get('/api/plan/:id', (request, response) => {
    const id = request.params.id
    const comida = plan.find(comida => comida.id === id)
    if (comida) {
        response.json(comida)
    } else {
        response.status(404).end()
    }
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})