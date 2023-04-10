import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth.component';

// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

// import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: async () => {
      // const m = await import('./recipes/recipes.module');
      // return m.RecipesModule;
      return (await import('./recipes/recipes.module')).RecipesModule;
      //-----------------------------------------------------------------------------------------------
      //--Here Importing RoutingModule DoesNot Work cause RecipesModule declare components,import other modules too and also cause of RouterModule. I don't understand why importing routingModule was working in Maximilian Standalone app
      // return (await import('./recipes/recipes-routing.module')) //Error!!!
      //   .RecipesRoutingModule;
      //---------------------------------------------------------------------------------------------
    },
  },
  {
    path: 'auth',
    loadChildren: async () => {
      return (await import('./auth/auth.module')).AuthModule;
    },
  },
  {
    path: 'shopping-list',
    loadChildren: async () => {
      return (await import('./shopping-list/shopping-list.module'))
        .ShoppingListModule;
    },
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
