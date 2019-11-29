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
            console.log(document, "WE GOT HERE");
          })
      })
      .catch(err => {
        console.error('Error connecting to mongo', err);
      });
  });
Recolher



Untitled 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
  title: {
    type: String
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    default: 'Easy Peasy'
  },
  ingredients: {
    type: Array
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
    default: 'Breakfast'
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;x