import axios from 'axios';

const api: any = {
  brewerydb: async (query: String) => {
    try {
      const response = await axios.get(
        `https://sandbox-api.brewerydb.com/v2/beers/?key=e443f3404d9312e3735f78180d54b782`
      );
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  },

  cocktaildb: async (query: String) => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      console.log(response.data.drinks);
    } catch (error) {
      console.log(error);
    }
  },

  quiniwine: async () => {
    try {
      const response = await axios.get(
        `https://quiniwine.com/winesearch?searchbox=merlot`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default api;
//brewerydb
//cocktaildb
//quiniwine
