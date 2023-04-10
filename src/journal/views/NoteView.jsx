import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useMemo, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { ImageGallery } from '../components/ImageGallery'
import { setActiveNote, startDeletingNote, startUpdateNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2'
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {


    const dispatch = useDispatch()
    const {activeNote, messageSave, isSaving} = useSelector(state => state.journal);
    const {title, body, date, onInputChange, formState} = useForm(activeNote);

    //Crea una referencia a un elemento HTML para ser usado en otro elemento HTML
    const fileInputRef = useRef()
    
    const dateString = useMemo( () => {

        const newDate = new Date(date);
        return newDate.toUTCString();

    }, [date]);


    useEffect(() => {
        //Le pasamos todo el form entero para que coja todas las cosas del objeto
      dispatch(setActiveNote(formState));

    }, [formState]);

    useEffect(() => {
      if(messageSave.length > 0) {
        Swal.fire("Nota actualizada", messageSave, 'success');
      }

    }, [messageSave]);

    const onInputChang = ({target}) => {

     if(target.files.length === 0) return;

     dispatch(startUploadingFiles(target.files));

    }
    


    const onSaveNote = () => {
        dispatch(startUpdateNote())
    }

    const onDelete = () => {


      dispatch(startDeletingNote())

    }
    
    
    
    

  return (
    <Grid container direction = "row" justifyContent="space-between" sx={{mb:1}}>
        <Grid item >
            <Typography fontSize={39} fontWeight="ligth">{dateString}</Typography>
        </Grid>

        <Grid item>

          <input 
           type='file'
           multiple
           ref={fileInputRef}
           onChange={onInputChang}
           style={{display:'none'}}/>


          <IconButton
          color= "primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}>
            <UploadOutlined/>
          </IconButton>


            <Button
             onClick={onSaveNote}
             disabled = {isSaving}
             color="primary" sx={{padding:2}}>
                <SaveOutlined sx={{fontSize: 30, mr:1}} />
                Guardar
            </Button>
        </Grid>

        <Grid container >
            <TextField
            type="text"
            placeholder='Ingrese un valor'
            variant="filled"
            fullWidth
            label="Título"
            name='title'
            value={title}
            onChange = {onInputChange}
            sx={{border: 'none', mb:1}}/>
        </Grid>

        <TextField
            type="text"
            placeholder='¿Qué ha sucedido en el día de hoy?'
            variant="filled"
            fullWidth
            multiline
            name='body'
            value={body}
            onChange = {onInputChange}
            minRows={5}/>


            <Grid container justifyContent={'end'}>
              <Button
              onClick={onDelete}
              sx={{mt:2}}
              color="error">

                <DeleteOutline/>
                Eliminar
              </Button>
            </Grid>

            <ImageGallery images={activeNote.imageUrls}/>


    </Grid>
  )
}
