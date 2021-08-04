import './Auth.scss';

import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm';
import imgInstaclone from '../../assets/png/instaclone.png';

export default function Auth() {
   const [showLogin, setShowLogin] = useState(true);
   return (
      <Container fluid className='auth'>
         <Image src={imgInstaclone} />
         <div className='container-form'>
            {showLogin ? (
               <LoginForm />
            ) : (
               <RegisterForm setShowLogin={setShowLogin} />
            )}
         </div>

         <div className='change-form'>
            {showLogin ? (
               <>
                  <p>¿No tienes una cuenta?</p>
                  <span onClick={() => setShowLogin(!showLogin)}>
                     Registrate
                  </span>
               </>
            ) : (
               <>
                  <p>¿Tienes una cuenta?</p>
                  <span onClick={() => setShowLogin(!showLogin)}>
                     Iniciar Sesión
                  </span>
               </>
            )}
         </div>
      </Container>
   );
}
