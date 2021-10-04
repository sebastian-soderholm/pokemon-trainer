import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SessionService } from 'src/app/services/session.service';
import TrainerService from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService,
    private readonly sessionService: SessionService
  ) {}

  // Initialise collected pokemons
  ngOnInit(): void {
    this.trainerService.getCollectedPokemons()
  }

  // Remove pokemon by id
  removeCollectedPokemon(id: number): void {
    this.trainerService.removeCollectedPokemon(id)
  }

  // return collected pokemons
  get collectedPokemons(): Pokemon[] {
    return this.trainerService.getCollectedPokemons()
  }

  // Return if user is logged in or not
  get loggedIn(): boolean {
    return this.sessionService.loggedIn;
  }

  // Return logged in user
  get loggedInUser(): any {
    return this.sessionService.user
  }

}
