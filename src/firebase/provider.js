import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();


export const singInWithGoogle = async() => {


    try {
        

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;


        return {
            ok: true,
            //Información usuario
            displayName, email, photoURL, uid,
        }



    } catch (error) {
         // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok:false,
            errorCode,
            errorMessage,
        }
    }


}


export const registerUserWithEmailPassword = async({email,password,displayName}) => {

    try {
        

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {photoURL, uid} = resp.user

        //Hacer el update del usuario que se crea porque no viene con photourl ni displayName
        //* Con el FirebaseAuth.currentUser tenemos el usuario actual logueado que en este caso cuando se crea se loguea directamente
        updateProfile(FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            photoURL, uid, email,displayName

        }



    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}


export const LoginWithEmailAndPassword = async(email,password) => {


    try {

       const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
       const {uid,photoURL,displayName} = result.user;

       return {
        ok: true,
        uid,photoURL,displayName, email
       }

        
    } catch (error) {
        return {
        ok:false,
        errorMessage: error.message
        }
    }



}


export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut();


}


