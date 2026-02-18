import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'

import { ref, set, get, child } from 'firebase/database'
import { auth, database } from './../firebase/firebase'


const mapAuthCodeToMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Цей email вже використовується.'
    case 'auth/invalid-email':
      return 'Некоректний формат email.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Невірний email або пароль.'
    case 'auth/weak-password':
      return 'Пароль занадто слабкий (мінімум 6 символів).'
    case 'auth/too-many-requests':
      return 'Забагато спроб. Спробуйте пізніше.'
    default:
      console.error('Unhandled Auth Error:', errorCode)
      return 'Сталася помилка. Спробуйте ще раз.'
  }
}

// Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error) {
    return { user: null, error: mapAuthCodeToMessage(error.code) }
  }
}

// Logout
export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: mapAuthCodeToMessage(error.code) }
  }
}

// Signup
export const signUpUser = async (email, password, displayName, firstName, lastName) => {
  try {

    //auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;


    await updateProfile(user, { displayName })

    const userDbRef = ref(database, 'users/' + user.uid)

    await set(userDbRef, {
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      email: email,
      role: 'user',
      registeredAt: Date.now()
    })

    return {
      user: { ...user, displayName },
      error: null,
    }
  } catch (error) {
    console.error('Signup Error:', error)
    return { user: null, error: mapAuthCodeToMessage(error.code) }
  }
}

export const getUserRole = async (uid) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${uid}/role`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return 'user'
    }
  } catch (error) {
    console.error("Error fetching role:", error)
    return 'user'
  }
}