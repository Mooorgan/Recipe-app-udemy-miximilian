import { Injectable } from '@angular/core';
import {
  // Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
// import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions // private dataStorageService: DataStorageService // private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // return this.dataStorageService.fetchRecipes();
    return this.store.select('recipes', 'recipes').pipe(
      take(1),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
