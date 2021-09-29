import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import TrianerService from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  // private _collectedPokemons: Pokemon[] = []

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrianerService
  ) {}

  ngOnInit(): void {
    this.trainerService.getCollectedPokemons()
  }

  removeCollectedPokemon(id: number): void {
    // console.log("Before removing " + JSON.stringify(this.trainerService.getCollectedPokemons()))

    this.trainerService.removeCollectedPokemon(id)

    // console.log("After removing " + JSON.stringify(this._collectedPokemons))

  }

  get collectedPokemons(): Pokemon[] {
    return this.trainerService.getCollectedPokemons()
  }

}
