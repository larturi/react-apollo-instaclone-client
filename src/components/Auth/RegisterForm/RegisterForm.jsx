import './RegisterForm.scss';

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../../gql/user';

export default function RegisterForm(props) {
   const { setShowLogin } = props;
   const [register] = useMutation(REGISTER_USER);

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: yupValidations(),
      onSubmit: async (formData) => {
         try {
            const newUser = formData;
            delete newUser.passwordConfirm;
            await register({
               variables: {
                  input: newUser,
               },
            });
            toast.success('Usuario registrado correctamente');
            setShowLogin(true);
         } catch (error) {
            toast.error(error.message);
            console.error(error);
         }
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
               value={formik.values.name}
               error={formik.errors.name && true}
            />
            <Form.Input
               type='text'
               placeholder='Username'
               name='username'
               onChange={formik.handleChange}
               value={formik.values.username}
               error={formik.errors.username && true}
            />
            <Form.Input
               type='text'
               placeholder='Correo Electrónico'
               name='email'
               onChange={formik.handleChange}
               value={formik.values.email}
               error={formik.errors.email && true}
            />
            <Form.Input
               type='password'
               placeholder='Password'
               name='password'
               onChange={formik.handleChange}
               value={formik.values.password}
               error={formik.errors.password && true}
            />
            <Form.Input
               type='password'
               placeholder='Repetir Password'
               name='passwordConfirm'
               onChange={formik.handleChange}
               value={formik.values.passwordConfirm}
               error={formik.errors.passwordConfirm && true}
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
      username: '',
      password: '',
      passwordConfirm: '',
   };
};

const yupValidations = () => {
   return Yup.object({
      name: Yup.string().required(true),
      username: Yup.string()
         .required(true)
         .matches(
            /^[a-zA-Z0-9-]*$/,
            'El nombre del usuario no puede tener espacio'
         ),
      email: Yup.string().email().required(true),
      password: Yup.string()
         .required(true)
         .oneOf([Yup.ref('passwordConfirm')]),
      passwordConfirm: Yup.string()
         .required(true)
         .oneOf([Yup.ref('password')]),
   });
};
