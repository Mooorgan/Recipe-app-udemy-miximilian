// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { exhaustMap, map, take, tap } from 'rxjs';
// import { Recipe } from '../recipes/recipe.model';
// import { RecipeService } from '../recipes/recipe.service';
// import * as fromApp from '../store/app.reducer';
// import * as RecipesAction from '../recipes/store/recipe.actions';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataStorageService {
//   constructor(
//     private http: HttpClient,
//     private recipeService: RecipeService,
//     private store: Store<fromApp.AppState>
//   ) {}

//   storeRecipes() {
//     const recipes = this.recipeService.getRecipes();
//     this.http
//       .put(
//         'https://recipe-udemy-max-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
//         recipes
//       )
//       .subscribe((response) => {
//         console.log(response);
//       });
//   }

//   fetchRecipes() {
//     return this.http
//       .get<Recipe[]>(
//         'https://recipe-udemy-max-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
//       )
//       .pipe(
//         map((recipes) => {
//           return recipes.map((recipe) => {
//             return {
//               ...recipe,
//               // ingredients: recipe.ingredients ? recipe.ingredients : [],
//               ingredients: recipe.ingredients || [],
//             };
//           });
//         }),
//         tap((recipes) => {
//           // this.recipeService.setRecipes(recipes);
//           this.store.dispatch(new RecipesAction.SetRecipes(recipes));
//         })
//       );
//   }
// }
