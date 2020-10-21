import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private afs: AngularFirestore) { }

    getResidences(): Observable<DocumentChangeAction<unknown>[]> {
        return this.afs.collection('residences').snapshotChanges();
    }

    addResidence(data: FormData) {
        return this.afs.collection('residences').add(data);
    }

    editResidence(id: string, data: FormData) {
        return this.afs.doc('residences/' + id).update(data);
    }

    deleteResidence(id: string): Promise<void> {
        return this.afs.doc('residences/' + id).delete();
    }
}
