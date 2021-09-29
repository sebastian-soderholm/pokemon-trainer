import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonInfo } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _apiURL: string = 'https://pokeapi.co/api/v2';
  private _imgApiURL: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private _pokemons: Pokemon[] = [];
  private _error: string = '';
  private _pokemonURLs: string[] = [];

  constructor(private readonly http: HttpClient) {}

  public fetchPokemons(limit: number, offset: number): void {
    if (limit + offset > 898) {
      console.log("Cannot load more pokemons")
      return
    }

    this.http
      .get(`${this._apiURL}/pokemon?limit=${limit}&offset=${offset}`)
      .subscribe(
        (returnObj: any) => {
          //Loop through results to get URLs
          this._pokemonURLs = returnObj.results.map((element: any, index: number) => {
            this._pokemons.push({
              id: index + offset + 1,
              name: element.name,
              infoURL: element.url,
              imageURL: `${this._imgApiURL}${index + offset + 1}.png`,
              info: undefined,
            });
          });
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }
  // public fetchPokemon(pokemonId: number) {
  //   //Fetch each pokemon one by one
  //   this.http.get<Pokemon>(`${this._apiURL}/pokemon/${pokemonId}/`).subscribe(
  //     (pokemonData: any) => {
  //       this._pokemons.push({
  //         id: pokemonData.pokemonId,
  //         name: pokemonData.name,
  //         infoURL: pokemonData.url,
  //         imageURL: `${this._imgApiURL}${pokemonId}.png`,
  //         pokemonInfo: null,
  //       });
  //     },
  //     (error: HttpErrorResponse) => {
  //       this._error = error.message;
  //     }
  //   );
  // }
  public fetchPokemonInfo(pokemonId: number) {
    //Fetch pokemon's info
    this.http.get<Pokemon>(`${this._apiURL}/pokemon/${pokemonId}/`).subscribe(
      (pokemonData: any) => {
        const pokemonIndex = this._pokemons.findIndex(pokemon => pokemon.id === pokemonId);
        this._pokemons[pokemonIndex].info = <PokemonInfo> {
          height: pokemonData.height,
          weight: pokemonData.weight
        }
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }
  public getPokemons(): Pokemon[] {
    return this._pokemons;
  }
  public getPokemon(id: number): Pokemon {
    const pokemonIndex = this._pokemons.findIndex(pokemon => pokemon.id === id);
    return this._pokemons[pokemonIndex]
  }
  public error(): string {
    return this._error;
  }

  // PokemonAPI = {
  //   // GET: user from DB
  //   async getPokemons(limit, offset) {
  //     try {
  //       const result = await fetch(
  //         `${_apiURL}/pokemon?limit=${limit}&offset=${offset}`
  //       ).then((r) => r.json());
  //       return [null, result];
  //     } catch (error) {
  //       return [error.message, null];
  //     }
  //   },
  //   // POST: user to DB
  //   async setNewUser(username) {
  //     const user = { username: username, translations: [] };
  //     const headers = {
  //       headers: {
  //         'X-API-Key': apiKey,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     return await axios
  //       .post(`${_apiURL}/translations?username=${username}`, user, headers)
  //       .then((response) => response.data)
  //       .catch((error) => console.log(error.response));
  //   },

  //   //PATCH: update user translations in DB
  //   async updateTranslations(userId, translationsArray) {
  //     const headers = {
  //       headers: {
  //         'X-API-Key': apiKey,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     return await axios
  //       .patch(`${_apiURL}/translations/${userId}`, translationsArray, headers)
  //       .then((response) => response.data)
  //       .catch((error) => console.log(error.response));
  //   },
  // };
}
