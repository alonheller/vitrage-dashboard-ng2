import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-ng2/main';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { VitrageApiModule } from './vitrage-api/vitrage-api.module';
import { VitrageTopologyModule } from './vitrage-topology/vitrage-topology.module';

import { LoginService } from './auth/login-service/login.service';
import { DataService } from './vitrage-api/topology/data.service'

import { LoginComponent } from './auth/login/login.component';
import { VitrageTopologyComponent } from './vitrage-topology/vitrage-topology.component';
import { AuthGuard } from './_guards/auth-guard.guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'topology', component: VitrageTopologyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
    AuthModule,
    VitrageApiModule,
    VitrageTopologyModule
  ],
  providers: [LoginService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
