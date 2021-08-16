import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';

import './EmailForm.scss';

export default function EmailForm(props) {
   const { setShowModal, currentEmail, refetch } = props;

   const [updateUser] = useMutation(UPDATE_USER);

   const formik = useFormik({
      initialValues: initialValues(currentEmail),
      validationSchema: Yup.object({
         email: Yup.string().email().required(),
      }),
      onSubmit: async (formData) => {
         try {
            await updateUser({
               variables: {
                  input: formData,
               },
            });

            toast.success('Email actualizado correctamente');
            refetch();
            setShowModal(false);
         } catch (error) {
            toast.error('Error al actualizar el email');
            console.error(error);
         }
      },
   });

   return (
      <Form className='email-form' onSubmit={formik.handleSubmit}>
         <Form.Input
            placeholder='Tu nuevo Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email && true}
         />
         <Button type='submit' className='btn-submit'>
            Actualizar Email
         </Button>
      </Form>
   );
}

const initialValues = (currentEmail) => {
   return {
      email: currentEmail || '',
   };
};
