import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: "",
        notes: [],
        activeNote: null
        },
    reducers: {

        savinNewNote: (state) => {
            state.isSaving = false;
        },

        addNewEntryNote: (state,  action ) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state,  action ) => {
            state.activeNote = action.payload
            state.messageSave= ""
        },
        setNotes: (state,  action ) => {
            state.notes = action.payload
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSave= ""
        },
        updateNote: (state,  action ) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if(note.id === action.payload.id) {
                    return action.payload
                    
                }
                return note
            })
            //Todo Mensaje de actualización de notas
            state.messageSave = `${action.payload.title} se ha actualizado correctamente`
        },
        
        clearNoteInLogout: (state) => {

            state.isSaving = false;
            state.messageSave ="";
            state.notes = [];
            state.activeNote = null;
        },

        setPhotoToActiveNote: (state, action ) => {

            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload ];
            state.isSaving = false

        },
        deleteNoteById: (state,  action ) => {
            state.notes = state.notes.filter(nota => {
                if(nota.id !== action.payload) return nota
            });
            state.activeNote = null

        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEntryNote,
    setActiveNote,
    setNotes,setSaving,
    updateNote,
    deleteNoteById,
    setPhotoToActiveNote,
    clearNoteInLogout,
    savinNewNote } = journalSlice.actions;