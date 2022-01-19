import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { NewPairs } from '../models/new-pairs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getNewPairs$(): Observable<NewPairs[]> {
    return this.firestore
      .collection('new-pairs', (ref) =>
        ref.orderBy('CreatedAtTimestamp', 'desc').limit(20)
      )
      .valueChanges() as Observable<NewPairs[]>;
  }
}
