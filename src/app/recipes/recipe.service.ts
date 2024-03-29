import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
//   {
//   providedIn: 'root',
// }
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Satay',
      'This is Chicken Satay',
      'https://hips.hearstapps.com/hmg-prod/images/190418-chicken-satay-horizontal-300-1556573740.jpg',
      [new Ingredient('flour', 1), new Ingredient('oil', 2)]
    ),
    new Recipe(
      'Chicken BBQ',
      'This is Chicken BBQ',
      'https://www.thespruceeats.com/thmb/LedRCjWTOLTR4uTCMHQVmoPDeG0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bbq-chicken-thighs-recipe-334134-hero-01-d9bdb9a587b04dea9e408ca828993d0b.jpg',
      [new Ingredient('Turmeric', 1), new Ingredient('spice', 2)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
