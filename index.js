const mongoose = require('mongoose');
// Import Recipe model
const Recipe = require('./models/Recipe');
// Import data
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipeApp';


// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.create({
        title: "mongolianrice",
        level: "UltraPro Chef",
        ingredients: ["rice", "deer", "wax"],
        cuisine: "mongolian",
        dishType: "Dish",
        image: "https://www.superpages.com/em/wp-content/uploads/2014/07/mongolian-restaurants-a-healthy-choice-for-dining-out.jpg",
        duration: 300,
        creator: "LissyNSim"
      })
      .then((recipe) => {
        console.log(recipe.title);
        return Recipe.insertMany(data)
          .then((document) => {
            console.log(document, "Data is inserted!");
            return Recipe.updateOne({title: "Rigatoni alla Genovese" },{duration:100})
          })
          .then((update)=>{
            console.log('I have successfully updated a duration through compass.')
            return Recipe.deleteOne({title: "Carrot Cake"})
          })
          .then(() =>{
            console.log('Gone!')
          })
        .catch(err => {
          console.error('Error connecting to mongo', err);
        });
        })
        .connection.close();
      });
