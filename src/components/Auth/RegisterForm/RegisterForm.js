/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './RegisterForm.scss';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import React from 'react';

export default function RegisterForm(props) {
   const { setShowLogin } = props;

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: null,
      onSubmit: (formValues) => {
         console.log(formValues);
      },
   });

   return (
      <>
         <h2 className='register-form-title'>
            Registrate para ver fotos y videos de tus amigos
         </h2>
         <Form className='register-form' onSubmit={formik.handleSubmit}>
            <Form.Input
               type='text'
               placeholder='Nombre y Apellido'
               name='name'
               onChange={formik.handleChange}
            />
            <Form.Input
               type='text'
               placeholder='Username'
               name='username'
               onChange={formik.handleChange}
            />
            <Form.Input
               type='text'
               placeholder='Correo Electrónico'
               name='email'
               onChange={formik.handleChange}
            />
            <Form.Input
               type='password'
               placeholder='Password'
               name='password'
               onChange={formik.handleChange}
            />
            <Form.Input
               type='password'
               placeholder='Repetir Password'
               name='passwordConfirm'
               onChange={formik.handleChange}
            />
            <Button type='submit' className='btn-submit'>
               Registrarse
            </Button>
         </Form>
      </>
   );
}

const initialValues = () => {
   return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
   };
};
