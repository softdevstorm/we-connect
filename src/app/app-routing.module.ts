import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";

const routes: Routes = [
    { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignUpModule' },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
