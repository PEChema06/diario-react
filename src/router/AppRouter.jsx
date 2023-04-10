import { Navigate, Route, Routes } from 'react-router';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { ChekingAuth } from '../ui';

export const AppRouter = () => {


  const status = useCheckAuth();

  if(status === "checking") return <ChekingAuth/>


  return (

    
    <Routes>
      {
        (status === 'autenticated')
        ? <Route path='/*' element={<JournalRoutes/>}/>
        : <Route path='/auth/*' element={<AuthRoutes/>}/>
      }

      <Route path='/*' element={<Navigate to="/auth/login"/>}/>


      {/* Login y registro */}
      {/*<Route path='/auth/*' element={<AuthRoutes/>}/>*/}
      {/* JournalApp */}
      {/* <Route path='/*' element={<JournalRoutes/>}/> */}
    </Routes>
  )
}
