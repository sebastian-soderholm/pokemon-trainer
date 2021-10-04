import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SessionService } from 'src/app/services/session.service';
import TrainerService from 'src/app/services/trainer.service';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  public showMoreInfoPokemonId = 0

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService,
    private readonly sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    // Fetches first pokemons to catalogue page
    this.pokemonService.fetchPokemons(50, 0);
  }

  // Loads more pokemons
  loadMorePokemons(){
    this.pokemonService.fetchPokemons(50, this.pokemonService.getNumOfFetchedPokemons());
  }

  // Loads pokemons information by id
  loadPokemonInfo(id: number) {
    this.pokemonService.fetchPokemonInfo(id)
    this.showMoreInfoPokemonId = id
  }

  // Adds caught pokemon to trainer page
  addPokemonToTrainer(id: number) {
    const pokemonToCatch = this.pokemonService.getPokemon(id)
    this.trainerService.addCollectedPokemon(pokemonToCatch)
  }

  // Returns if pokemons is collected
  pokemonIsCollected(id: number): boolean {
    const collectedPokemons = this.trainerService.getCollectedPokemons()
    //If collected pokemons has one with id, return true
    return collectedPokemons.filter(pokemon => pokemon.id === id).length > 0
  }

  // Hide pokemons infomation
  hideInfo(id: number) {
    this.pokemonService.removePokemonInfo(id)
  }

  // Returns sorted pokemons
  get pokemons(): Pokemon[] {
    const pokemons = this.pokemonService.getPokemons();
    pokemons.sort((a,b) => {
      return a.id - b.id
    })
    return pokemons
  }

  // Returns if user logged in or not
  get loggedIn(): boolean {
    return this.sessionService.loggedIn;
  }

  // Returns logged in user
  get loggedInUser(): any {
    return this.sessionService.user
  }

  // Returns if loading pokemons is still in progress
  get loadingPokemons(): boolean {
    return this.pokemonService.loadingPokemons
  }

  // Returns if loading pokemons information is still in progress
  get loadingInfo(): boolean {
    return this.pokemonService.loadingInfo
  }




}
