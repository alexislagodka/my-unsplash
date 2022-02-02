import React, { useState } from 'react'
import styles from './Form.module.scss'
import Loader from '../Loader/Loader'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function LoginForm ({ handleCancel }) {
  const [authError, setAuthError] = useState(null)
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    email: yup.string()
      .required('This field is required'),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      )
  })

  const initialValues = {
    email: '',
    password: '',
    login: true,
    createAccount: false
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    const auth = getAuth()
    if (values.login) {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.code)
          switch (error.code) {
            case 'auth/user-not-found':
              setAuthError('Sorry your account does not exist. Please try to create account.')
              break
            case 'auth/invalid-email':
              setAuthError('This email is invalid.')
              break
            case 'auth/wrong-password':
              setAuthError('Wrong password.')
              break
            default:
              setAuthError('Sorry your account does not exist. Please try to create account.')
          }
        })
    } else {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          setLoading(false)
          const user = userCredential.user
          console.log(user)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.code)
          setAuthError(error.message)
          console.log(error.code)
          switch (error.code) {
            case 'auth/email-already-in-use':
              setAuthError('This account already exist.')
              break
            case 'auth/operation-not-allowed':
              setAuthError('Wrong password.')
              break
            case 'auth/weak-password':
              setAuthError('Thrown if the password is not strong enough.')
              break
            default:
              setAuthError('Sorry we cannot create your account.')
          }
        })
    }

    resetForm({})
  }

  if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({
        setFieldValue,
        submitForm
      }) => (
        <Form className={styles.form}>
          <h2>Log in to add photos</h2>
          <label htmlFor='email'>Email</label>
          <Field id='email' name='email' type='text' placeholder='JohnDoe@mail.com' onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='email' component='small' className={styles.errorMessage} />
          <label htmlFor='password'>Password</label>
          <Field id='password' name='password' type='password' placeholder='Password' onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='password' component='small' className={styles.errorMessage} />
          {authError}
          <div className={styles.buttonsContainer}>
            <button className={styles.cancelButton} type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button
              className={styles.submitButton}
              type='button'
              id='loginButton'
              onClick={() => {
                setFieldValue('createAccount', false)
                setFieldValue('login', true)
                submitForm()
              }}
            >
              Log In
            </button>
          </div>
          <div>
            <button
              className={styles.createAccountButton}
              type='button'
              id='createAccountButton'
              onClick={() => {
                setFieldValue('login', false)
                setFieldValue('createAccount', true)
                submitForm()
              }}
            >
              Create account
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
