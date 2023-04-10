import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEntryNote, setActiveNote, setNotes, savinNewNote, setSaving, updateNote, setPhotoToActiveNote, deleteNoteById } from "./journalSlice";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {

    return async(dispatch, getState) => {

        const {uid} = getState().auth;


        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        //Para coger la referencia en firebase de tu base de datos
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        //Inserta una nota en nuestra bbdd de firebase
        await setDoc(newDoc,newNote);

        //Creamos el id a la nueva nota

        newNote.id = newDoc.id;

        dispatch(addNewEntryNote(newNote));
        dispatch(setActiveNote(newNote))

        dispatch(savinNewNote());
        
    }


}


export const startLoadingNotes = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        const notes = await loadNotes(uid);

        //Agregamos las notas en el Reducer
        dispatch(setNotes(notes))

    }
}

export const startUpdateNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());


        const {uid} = getState().auth;
        const {activeNote} = getState().journal;
        //Tenemos que eliminar la id porque sino firebase la va a crear de nuevo
        const noteFireBase = {...activeNote};
        delete noteFireBase.id ;




        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        //Ponemos el merge en true para que se mantengan los datos que no existen en el objeto que le pasamos
        await setDoc(docRef, noteFireBase, {merge:true});

        dispatch(updateNote(activeNote));

    }
}


export const startUploadingFiles = (archivos = []) => {

    return async(dispatch) => {
        dispatch(setSaving())

        const arrayPromesas = [];

        for (const archivo of archivos) {

            arrayPromesas.push(fileUpload(archivo));
            
        }
        const photoURLs = await Promise.all(arrayPromesas);
        console.log(photoURLs)

        dispatch(setPhotoToActiveNote(photoURLs));




    }

}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const {activeNote} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(docRef);

        dispatch( deleteNoteById(activeNote.id));




       


    } 
}