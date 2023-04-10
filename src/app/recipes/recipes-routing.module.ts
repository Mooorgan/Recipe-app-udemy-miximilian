import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RecipesResolver } from './recipes.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    //when 'always', resolver run for every child routes
    runGuardsAndResolvers: 'always',
    // runGuardsAndResolvers: 'always',

    resolve: [RecipesResolver],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        // resolve: [RecipesResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        // resolve: [RecipesResolver],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // ReactiveFormsModule,
    // SharedModule,
    // RouterModule,
  ],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
