import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SpotComponent } from './spot/spot.component';
import { AuthorizationService } from './services/authorization.service';
import { AuthenticaComponent } from './authentica/authentica.component';

const appRoutes: Routes = [
  { path: 'spot', component: SpotComponent },
  { path: 'index', component: AuthenticaComponent},
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SpotComponent,
    AuthenticaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
