import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipe-udemy-max-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          // ingredients: recipe.ingredients ? recipe.ingredients : [],
          ingredients: recipe.ingredients || [],
        };
      });
    }),
    map((recipes) => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes', 'recipes')),
    switchMap(([_actionData, recipes]) => {
      // console.log(_actionData);
      return this.http.put(
        'https://recipe-udemy-max-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
