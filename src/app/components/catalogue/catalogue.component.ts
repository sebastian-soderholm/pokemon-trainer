import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonInfo } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  private _pokemon: Pokemon[] = [];
  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.fetchPokemons(15, 7);

    // [1,2,3,4,5,6].forEach((num: number) => {
    //   this.pokemonService.fetchPokemon(num);
    // });
  }
  loadPokemonInfo(id: number): void {
    this.pokemonService.fetchPokemonInfo(id)
    console.log(JSON.stringify(this.pokemonService.getPokemon(id)))
  }
  addPokemonToTrainer(id: number): void {
    const pokemonToCatch = this.pokemonService.getPokemon(id)
    console.log("Catch pokemon: " + JSON.stringify(pokemonToCatch.name))
  }
  get pokemons(): Pokemon[] {
    this._pokemon = this.pokemonService.getPokemons();
    this._pokemon.sort((a,b) => {
      return a.id - b.id
    })
    // console.log(this._pokemon)
    return this._pokemon
  }

}
