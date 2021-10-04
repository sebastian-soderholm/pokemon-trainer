import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  private _loadingInfo = false;
  private _loadingPokemons = false;

  constructor(private readonly http: HttpClient, private readonly pokemonSessionStorage: PokemonSessionService) {}

  public fetchPokemons(limit: number, offset: number): void {
    //Check if highest Id to fetch exceeds available highest Id
    if (limit + offset > 898) limit = 898 - offset

    //If more pokemons in SessionStorage than requested, fetch all pokemons from SessionStorage
    if(limit + offset <= this.pokemonSessionStorage.amountOfPokemons()) {
      this._pokemons = this.pokemonSessionStorage.pokemons
    } else {
      this._loadingPokemons = true
      // Else fetch pokemons from API
      this.http
      .get(`${this._apiURL}/pokemon?limit=${limit}&offset=${offset}`)
      .subscribe(
        (returnObj: any) => {
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
          // Updates fetched pokemons to session storage
          this.pokemonSessionStorage.setPokemons(this._pokemons)
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
      this._loadingPokemons = false
    }
  }

  // Function fetches pokemon's information
  public fetchPokemonInfo(pokemonId: number) {
    this._loadingInfo = true;
    this.http.get<Pokemon>(`${this._apiURL}/pokemon/${pokemonId}/`).subscribe(
      (pokemonData: any) => {
        const pokemonIndex = this._pokemons.findIndex(pokemon => pokemon.id === pokemonId);
        this._pokemons[pokemonIndex].info = <PokemonInfo> {
          height: pokemonData.height,
          weight: pokemonData.weight,
          exp: pokemonData.base_experience,
          hp: pokemonData.stats[0].base_stat,
          attack: pokemonData.stats[1].base_stat,
          defense: pokemonData.stats[2].base_stat,
          specialAttack: pokemonData.stats[3].base_stat,
          specialDefense: pokemonData.stats[4].base_stat,
          speed: pokemonData.stats[5].base_stat,
        }
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
    this._loadingInfo = false;
  }

  // Returns pokemons
  public getPokemons(): Pokemon[] {
    return this._pokemons;
  }

  // Return pokemon by id
  public getPokemon(id: number): Pokemon {
    const pokemonIndex = this._pokemons.findIndex(pokemon => pokemon.id === id);
    return this._pokemons[pokemonIndex]
  }

  // Returns number of fetched pokemons
  public getNumOfFetchedPokemons(): number {
    return this._pokemons.length
  }

  // Returns occured error
  public error(): string {
    return this._error;
  }

  // Removes pokemons information
  public removePokemonInfo(id: number) {
    this._pokemons.forEach(pokemon => {
      if(pokemon.id === id) pokemon.info = undefined
    })
  }

  // Returns is pokemons loading
  get loadingPokemons(): boolean {
    return this._loadingPokemons
  }

  // Returns is information loading
  get loadingInfo(): boolean {
    return this._loadingInfo
  }

}
