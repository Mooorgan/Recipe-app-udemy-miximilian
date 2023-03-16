import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  {
    // path: 'shopping-list',
    path: '',
    component: ShoppingListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    // RouterModule //Does not need to be exported as "shopping-list module" does not use directives like [routerLink] etc. If those were used here in s"hopping-list module" then RouterModule has to be exported from here.
  ],
})
export class ShoppingListRoutingModule {}
