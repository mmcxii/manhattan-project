import axios, { AxiosResponse } from 'axios';

const api: any = {
  brewerydb: async () => {
    const beersArray: any[] = [];
    for (let i: number = 0; i < 24; i++) {
      try {
        const response: AxiosResponse<any> = await axios.get(
          `https://sandbox-api.brewerydb.com/v2/beers/?key=e443f3404d9312e3735f78180d54b782&p=${i}`
        );
        const data: any[] = response.data.data;

        for (let i in data) {
          beersArray.push({
            extID: data[i].id,
            type: 'BEER',
            name: data[i].name,
            desc: data[i].description,
            ABV: data[i].abv,
            image: data[i].labels,
            Beertype: data[i].style.shortname
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    return await beersArray;
  },
  cocktaildb: async (query: String) => {
    const cocktailArray: any[] = [];
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?`
      );
      const data: any[] = response.data.drinks;

      for (let i in data) {
        cocktailArray.push({
          extID: data[i].idDrink,
          type: 'cocktail',
          name: data[i].strDrink
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default api;
//brewerydb
//cocktaildb
//quiniwine
