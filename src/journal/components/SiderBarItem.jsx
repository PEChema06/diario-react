import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote, setNotes } from '../../store/journal'

export const SiderBarItem = ({title = "",id,body, date, imageUrls = []}) => {


    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17 
        ? title.substring(0,17) + "..."
        : title
    }, [title]);

    const notaSelect = ()  => {
        dispatch(setActiveNote({id,title,body, date, imageUrls}))
    }


  return (
    <ListItem disablePadding>
        <ListItemButton onClick={notaSelect}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}></ListItemText>
                <ListItemText secondary={body}></ListItemText>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
