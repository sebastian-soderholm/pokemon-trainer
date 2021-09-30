import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonInfo } from '../models/pokemon.model';
import { PokemonSessionService } from './pokemon-session.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _apiURL: string = 'https://pokeapi.co/api/v2';
  private _imgApiURL: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private _pokemons: Pokemon[] = [];
  private _error: string = '';

  constructor(private readonly http: HttpClient, private readonly pokemonSessionStorage: PokemonSessionService) {}

  public fetchPokemons(limit: number, offset: number): void {

    //Check if highest Id to fetch exceeds available highest Id
    if (limit + offset > 898) limit = 898 - offset

    //If more pokemons in SessionStorage than requested, fetch all pokemons from SessionStorage
    if(limit + offset <= this.pokemonSessionStorage.amountOfPokemons()) {
      console.log("limit + offset: " +limit + offset)
      console.log("Fetching pokemons from SessionStorage... Amount in storage: " + this.pokemonSessionStorage.amountOfPokemons())
      this._pokemons = this.pokemonSessionStorage.pokemons
    } else {
      console.log("Fetching pokemons from API...")

      this.http
      .get(`${this._apiURL}/pokemon?limit=${limit}&offset=${offset}`)
      .subscribe(
        (returnObj: any) => {
          let fetchedPokemons: Pokemon[] = []
          //Loop through results to get URLs
          returnObj.results.map((element: any, index: number) => {
            this._pokemons.push({
              id: index + offset + 1,
              name: element.name,
              infoURL: element.url,
              imageURL: `${this._imgApiURL}${index + offset + 1}.png`,
              info: undefined,
            });
          });

          this.pokemonSessionStorage.setPokemons(this._pokemons)
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );

    }




  }

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
  public getNumOfFetchedPokemons(): number {
    return this._pokemons.length
  }
  public error(): string {
    return this._error;
  }
}
