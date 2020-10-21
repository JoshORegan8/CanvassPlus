import { Component, OnInit } from '@angular/core';
import { AuthService } from '../routes/auth/auth.service';
import { Router } from '@angular/router';
import { SnackService } from '../shared/snack.service';
import { BreakpointObserverService } from '../shared/breakpoint-observer.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from '../shared/location.service';
import { FirebaseService } from '../shared/firebase.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private _bottomSheet: MatBottomSheet,
        private authService: AuthService,
        private router: Router,
        private snackService: SnackService,
        private breakpointObserverService: BreakpointObserverService,
        private dialog: MatDialog
    ) { }

    user: firebase.User;
    isMobile: boolean;

    onAddResidence(): void {
        this._bottomSheet.open(AddResidenceSheet);
    }

    onLogout(): void {
        const dialogRef = this.dialog.open(LogoutConfirmDialogModel, {
			width: '250px',
			height: '120px'
		});

		dialogRef.afterClosed()
		.subscribe(result => {
			if (result === true) {
                this.authService.logout();
                this.snackService.open('Till next time');
                this.router.navigate(['/auth']);
			}
		});
    }

    ngOnInit() {
        // subscribe to authentication state
        this.authService.state()
        .subscribe(
            user => {
                this.user = user;
                this.authService.user = this.user;
            }
        );

        // subscribe to breakpoint observer to detect mobile mode
        this.breakpointObserverService.isMobile()
        .subscribe(
            res => {
                this.isMobile = res.matches;
            }
        );
    }

}

@Component({
	selector: 'confirm-dialog-model',
	templateUrl: '../shared/confirm-dialog.html',
})
export class LogoutConfirmDialogModel {

	constructor(public dialogRef: MatDialogRef<HeaderComponent>) { }

	onYes() {
		this.dialogRef.close(true);
	}

	onNo() {
		this.dialogRef.close(false);
	}

	onClose() {
		this.dialogRef.close(null);
	}
}

@Component({
    selector: 'add-residence-sheet',
    templateUrl: 'add-residence-sheet.html',
    styleUrls: ['add-residence-sheet.scss']
})
export class AddResidenceSheet implements OnInit {
    
    constructor(
        private _bottomSheetRef: MatBottomSheetRef<AddResidenceSheet>,
        private locationService: LocationService,
        private firebaseService: FirebaseService,
        private snackService: SnackService
    ) {}

    addResidenceForm: FormGroup;
    loading: boolean = true;

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    onSubmit(): void {
        this.firebaseService.addResidence(this.addResidenceForm.value);

        setTimeout(() => {
            this.snackService.open('New residence added');
        }, 500);

        this._bottomSheetRef.dismiss();
    }

    ngOnInit() {
        this.addResidenceForm = new FormGroup({
            status: new FormControl(null, Validators.required),
			address: new FormControl(null, Validators.required),
			contact: new FormControl(null)
        });

        // get current location if supported by browser
        if (navigator.geolocation) {
            navigator.geolocation
            .getCurrentPosition(
                (position: Position) => {
                    this.locationService.reverseGeocode(position['coords']['latitude'], position['coords']['longitude'])
                    .subscribe(
                        res => {
                            this.loading = false;
                            this.addResidenceForm.get('address').setValue(res['results'][0]['formatted_address']);
                        }
                    );
                },
                (error: PositionError) => {
                    this.loading = false;
                    console.log(error);
                }
            );

        } else {
            this.loading = false;
            console.log('Geolocation is not supported by this browser.');
        }
    }
}
