import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { Residence } from 'src/app/shared/residence.interface';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SnackService } from 'src/app/shared/snack.service';

@Component({
    selector: 'app-spreadsheet',
    templateUrl: './spreadsheet.component.html',
    styleUrls: ['./spreadsheet.component.scss']
})
export class SpreadsheetComponent implements OnInit {

    constructor(
        private titleService: Title,
        private firebaseService: FirebaseService,
        private _bottomSheet: MatBottomSheet,
        private dialog: MatDialog,
        private snackService: SnackService
    ) { }

    displayedColumns: string[] = ['address', 'contact', 'status', 'actions'];
    dataSource: MatTableDataSource<Residence>;
    residences: Residence[] = [];
    loading: boolean = true;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    filter(input: string) {
        this.dataSource.filter = input.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onEdit(residence: Residence) {
        this._bottomSheet.open(EditResidenceSheet, {
            data: residence
        });
    }

    onDelete(id: string) {
        const dialogRef = this.dialog.open(DeleteConfirmDialogModel, {
			width: '250px',
			height: '120px'
		});

		dialogRef.afterClosed()
		.subscribe(result => {
			if (result === true) {
                this.firebaseService.deleteResidence(id);
                this.snackService.open('Residence deleted');
			}
		});
    }

    ngOnInit() {
        this.titleService.setTitle('Spreadsheet | Canvass+');

        this.firebaseService.getResidences()
        .subscribe(
            res => {
                this.residences = res
                .map(
                    item => {
                        return {
                            id: item.payload.doc.id,
                            ...<Object>item.payload.doc.data()
                        } as Residence;
                    }
                );
                
                this.dataSource = new MatTableDataSource(this.residences);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.loading = false
            }
        );
    }

}

@Component({
	selector: 'confirm-dialog-model',
	templateUrl: '../../shared/confirm-dialog.html',
})
export class DeleteConfirmDialogModel {

	constructor(public dialogRef: MatDialogRef<SpreadsheetComponent>) { }

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
    selector: 'edit-residence-sheet',
    templateUrl: 'edit-residence-sheet.html',
    styleUrls: ['edit-residence-sheet.scss']
})
export class EditResidenceSheet implements OnInit {
    
    constructor(
        private _bottomSheetRef: MatBottomSheetRef<EditResidenceSheet>,
        private firebaseService: FirebaseService,
        private snackService: SnackService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

    editResidenceForm: FormGroup;
    loading: boolean = true;

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    onSubmit(): void {
        this.firebaseService.editResidence(this.data['id'], this.editResidenceForm.value);

        setTimeout(() => {
            this.snackService.open('Residence updated');
        }, 500);

        this._bottomSheetRef.dismiss();
    }

    ngOnInit() {
        this.editResidenceForm = new FormGroup({
            status: new FormControl(this.data['status'], Validators.required),
			address: new FormControl(this.data['address'], Validators.required),
			contact: new FormControl(this.data['contact'])
        });
    }
}
