import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _apiURL: string = "https://pokeapi.co/api/v2";
  private _pokemons: Pokemon[] = [];
  private _error: string = '';

  constructor(private readonly http: HttpClient){}

  public fetchPokemons(limit: number, offset: number): void {
    this.http.get<Pokemon[]>(`${this._apiURL}/pokemon?limit=${limit}&offset=${offset}`)
    .subscribe((returnObj: any) => {
        this._pokemons = returnObj.results
      }, (error: HttpErrorResponse) => {
        this._error = error.message;
      });
  }
  public getPokemons(): Pokemon[] {
    return this._pokemons
  }
  public error(): string {
    return this._error
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
