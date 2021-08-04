import React from 'react';
import './LoginForm.scss';
import { Form, Button } from 'semantic-ui-react';

export default function LoginForm() {
   return (
      <Form className='login-form'>
         <h2>Entra para ver fotos y videos de tus amigos</h2>
         <Form.Input type='text' placeholder='Email' name='email' />
         <Form.Input type='password' placeholder='Contraseña' name='password' />
         <Button type='submit' className='btn-submit'>
            Iniciar Sesión
         </Button>
      </Form>
   );
}
