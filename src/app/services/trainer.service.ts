import { HttpClient, HttpHeaders } from "@angular/common/http";
import { unescapeIdentifier } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pokemon } from "../models/pokemon.model";
import { User } from "../models/user.models";
import { SessionService } from "./session.service";

const apiURL = 'https://noroff-assignment-api-lit.herokuapp.com'
const apiKey = "ByvuHqRoCVXC9G9Z06xa3ec9rDXYgZyJZRDXJ9k3arjVxy2AuUXX6c34Z2dgnlx2";

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  // Holds all collected pokemons by user
  private _collectedPokemons: Pokemon[] = []
  // Users name
  private _name: string = "";
  // Is pokemon data loading
  public loadingPokemons: boolean = false;

  constructor(
    private readonly http: HttpClient, 
    private readonly sessionService: SessionService
    ){
      // Checks first if local storage have user data and if does
      // adds already collected pokemons to collected pokemons array
      if(this.sessionService.user !== undefined)
        this._collectedPokemons = this.sessionService.user.pokemon
    }


  // Updates users pokemons in API
  private updateAPIPokemons(pokemons: Pokemon[], userid: number): Observable<User> {
    const headers = new HttpHeaders({
      'x-api-key': apiKey
      })
      return this.http.patch<User>(`${apiURL}/trainers/${userid}`,
       { pokemon: pokemons }, { headers })
  }

  // Helper function that calls pokemon updating. After updating API,
  // function updates user stored in session storage with returned user 
  // from API patch call
  private async handlePatch() {
    return await this.updateAPIPokemons(this._collectedPokemons, this.sessionService.user!.id)
      .subscribe(user => {
        this.sessionService.setUser(user)
      })
  }

  // Function is called when user catches pokemon. Catched pokemon is added
  // to the collected pokemons array locally and helper function is called to
  // also update the API 
  public async addCollectedPokemon(pokemon: Pokemon) {
    this._collectedPokemons.push(pokemon)
    await this.handlePatch()
  }

  // Set private variable users name 
  public setName(name: string) {
    this._name = name
  }

  // Get private variable users name
  public getName(): string {
    return this._name
  }
  
  // Fuction is called when pokemon is deleted in trainer page. Function 
  // removes pokemon from local collected pokemons array and then calls
  // helper function to update API with this new updated array
  public removeCollectedPokemon(id: number) {
    this._collectedPokemons = this._collectedPokemons.filter(pokemon => {
      return pokemon.id !== id
    })
    this.handlePatch()
  }

  // Returns all collected pokemons
  public getCollectedPokemons(): Pokemon[] {
    return this._collectedPokemons
  }

};
export default TrainerService


