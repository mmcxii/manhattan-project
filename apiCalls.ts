import axios, { AxiosResponse } from 'axios';

const api: any = {
  brewerydb: async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://sandbox-api.brewerydb.com/v2/beers/?key=e443f3404d9312e3735f78180d54b782`
      );
      const data: any[] = response.data.data;
      const beersArray: any[] = [];

      for (let i in data) {
        beersArray.push({
          extID: data[i].id,
          type: 'Beer',
          name: data[i].name,
          desc: data[i].description,
          ABV: data[i].abv
        });
      }
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  cocktaildb: async (query: String) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data: any[] = response.data.drinks;
      const cocktailArray: any[] = [];

      for (let i in data) {
        cocktailArray.push({
          extID: data[i].idDrink,
          type: 'cocktail',
          name: data[i].strDrink
        });
      }
      console.log(cocktailArray);
    } catch (error) {
      console.log(error);
    }
  }
};

export default api;
//brewerydb
//cocktaildb
//quiniwine
