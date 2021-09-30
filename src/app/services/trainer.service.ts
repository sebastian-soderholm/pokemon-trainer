import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";



const apiURL = 'https://noroff-assignment-api-lit.herokuapp.com'
const apiKey = "ByvuHqRoCVXC9G9Z06xa3ec9rDXYgZyJZRDXJ9k3arjVxy2AuUXX6c34Z2dgnlx2";

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _collectedPokemons: Pokemon[] = []
  private _name: string = "";

  constructor(private readonly http: HttpClient){}

  public setName(name: string) {
    this._name = name
  }
  public getName(): string {
    return this._name
  }
  public addCollectedPokemon(pokemon: Pokemon) {
    this._collectedPokemons.push(pokemon)
  }
  public removeCollectedPokemon(id: number) {
    this._collectedPokemons = this._collectedPokemons.filter(pokemon => {
      return pokemon.id !== id
    })
  }
  public getCollectedPokemons(): Pokemon[] {
    return this._collectedPokemons
  }

};
export default TrainerService


