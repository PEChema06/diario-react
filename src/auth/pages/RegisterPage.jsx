import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { AuthLayout } from '../layout/AuthLayout'
import { useMemo, useState } from 'react'
import { StartUserWithEmailAndPassword } from '../../store/auth/thunks'
import { useDispatch , useSelector } from 'react-redux'


const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), "El correo debe tener una @." ],
  password: [(value) => value.length >=6, "El password debe ser máximo 6 caracteres."],
  displayName: [(value) => value.length >=1, "El nombre debe ser obligatorio."]
}



export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthenticated = useMemo(() => status === "checking", [status]);


  const {formState,displayName ,email, password,isFormValid, emailValid, passwordValid, displayNameValid, onInputChange} = useForm(formData, formValidations);



  const onSubmit = (e) => {
    e.preventDefault();

    setformSubmitted(true);

    if(!isFormValid) return;

    dispatch(StartUserWithEmailAndPassword(formState));


  } 


  return (
    
    <AuthLayout title="Crear cuenta">
          <form onSubmit={onSubmit}>
            <Grid container>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                label="Nombre completo" 
                type="text"
                name="displayName"
                onChange = {onInputChange} 
                placeholder='Nombre completo'
                value={displayName}
                error = {!!displayNameValid && formSubmitted}
                helperText = {displayNameValid}
                fullWidth />
              </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                label="Correo" 
                type="email" 
                name= "email"
                onChange= {onInputChange} 
                placeholder='correo@gmail.com'
                value={email}
                error = {!!emailValid && formSubmitted}
                helperText = {emailValid}
                fullWidth />
              </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                label="Contraseña" 
                type="password" 
                name= "password"
                onChange = {onInputChange} 
                placeholder='contraseña'
                value={password}
                error = {!!passwordValid && formSubmitted}
                helperText = {passwordValid}
                fullWidth />
              </Grid>

              <Grid container
              spacing={2}
              sx={{mb:2, mt:2}}>

                <Grid
                className='animate__animated animate__bounce'
                item xs={12}
                display={!!errorMessage ? '' : 'none'}>
                  <Alert severity='error'
                  >{errorMessage}</Alert>
                </Grid>

                <Grid item xs={12}>
                  <Button
                  disabled= {isCheckingAuthenticated}
                  type="submit"
                   variant='contained'
                  fullWidth>Crear
                  </Button>
                </Grid>
              </Grid>


                <Grid container direction="row" justifyContent="end">
                  <Typography sx={{mr:1}}>¿Ya tienes una cuenta? </Typography>
                  <Link component={RouterLink} color="inherit" to="/auth/login">
                    Regresar
                  </Link>
                  
                </Grid>


            </Grid>
        </form>
        </AuthLayout>
  )
}
