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
  private _collectedPokemons: Pokemon[] = []
  private _name: string = "";
  public loadingPokemons: boolean = false;

  constructor(
    private readonly http: HttpClient, 
    private readonly sessionService: SessionService
    ){
      if(this.sessionService.user !== undefined)
        this._collectedPokemons = this.sessionService.user.pokemon
    }

  private updateAPIPokemons(pokemons: Pokemon[], userid: number): Observable<User> {
    const headers = new HttpHeaders({
      'x-api-key': apiKey
      })
      return this.http.patch<User>(`${apiURL}/trainers/${userid}`,
       { pokemon: pokemons }, { headers })
  }

  private async handlePatch() {
    return await this.updateAPIPokemons(this._collectedPokemons, this.sessionService.user!.id)
      .subscribe(user => {
        this.sessionService.setUser(user)
      })
  }

  public async addCollectedPokemon(pokemon: Pokemon) {
    this._collectedPokemons.push(pokemon)

    await this.handlePatch()
      
  }

  public setName(name: string) {
    this._name = name
  }
  public getName(): string {
    return this._name
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


