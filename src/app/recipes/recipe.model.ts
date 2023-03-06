import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  // constructor(
  //   private _name: string,
  //   private _description: string,
  //   private _imagePath: string
  // ) {}

  // get name(): string {
  //   return this._name;
  // }
  // get description(): string {
  //   return this._description;
  // }
  // get imagePath(): string {
  //   return this._imagePath;
  // }
  constructor(
    readonly name: string,
    readonly description: string,
    readonly imagePath: string,
    readonly ingredients: Ingredient[]
  ) {}
}
