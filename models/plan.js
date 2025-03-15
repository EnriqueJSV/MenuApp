const mongoose = require('mongoose');

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)
//const url = `mongodb+srv://Admindb:${password}@cluster0.fuavv.mongodb.net/menuApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const planSchema = new mongoose.Schema({
    day: String,
    comida: String,
    encargado: String
})

planSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        if (returnedObject._id){
            returnedObject.id = returnedObject._id.toString()
        }
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Plan', planSchema)