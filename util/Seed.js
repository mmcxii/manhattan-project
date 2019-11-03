const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const Types = mongoose.SchemaTypes;
const Schema = mongoose.Schema;

// //import path from 'path';
const app = express();
//port

const PORT = process.env.PORT || 6969;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manhattenDB';
console.log(process.env.MONGODB_URI);
const BEER_KEY = process.env.BEER_KEY;
console.log(process.env.TEST);
const COCKTAIL_KEY = process.env.COCKTAIL_KEY;
mongoose.connect(DB_URI, {
  useNewUrlParser: true
});

const ingredientsSchema = new Schema({
  name: Types.String,
  measurement: Types.String
});

const productDetailsSchema = new Schema({
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

const product = mongoose.model('Product', productSchema);

//hits brewery API and stores data in beersArray
const brewerydb = async () => {
  const beersMap = new Map();

  for (let i = 0; i < 24; i++) {
    try {
      const response = await axios.get(`https://sandbox-api.brewerydb.com/v2/beers/?key=${BEER_KEY}&p=${i}`);
      const data = response.data.data;

      for (const i in data) {
        //check if data exists
        if (data === undefined) {
          continue;
        }

        // Verify valid ID
        const beerId = data[i].id;
        if (!beerId || beersMap.has(beerId)) {
          continue;
        }

        //check and set image, if no image set to an empty img src
        const imageLink = data[i].labels;
        let image;
        if (imageLink === undefined) {
          image = '//:0';
        } else {
          image = imageLink.contentAwareLarge;
        }
        //check to see if desc exists, sets default
        const descValue = data[i].description;
        let desc;
        if (descValue === undefined) {
          desc = 'No description';
        } else {
          desc = descValue;
        }

        //checks if there is a subtype, if not set to N/A
        const subName = data[i].style;
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

        //create object array

        const newBeer = {
          extID: beerId,
          type: 'BEER',
          name: data[i].name,
          imgUrl: image,
          details: {
            desc: desc,
            ABV: data[i].abv,
            subType: beerType,
            organic: organic
          }
        };

        // Verify required fields set
        if (!newBeer.extID || !newBeer.name) {
          continue;
        }

        beersMap.set(beerId, newBeer);
      }
    } catch (error) {
      console.log('BEER map error:', error);
    }
  }

  return [...beersMap.values()];
};

//awaits cocktailID and searches for all cocktails by IDs in array
const cocktaildb = async drinkIds => {
  const cocktailMap = new Map();

  for (let i = 0; i < drinkIds.length; i++) {
    const drinkId = drinkIds[i];

    // Verify valid cocktail id
    if (!drinkId || cocktailMap.has(drinkId)) {
      continue;
    }

    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drinkId}`);

      const data = response.data.drinks;
      const ingredients = [];

      //set up ingredient objects
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

      for (const j in ingredientNum) {
        if (ingredientNum[j] != null || ingredientNum[j] === '') {
          ingredients.push({
            name: ingredientNum[j],
            measurement: ingredientMeasure[j]
          });
        }
      }

      //set up for cocktail object

      const newCocktail = {
        extID: drinkId,
        type: 'MIXED',
        name: data[0].strDrink,
        imgUrl: data[0].strDrinkThumb,
        details: {
          ingredients: ingredients,
          directions: data[0].strInstructions,
          glassType: data[0].strGlass
        }
      };

      // Make sure required fields are set
      if (!newCocktail.extID || !newCocktail.name) {
        continue;
      }

      cocktailMap.set(drinkId, newCocktail);
    } catch (error) {
      console.log('COCKTAIL map error:', error);
    }
  }

  return [...cocktailMap.values()];
};

//gets all cocktails in db and stores their id in cocktailID
const cocktaildbId = async () => {
  let cocktails = [];
  try {
    const drinkTypesUri = `https://www.thecocktaildb.com/api/json/v2/${COCKTAIL_KEY}/filter.php?a=Alcoholic`;
    const response = await axios.get(drinkTypesUri);

    const drinkData = response.data.drinks;

    const cocktailIDs = drinkData.map(drink => drink.idDrink);

    cocktails = await cocktaildb(cocktailIDs);
  } catch (error) {
    console.log(error);
  }

  return cocktails;
};

//awaits the api call and then pushes data into db
const dumpMixed = async () => {
  console.log('Begin dumping cocktail data...');
  let cocktails = [];
  try {
    cocktails = await cocktaildbId();
    if (cocktails.length === 0) {
      return;
    }
  } catch (error) {
    console.log('COCKTAIL DUMP ERROR:', error);
    throw error;
  }

  console.log(`${cocktails.length} cocktails found. Saving to DB...`);

  return await product.create(cocktails);
};

//awaits the api call and then pushes data into db
const dumpBeer = async () => {
  console.log('Begin dumping beer data...');
  let beers = [];
  try {
    beers = await brewerydb();
    if (beers.length === 0) {
      return;
    }
  } catch (error) {
    console.log('BEER DUMP ERROR:', error);
    throw error;
  }

  console.log(`${beers.length} beers found. Saving to DB...`);

  return await product.create(beers);
};

// Dump & delete helper functions
const dumpData = async (res, dumpFunc, type) => {
  try {
    await dumpFunc();
  } catch (error) {
    res.status(500).json(error);
  }

  res.status(201).send(`${type} data dump complete.`);
};

const deleteData = async (res, type) => {
  let deleteCount = 0;
  try {
    console.log(`Begin delete ${type} product data...`);

    const docType = type === 'ALL' ? {} : { type: type };
    const response = await product.deleteMany(docType);
    if (!response.ok) {
      throw response;
    }

    deleteCount = response.deletedCount || 0;
    console.log(`Deleted ${deleteCount} product(s).`);
  } catch (error) {
    console.log(`${type} delete error: ${error}`);
    return res.status(500).send(error);
  }

  return res.status(200).send(`Deleted ${deleteCount} product(s).`);
};

//routes
app.post('/seed', (req, res) => {
  // Seed all data
  console.log('Begin dumping all data...');

  const beerDump = dumpBeer();
  const mixedDump = dumpMixed();

  Promise.all(beerDump, mixedDump)
    .then(() => {
      console.log('All data dump complete.');
      return res.status(201).send('Data dump complete.');
    })
    .catch(err => {
      console.log('Error seeding all data: ', err.message || err);
      return res.status(500).send(error);
    });
});

app.post('/seed/beer', async function(req, res) {
  return dumpData(res, dumpBeer, 'Beer');
});

app.post('/seed/cocktail', async function(req, res) {
  return dumpData(res, dumpMixed, 'Cocktail');
});

app.delete('/deleteall', async (req, res) => {
  return deleteData(res, 'ALL');
});

app.delete('/deleteall/mixed', async (req, res) => {
  return deleteData(res, 'MIXED');
});

app.delete('/deleteall/beer', async (req, res) => {
  return deleteData(res, 'BEER');
});

app.listen(PORT, function() {
  console.log('Seed server listening on port ' + PORT);
});
