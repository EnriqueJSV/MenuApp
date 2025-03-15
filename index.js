require('dotenv').config()
const express = require('express');
const cors = require('cors');
const Plan = require("./models/plan")
const app = express();

let plan = [
    {
      day: "Domingo",
      comida: "",
      encargado: ""
    },
    {
      day: "Lunes",
      comida: "",
      encargado: ""
    },
    {
      day: "Martes",
      comida: "",
      encargado: ""
    },
    {
      day: "Miercoles",
      comida: "",
      encargado: ""
    },
    {
      day: "Jueves",
      comid: "",
      encargado: ""
    },
    {
      day: "Viernes",
      comida: "",
      encargado: ""
    },
    {
      day: "Sabado",
      comida: "",
      encargado: ""
    }
]

app.use(cors())
app.use(express.static("dist"))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/plan', (request, response) => {
    Plan.find({})
    .then(plan => {
        response.json(plan)
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({error: "Internal Server Error"})  
    })
})

app.get('/api/plan/:id', (request, response) => {
    Plan.findById(request.params.id)
      .then(plan => {
        if (plan){
          response.json(plan)
        } else {
          response.status(404).end({error: "Plan not found"})
        }
      })
      .catch(error => {
        console.log(error)
        response.status(500).json({error: "Internal Server Error"})
      })
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})