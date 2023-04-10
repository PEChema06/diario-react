import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {

    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
      
      //Para saber qué usuario está autenticado
      onAuthStateChanged(FirebaseAuth, async(user) => {
        if(!user) return dispatch(logout());
        const {uid,photoURL,email,displayName} = user;
        dispatch(login({uid,photoURL,email,displayName}));
        dispatch(startLoadingNotes());
      });
      
    }, []);

    return status
}
