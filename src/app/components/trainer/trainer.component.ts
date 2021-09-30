import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import TrainerService from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  private _collectedPokemons: Pokemon[] = []

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this._collectedPokemons = this.trainerService.getCollectedPokemons()
  }

  get collectedPokemons(): Pokemon[] {
    this._collectedPokemons = this.trainerService.getCollectedPokemons()
    return this._collectedPokemons
  }

}
