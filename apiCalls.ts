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
      return await beersArray;
    } catch (error) {
      console.log(error);
    }
  },
  cocktaildb: async () => {
    const alphabet: String[] = ['a', 'b', 'c'];
    for (let i in alphabet) {
      let query: String = alphabet[i];
      try {
        const response: AxiosResponse<any> = await axios.get(
          `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=${query}`
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
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default api;
//brewerydb
//cocktaildb
//quiniwine
