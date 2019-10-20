var express = require('express');
var mongoose = require('mongoose');
let axios = require('axios');
// //import path from 'path';
var app = express();
//port
var PORT = process.env.PORT || 6969;

mongoose.connect('mongodb://localhost:27017/manhattenDB', {
  useNewUrlParser: true
});
let Schema = mongoose.Schema;

let detailSchema = new Schema({
  Desc: String,
  ABV: Number,
  Image: [],
  Subtype: String,
  Organic: Boolean,
  Ingredients: [],
  Directions: String,
  GlassType: String
});

var productSchema = new Schema({
  ExtID: String,
  Type: String,
  Name: String,
  Details: [detailSchema]
});

let product = mongoose.model('Product', productSchema);

app.get('/', function(req, res) {
  res.send('Hello');
});

app.post('/seed/beer', function(req, res) {
  dumpBeer();
});

app.post('/seed/cocktail', function(req, res) {
  dumpMixed();
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});

const dumpMixed = async () => {
  const data = await cocktaildbId();
  product.create(data, function(err, products) {
    if (err) {
      throw err;
    }
  });
};

const dumpBeer = async () => {
  const data = await brewerydb();
  product.create(data, function(err, products) {
    if (err) {
      throw err;
    }
  });
};

const brewerydb = async () => {
  const beersArray = [];

  for (let i = 0; i < 24; i++) {
    try {
      const response = await axios.get(
        `https://sandbox-api.brewerydb.com/v2/beers/?key=e443f3404d9312e3735f78180d54b782&p=${i}`
      );
      const data = response.data.data;

      for (let i in data) {
        let organic = false;
        if (data[i].isOrganic == 'Y') {
          organic = true;
        }
        beersArray.push({
          ExtID: data[i].id,
          Type: 'BEER',
          Name: data[i].name,
          Details: [
            {
              Desc: data[i].description,
              ABV: data[i].abv,
              Image: data[i].labels,
              Subtype: data[i].style.shortName,
              Organic: organic
            }
          ]
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return await beersArray;
};

const cocktaildbId = async () => {
  const cocktailID = [];
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic`
    );
    const data = response.data.drinks;

    for (let i in data) {
      cocktailID.push({
        id: data[i].idDrink
      });
    }
    return await cocktaildb(cocktailID);
  } catch (error) {
    console.log(error);
  }
};

const cocktaildb = async queryArray => {
  const cocktail = [];
  for (let i in queryArray) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${queryArray[i].id}`
      );
      const data = response.data.drinks;
      let ingredients = [];
      const ingredientNum = [
        data[0].strIngredient1,
        data[0].strIngredient2,
        data[0].strIngredient3,
        data[0].strIngredient4,
        data[0].strIngredient5,
        data[0].strIngredient6,
        data[0].strIngredient7,
        data[0].strIngredient8,
        data[0].strIngredient9,
        data[0].strIngredient10,
        data[0].strIngredient11,
        data[0].strIngredient12,
        data[0].strIngredient13,
        data[0].strIngredient14,
        data[0].strIngredient15
      ];
      const ingredientMeasure = [
        data[0].strMeasure1,
        data[0].strMeasure2,
        data[0].strMeasure3,
        data[0].strMeasure4,
        data[0].strMeasure5,
        data[0].strMeasure6,
        data[0].strMeasure7,
        data[0].strMeasure8,
        data[0].strMeasure9,
        data[0].strMeasure10,
        data[0].strMeasure11,
        data[0].strMeasure12,
        data[0].strMeasure13,
        data[0].strMeasure14,
        data[0].strMeasure15
      ];
      for (let j in ingredientNum) {
        if (ingredientNum[j] != null) {
          ingredients.push({
            Ingredient: ingredientNum[j],
            Measurement: ingredientMeasure[j]
          });
        }
      }
      cocktail.push({
        ExtID: data[0].idDrink,
        Type: 'MIXED',
        Name: data[0].strDrink,
        Details: [
          {
            Image: data[0].strDrinkThumb,
            Ingredients: ingredients,
            Directions: data[0].strInstructions,
            GlassType: data[0].strGlass
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  }
  return await cocktail;
};
