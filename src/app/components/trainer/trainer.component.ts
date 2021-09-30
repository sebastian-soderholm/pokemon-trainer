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

  ngOnInit(): void {
    this.trainerService.getCollectedPokemons()
  }

  removeCollectedPokemon(id: number): void {
    this.trainerService.removeCollectedPokemon(id)
  }

  get collectedPokemons(): Pokemon[] {
    return this.trainerService.getCollectedPokemons()
  }
  get loggedIn(): boolean {
    return this.sessionService.loggedIn;
  }
  get loggedInUser(): any {
    return this.sessionService.user
  }

}
