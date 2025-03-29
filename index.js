require('dotenv').config()
const express = require('express');
const cors = require('cors');
const Plan = require("./models/plan")
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
//Get all
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

//Get by id
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

//Update by id
app.put('/api/plan/:id', (request, response, next) => {
  const body = request.body

  const plan = {
    comida: body.comida,
    encargado: body.encargado
  }  

  Plan.findByIdAndUpdate(request.params.id, plan, {new: true})
  .then(updatedPlan => {
    response.json(updatedPlan)
  })
  .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})