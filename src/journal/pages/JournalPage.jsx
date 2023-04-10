import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../views/NoteView'
import { NothingSelectedView } from '../views/NothingSelectedView'

export const JournalPage = () => {

  const {isSaving, activeNote} = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const onNewNote = () => {

    dispatch(startNewNote())

  }

  return (

    
    <JournalLayout>
      {
      (activeNote != null)
      ? <NoteView/>
      : <NothingSelectedView/>
    }
      {/*<NothingSelectedView/>*/}
      {/*<NoteView/>*/}


    <IconButton
    disabled={isSaving}
    onClick={onNewNote}
    size='large'
    sx={{color: 'white',
    backgroundColor: 'red',
    ':hover': {backgroundColor: 'red', opacity:0.9},
    position: 'fixed',
    right: 50,
    bottom: 50}}>

      <AddOutlined sx={{fontSize:30}}/>
    </IconButton>

    </JournalLayout>


  )
}
