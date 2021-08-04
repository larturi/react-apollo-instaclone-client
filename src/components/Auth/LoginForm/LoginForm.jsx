import './LoginForm.scss';

import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { LOGIN_USER } from '../../../gql/user';
import { setToken } from '../../../utils/token';

export default function LoginForm() {
   const [error, setError] = useState('');
   const [loginUser] = useMutation(LOGIN_USER);

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: yupValidations(),
      onSubmit: async (formData) => {
         setError('');
         try {
            const { data } = await loginUser({
               variables: {
                  input: formData,
               },
            });
            const { token } = data.loginUser;
            setToken(token);
            toast.success('Bienvenido!');
         } catch (error) {
            setError(error.message);
            toast.error(error.message);
            console.error(error);
         }
      },
   });

   return (
      <Form className='login-form' onSubmit={formik.handleSubmit}>
         <h2>Entra para ver fotos y videos de tus amigos</h2>
         <Form.Input
            type='text'
            placeholder='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email && true}
         />
         <Form.Input
            type='password'
            placeholder='Contraseña'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password && true}
         />
         <Button type='submit' className='btn-submit'>
            Iniciar Sesión
         </Button>

         {error && <p className='submit-error'>{error}</p>}
      </Form>
   );
}

const initialValues = () => {
   return {
      email: '',
      password: '',
   };
};

const yupValidations = () => {
   return Yup.object({
      email: Yup.string().email().required(true),
      password: Yup.string().required(true),
   });
};
