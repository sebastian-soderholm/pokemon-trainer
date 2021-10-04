import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonSessionService {
  private _pokemons: Pokemon[] = [];

  // Load pokemon data from session storage if there is still data
  constructor() {
    const storedPokemons = sessionStorage.getItem('pokemons');
    if (storedPokemons) {
      this._pokemons = JSON.parse(storedPokemons) as Pokemon[];
    }
  }

  // Return stored pokemons
  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  // Updates pokemons and saves them to session storage
  setPokemons(pokemons: Pokemon[]): void {
    this._pokemons = pokemons;
    sessionStorage.setItem('pokemons', JSON.stringify(pokemons));
  }

  // Returns amount of pokemons in _pokemons array
  amountOfPokemons() {
    return this._pokemons.length
  }

  // Returns if _pokemons array is empty
  isEmpty() : boolean {
    return this._pokemons.length === 0
  }

}
