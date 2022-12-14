import Head from 'next/head';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useHistory } from 'react-router-dom';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string().required('Required'),
  username: Yup.string().required('Required').min(2, 'Username must be between contain at least 2 characters').max(25, 'Username must not exceed 25 characters'),
});

export default function Login() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();
  const signIn = useSignIn();

  const saveLogin = (values) => {
    setError('');
    try {
      const response = axios.post('http://localhost:3001/auth/login', values);
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: { username: values.username },
      });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message);
    }
    history.replace('/home');
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    saveLogin(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Head>
        <title>Login Page!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Login Page!</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >

        {({ values, isSubmitting }) => (
          <Form>
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
