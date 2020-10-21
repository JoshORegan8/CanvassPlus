import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from './auth.service';
import { SnackService } from 'src/app/shared/snack.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(
        private titleService: Title,
        private authService: AuthService,
        private router: Router,
        private snackService: SnackService
    ) { }

    loginForm: FormGroup;
    registerForm: FormGroup;
    loading: boolean;
    
    // reset form on tab change
	onTabChange(event: EventEmitter<MatTabChangeEvent>) {
		if (event['index'] === 0) {
			this.loginForm.reset();
			
		} else {
			this.registerForm.reset();
			
		}
    }
    
    onLogin() {
        this.loading = true;

        this.authService.login(this.loginForm.get('loginEmail').value, this.loginForm.get('loginPassword').value)
        .catch(
            error => {
                this.loading = false;

                if (error['code'] !== undefined && error['code'] === 'auth/user-not-found') {
                    this.snackService.open('No account was found with this email address');

                } else if (error['code'] !== undefined && error['code'] === 'auth/wrong-password') {
                    this.snackService.open('Your password is incorrect');

                }
            }
        )
        .then(
            userCredential => {
                if (userCredential !== undefined) {
                    this.loading = false;
                    
                    this.snackService.open('Welcome back');
                    this.router.navigate(['/']);
                }
            }
        );
    }

    onRegister() {
        this.loading = true;

        this.authService.register(this.registerForm.get('registerName').value, this.registerForm.get('registerEmail').value, this.registerForm.get('registerPassword').value)
        .catch(
            error => {
                this.loading = false;

                if (error['code'] !== undefined && error['code'] === 'auth/weak-password') {
                    this.snackService.open('You\'re password should at least 6 characters');

                } else if (error['code'] !== undefined && error['code'] === 'auth/email-already-in-use') {
                    this.snackService.open('An account already exists with this email address');

                }
            }
        )
        .then(
            userCredential => {
                if(userCredential !== undefined){
                    this.loading = false;

                    this.snackService.open('Welcome aboard');
                    this.router.navigate(['/']);
                }
            }
        );
    }

    ngOnInit() {
        // set page title
        this.titleService.setTitle('Login / Register | Canvass+');
        
        // login form
        this.loginForm = new FormGroup({
			loginEmail: new FormControl(null, [Validators.required, Validators.email]),
			loginPassword: new FormControl(null, Validators.required)
		});

        // register form
		this.registerForm = new FormGroup({
			registerName: new FormControl(null, Validators.required),
			registerEmail: new FormControl(null, [Validators.required, Validators.email]),
			registerPassword: new FormControl(null, Validators.required)
		});
    }

}
