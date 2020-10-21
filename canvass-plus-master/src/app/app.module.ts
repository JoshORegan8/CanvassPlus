import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
} from "@angular/material";

import { environment } from 'src/environments/environment';
import { AuthComponent } from './routes/auth/auth.component';
import { HeaderComponent, AddResidenceSheet, LogoutConfirmDialogModel } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpreadsheetComponent, EditResidenceSheet, DeleteConfirmDialogModel } from './routes/spreadsheet/spreadsheet.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HeaderComponent,
        LogoutConfirmDialogModel,
        FooterComponent,
        AddResidenceSheet,
        EditResidenceSheet,
        DeleteConfirmDialogModel,
        SpreadsheetComponent
    ],
    entryComponents: [
        AddResidenceSheet,
        EditResidenceSheet,
        DeleteConfirmDialogModel,
        LogoutConfirmDialogModel
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
		ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatBottomSheetModule,
        MatSelectModule,
        MatToolbarModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
