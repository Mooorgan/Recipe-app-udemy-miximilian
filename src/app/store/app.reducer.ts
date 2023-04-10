import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromRecipes from '../recipes/store/recipe.reducer';
// import {
//   AddIngredient,
//   ShoppingListActions,
// } from '../shopping-list/store/shopping-list.actions';
// import { AuthActions } from '../auth/store/auth.actions';

export type AppState = {
  shoppingList: fromShoppingList.MyShoppingListState;
  auth: fromAuth.AuthSate;
  recipes: fromRecipes.State;
  router: fromRouter.RouterReducerState;
};

// type Actions = ShoppingListActions | AuthActions;

// export const appReducer: ActionReducerMap<AppState,Actions > = {
export const appReducer: ActionReducerMap<AppState, any> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
  router: fromRouter.routerReducer,
};
