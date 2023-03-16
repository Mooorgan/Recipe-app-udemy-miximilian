import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { RecipesComponent } from './recipes/recipes.component';

// import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AppRoutingModule } from './app-routing.module';

// import { AuthComponent } from './auth/auth.component';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { AuthInterceptor } from './auth/auth.interceptor';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
// import { LoggingService } from './logging.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    //These are lazily loaded!!!
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule,
    SharedModule,
  ],
  // providers: [LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
