import { LoginWithEmailAndPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirebase } from "../../firebase/provider";
import { clearNoteInLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email,password) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

    }


}

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result));

    }
}

export const StartUserWithEmailAndPassword = ({email,password,displayName}) => {

    return async(dispatch) => {
        dispatch(checkingCredentials());
        const {ok,uid,photoURL, errorMessage} = await registerUserWithEmailPassword({email,password,displayName});

        //Si te devuelve false el ok entonces nos salimos
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid,photoURL,displayName,email}))




    }

}


export const startLoginWithEmailAndPassword = (email,password) => {

    return async(dispatch) => {
        dispatch(checkingAuthentication());
        const {ok,uid,photoURL,displayName,errorMessage} = await LoginWithEmailAndPassword(email,password);
        
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid,photoURL,displayName,email}));

    }

}


export const startLogOut = () => {

    return async(dispatch) => {
        await logoutFirebase()

        dispatch(clearNoteInLogout())
        dispatch(logout())
    }
}