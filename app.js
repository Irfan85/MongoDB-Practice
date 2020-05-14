const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fruit name is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// Mongoose Data Model based on schema. It will automatically create a collection (Table) called "Fruits". (Yes it'll auto plural the model name)
const Fruit = mongoose.model("Fruit", fruitSchema);

// Creating documents (rows) according to the model
const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Great!"
});

// Only inserts apple
// apple.save();


const orange = new Fruit({
    name: "Orange",
    rating: 8,
    review: "Wow!"
});

const banana = new Fruit({
    name: "Banana",
    rating: 6,
    review: "Good"
});

Fruit.insertMany([apple, orange, banana], function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully saved all the fruits.");
    }
});

// Fruit.updateOne({ _id: "5ebb26bb6f79236bd38d8d16" }, { name: "Peach" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Database successfully updated!");
//     }
// });

// Fruit.deleteOne({ _id: "5ebb26b6587e016bc42b86cf"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully deleted!");
//     }
// });

// Fruit.deleteMany({ name: "Apple"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully deleted!");
//     }
// });

// A people schema
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

// Mongoose will create a collection called 'people' automatically
const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Abul",
    age: 27,
    favouriteFruit: orange
});

person.save();

async function getFruits() {
    let fruits = await Fruit.find(function (err) {
        if (err) {
            console.log(err);
        }
    });

    // Closing the connection since we don't need it anymore.
    mongoose.connection.close();

    return fruits;
}

fruits_promise = getFruits().then(fruits => {
    console.log(fruits);
    // Just using the long way for fun. No special purpose here.
    fruits.forEach(function (fruit) {
        console.log(fruit.name);
    });
});

