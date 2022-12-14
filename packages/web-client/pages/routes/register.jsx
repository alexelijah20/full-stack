import Head from 'next/head';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const initialValues = {
  email: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Required').min(2, 'Username must be between contain at least 2 characters').max(25, 'Username must not exceed 25 characters'),
  password: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format').required('Required'),
});

export default function Register() {
  const [data, setData] = useState([]);
  const history = useHistory();

  const saveRegister = (values) => {
    fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then(async (response) => {
        if (response.status >= 400 || response == null) {
          try {
            return await response.json();
          } catch (errResData) {
            const error = new Error('something went wrong');
            error.data = errResData;
            throw error;
          }
        }
        history.push('/login');
        return response.json();
      }).then((result) => {
        setData(result);
      });
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    saveRegister(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Head>
        <title>Register Page!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Register Page!</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >

        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">E-mail</label>
              <Field
                type="text"
                id="email"
                name="email"
              />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="username">username</label>
              <Field
                type="text"
                id="username"
                name="username"
              />
              <ErrorMessage name="username" />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <Field
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
