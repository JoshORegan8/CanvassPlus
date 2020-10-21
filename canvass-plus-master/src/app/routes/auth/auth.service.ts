import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private af: AngularFireAuth
    ) { }

    user: firebase.User;

    state(): Observable<firebase.User> {
        return this.af.authState;
    }

    login(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.af.auth.signInWithEmailAndPassword(email, password);
    }

    register(name: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.af.auth.createUserWithEmailAndPassword(email, password);
    }

    logout(): Promise<void> {
        return this.af.auth.signOut();        
    }

}
