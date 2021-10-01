export interface Pokemon {
  id: number;
  name: string;
  infoURL: string;
  imageURL: string; //Using obj.sprites.front_default image
  info: PokemonInfo | undefined;
}

export interface PokemonInfo {
  height: number;
  weight: number;
  exp: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;

}
