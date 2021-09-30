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
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService,
    private readonly sessionService: SessionService
  ) {}
  ngOnInit(): void {
    this.loadMorePokemons()
  }
  loadMorePokemons(){
    this.pokemonService.fetchPokemons(50, this.pokemonService.getNumOfFetchedPokemons());
  }
  loadPokemonInfo(id: number): void {
    this.pokemonService.fetchPokemonInfo(id)
    console.log(JSON.stringify(this.pokemonService.getPokemon(id)))
  }
  addPokemonToTrainer(id: number): void {
    const pokemonToCatch = this.pokemonService.getPokemon(id)
    this.trainerService.addCollectedPokemon(pokemonToCatch)
    console.log("Caught pokemon: " + JSON.stringify(this.trainerService.getCollectedPokemons()))
  }
  get pokemons(): Pokemon[] {
    const pokemons = this.pokemonService.getPokemons();
    pokemons.sort((a,b) => {
      return a.id - b.id
    })
    return pokemons
  }
  get loggedIn(): boolean {
    return this.sessionService.loggedIn;
  }
  get loggedInUser(): any {
    return this.sessionService.user
  }

}
