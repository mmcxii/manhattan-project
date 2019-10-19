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
          type: 'BEER',
          name: data[i].name,
          desc: data[i].description,
          ABV: data[i].abv,
          image: data[i].labels
        });
      }
      console.log(response);
      return await beersArray;
    } catch (error) {
      console.log(error);
    }
  },
  cocktaildb: async (query: String) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic`
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
      console.log(response.data.drinks.length);
    } catch (error) {
      console.log(error);
    }
  }
};

export default api;
//brewerydb
//cocktaildb
//quiniwine
