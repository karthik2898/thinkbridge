import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RecordDialogComponent } from './record-dialog/record-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import {MatSelectModule} from '@angular/material/select';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterUserComponent,
    LoginComponent,
    DashboardComponent,
    SpinnerComponent,
    RecordDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatTableModule,MatCheckboxModule,
    MatToolbarModule, MatButtonModule, MatProgressSpinnerModule,
    MatIconModule, MatCardModule,MatInputModule,MatFormFieldModule,
    FormsModule,ReactiveFormsModule, MatDialogModule,MatSelectModule,
    HttpClientModule, MatPaginatorModule,
    IonicModule.forRoot({})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
