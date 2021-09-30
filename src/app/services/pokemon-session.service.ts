import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonSessionService {
  private _pokemons: Pokemon[] = [];

  constructor() {
    const storedPokemons = sessionStorage.getItem('pokemons');
    if (storedPokemons) {
      this._pokemons = JSON.parse(storedPokemons) as Pokemon[];
    }
  }
  get pokemons(): Pokemon[] {
    return this._pokemons;
  }
  setPokemons(pokemons: Pokemon[]): void {
    this._pokemons = pokemons;
    sessionStorage.setItem('pokemons', JSON.stringify(pokemons));
  }
  amountOfPokemons() {
    return this._pokemons.length
  }
  isEmpty() : boolean {
    return this._pokemons.length === 0
  }

}
