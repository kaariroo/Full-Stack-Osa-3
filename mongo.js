const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
//const personname = process.argv[3]
//const personnumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.t5tllqb.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length ===3 ) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(
            person.name,
            person.number
          )
        })
        mongoose.connection.close()
      })}

else {
    const note = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

    note.save().then(result => {
        console.log('note saved!')
        console.log(process.argv)
        mongoose.connection.close()
})
}
