import { Drawer,Box, Toolbar, Typography, Divider, List, colors } from '@mui/material'
import { useSelector } from 'react-redux'
import { SiderBarItem } from './SiderBarItem';

export const SideBar = ({drawerWidth= 240}) => {

    const {displayName} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.journal);


  return (
    <Box component="nav"
    sx = {{width: {sm: drawerWidth}, flexShrink: {sm:0}}}>

        <Drawer variant='permanent'
        open
        sx={{display:{xs:'block'},
        '& .MuiDrawer-paper':{boxSizing: 'border-box', width: drawerWidth}}}>

            <Toolbar sx = {{background:"#c0cbff"}}>
                <Typography variant='h6' noWrap component="div">{displayName}</Typography>
            </Toolbar>
            <Divider/>

            <List>
                {notes.map(nota => (
                    <SiderBarItem key={nota.id} {...nota}/>
                ))}
            </List>

        </Drawer>
        
    </Box>
  )
}
