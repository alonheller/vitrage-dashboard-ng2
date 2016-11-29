import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { VitrageApiModule } from './vitrage-api/vitrage-api.module';
import { VitrageTopologyModule } from './vitrage-topology/vitrage-topology.module';

import { LoginService } from './auth/login-service/login.service';
import { DataService } from './vitrage-api/topology/data.service'

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    VitrageApiModule,
    VitrageTopologyModule
  ],
  providers: [LoginService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
