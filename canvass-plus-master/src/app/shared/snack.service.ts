import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackService {

    constructor(private snackBar: MatSnackBar) { }

	open(message: string, time: number = 5000, action: string = null) {
        this.snackBar.open(message, action, {
            duration: time
        });
        
	}
}
