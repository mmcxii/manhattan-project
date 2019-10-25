var express = require('express');
var mongoose = require('mongoose');
let axios = require('axios');
require('dotenv').config();

const Types = mongoose.SchemaTypes;
const Schema = mongoose.Schema;

// //import path from 'path';
var app = express();
//port
//process.env.MONGODB_URI ||
var PORT = process.env.PORT || 6969;
var DB_URI = 'mongodb://localhost:27017/manhattenDB';
let BEER_KEY = process.env.BEER_KEY;
let COCKTAIL_KEY = process.env.COCKTAIL_KEY;
mongoose.connect(DB_URI, {
  useNewUrlParser: true
});

var ingredientsSchema = new Schema({
  name: Types.String,
  measurement: Types.String
});

var productDetailsSchema = new Schema({
  subType: Types.String,
  ingredients: [ingredientsSchema],
  directions: Types.String,
  glassType: Types.String,
  ABV: Types.Number,
  desc: Types.String,
  organic: Types.Boolean
});

productSchema = new Schema({
  extID: {
    type: Types.String,
    required: true,
    unique: true
  },
  type: {
    type: Types.String,
    enum: ['BEER', 'WINE', 'MIXED'],
    required: true
  },
  name: {
    type: Types.String,
    required: true,
    text: true
  },
  desc: Types.String,
  imgUrl: Types.String,
  comments: [{ type: Types.ObjectId, ref: 'Comment' }],
  upvotes: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  downvotes: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  details: productDetailsSchema
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
        `https://sandbox-api.brewerydb.com/v2/beers/?key=${BEER_KEY}&p=${i}`
      );
      const data = response.data.data;

      for (let i in data) {
        if (data === undefined) {
          continue;
        }
        let imageLink = data[i].labels;
        let image;
        if (imageLink === undefined) {
          image = '//:0';
        } else {
          image = imageLink.contentAwareLarge;
        }
        let descValue = data[i].description;
        let desc;
        if (descValue === undefined) {
          desc = 'No description';
        } else {
          desc = descValue;
        }
        //checks if there is a subtype, if not set to N/A
        let subName = data[i].style;
        let beerType;
        if (subName === undefined) {
          beerType = 'N/A';
        } else {
          beerType = data[i].style.shortName;
        }
        //changes organic to boolean
        let organic = false;
        if (data[i].isOrganic == 'Y') {
          organic = true;
        }
        beersArray.push({
          extID: data[i].id,
          type: 'BEER',
          name: data[i].name,
          imgUrl: image,
          details: {
            desc: desc,
            ABV: data[i].abv,
            subtype: beerType,
            organic: organic
          }
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
      `https://www.thecocktaildb.com/api/json/v2/${COCKTAIL_KEY}/filter.php?a=Alcoholic`
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
        if (ingredientNum[j] != null || ingredientNum[j] === '') {
          ingredients.push({
            ingredient: ingredientNum[j],
            measurement: ingredientMeasure[j]
          });
        }
      }
      cocktail.push({
        extID: data[0].idDrink,
        type: 'MIXED',
        name: data[0].strDrink,
        imgUrl: data[0].strDrinkThumb,
        details: {
          ingredients: ingredients,
          directions: data[0].strInstructions,
          glassType: data[0].strGlass
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return await cocktail;
};
