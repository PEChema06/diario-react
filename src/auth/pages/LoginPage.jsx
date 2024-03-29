import { Google } from '@mui/icons-material'
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSingIn, startLoginWithEmailAndPassword } from '../../store/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: ''

}


export const LoginPage = () => {


  const {email, password, onInputChange} = useForm(formData);

  const dispatch = useDispatch();

  const {status,errorMessage} = useSelector(state => state.auth);


  //Memorizo el estatus de mi aplicación para que el usuario por error no pueda seguir dandole a los botones mientras se loguea
  const isAuthenticate = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    //dispatch(checkingAuthentication());
    dispatch(startLoginWithEmailAndPassword(email,password));
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  }


  return (
    
        <AuthLayout title="Login">
          <form onSubmit={onSubmit}>
            <Grid container>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@gmail.com'
                fullWidth 
                name="email"
                onChange={onInputChange}
                value={email}/>
              </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='contraseña'
                fullWidth
                name="password"
                onChange={onInputChange}
                value={password} />
              </Grid>

              <Grid container
              spacing={2}
              sx={{mb:2, mt:2}}>
                <Grid 
                className='animate__animated animate__bounce'
                item xs={12}
                display = {!!errorMessage ? '': 'none'}>
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                  disabled = {isAuthenticate}
                  variant='contained'
                  fullWidth
                  type="submit">Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                  disabled = {isAuthenticate}
                  variant='contained'
                  fullWidth
                  onClick={onGoogleSingIn}>
                    <Google/>
                      <Typography sx={{ml:1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>


                <Grid container direction="row" justifyContent="end">
                  <Link component={RouterLink} color="inherit" to="/auth/register">
                    Crear una cuenta
                  </Link>
                  
                </Grid>


            </Grid>
        </form>
        </AuthLayout>
        
  )
}
