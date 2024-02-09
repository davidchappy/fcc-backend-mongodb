require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema)

const createAndSavePerson = done => {
  const personDocument = new Person({
    name: "David",
    age: 40,
    favoriteFoods: ["pizza", "burger"]
  })
  personDocument.save(done)
}

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, done)
}

// createManyPeople(
//   [
//     {
//       name: "David",
//       age: 40,
//       favoriteFoods: ["pizza", "burger"]
//     },
//     {
//       name: "Mary",
//       age: 30,
//       favoriteFoods: ["sushi", "burrito"]
//     },
//     {
//       name: "John",
//       age: 20,
//       favoriteFoods: ["burrito", "sushi"]
//     }
//   ],
//   (err, data) => {
//     if (err) {
//       // console.error(err)
//     } else {
//       // console.log(data)
//     }
//   }
// )

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, done)
}

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, done)
}

const findPersonById = (personId, done) => {
  Person.findById(personId, done)
}

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger"

  const doc = await Person.findById(personId).catch(err => done(err))
  doc.favoriteFoods.push(foodToAdd)
  await doc.save().catch(err => done(err))

  done(null, doc)
}

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20

  const doc = await Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  ).catch(err => done(err))

  done(null, doc)
}

const removeById = async (personId, done) => {
  const removed = await Person.findByIdAndRemove(personId).catch(err =>
    done(err)
  )

  done(null, removed)
}

const removeManyPeople = async done => {
  const nameToRemove = "Mary"

  const removed = await Person.remove({ name: nameToRemove }).catch(err =>
    done(err)
  )

  done(null, removed)
}

const queryChain = async done => {
  const foodToSearch = "burrito"

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select(["name", "favoriteFoods"])
    .exec(done)
}

queryChain((err, data) => console.log(err, data))

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain
