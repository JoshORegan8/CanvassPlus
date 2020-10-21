import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './routes/auth/auth.component';
import { AuthGuard } from './routes/auth/auth.guard';
import { SpreadsheetComponent } from './routes/spreadsheet/spreadsheet.component';

const routes: Routes = [
    {
        path: '',
        component: SpreadsheetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
