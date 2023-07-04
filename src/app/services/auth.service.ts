import { Injectable } from '@angular/core';
import 'firebase/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import {
  Firestore,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: Auth,
    private firestore: Firestore,
    public router: Router
  ) {}

  initAuthListener() {
    this.auth.beforeAuthStateChanged((fUser) => {
      // console.log('initAuthListener: ',fUser);
      // console.log('initAuthListener: ',fUser?.email);
      // console.log('initAuthListener: ',fUser?.uid);
    });
  }

  createUser(name: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser: User = {
          uid: user.uid,
          name: name,
          email: email,
        };
        const userRef = collection(this.firestore, 'users');
        return addDoc(userRef, newUser);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOutUser() {
    return this.auth.signOut();
  }

  isAuth() {
    return new Observable((subscriber) => {
      const unsubscribe = this.auth.onAuthStateChanged(subscriber);
      return { unsubscribe };
    }).pipe(map((fUser) => fUser != null));
  }
}
