import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  private pokemon: any[] = [];
  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.fetchPokemons(10, 0)
  }
  get pokemons(): Pokemon[] {
    let returnPokemon = this.pokemonService.getPokemons()
    console.log("getPokemons: " + JSON.stringify(returnPokemon));
    return returnPokemon;
  }

}
