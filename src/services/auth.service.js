import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from './../firebase/firebase' // Перевір, чи правильний шлях до файлу конфігу

const mapAuthCodeToMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Цей email вже використовується.'
    case 'auth/invalid-email':
      return 'Некоректний формат email.'
    case 'auth/user-not-found':
    case 'auth/wrong-password': // Часто для безпеки ці помилки об'єднують
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
export const signUpUser = async (email, password, displayName) => {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(userCredential.user, { displayName })

    return {
      user: { ...userCredential.user, displayName },
      error: null,
    }
  } catch (error) {
    return { user: null, error: mapAuthCodeToMessage(error.code) }
  }
}