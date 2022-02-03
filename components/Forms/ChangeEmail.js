import React, { useState } from 'react'
import styles from './Form.module.scss'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { getAuth, updateEmail, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import Loader from '../Loader/Loader'

export default function ChangeEmail ({ handleCancel }) {
  const [authError, setAuthError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  const handleSubmit = (values) => {
    setLoading(true)
    console.log('submit')
    const auth = getAuth()
    console.log(auth.currentUser.email)
    signInWithEmailAndPassword(auth, auth.currentUser.email, values.password)
      .then(() => {
        updateUserEmail(auth, values.email)
      })
      .catch((error) => {
        setLoading(false)
        setAuthError('Wrong password')
        console.log(error)
      })
  }

  const updateUserEmail = (auth, newEmail) => {
    console.log('update')
    updateEmail(auth.currentUser, newEmail).then(() => {
      const newAuth = getAuth()
      console.log(newAuth.currentUser.email)
      sendEmailVerification(newAuth.currentUser)
        .then(() => {
          setNewEmail(newEmail)
          setLoading(false)
          setSuccess(true)
        })
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }

  const schema = yup.object().shape({
    email: yup.string()
      .email('Must be a valid email')
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
    password: ''
  }
  if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>
  if (success) {
    return (
      <div>
        <p>Your email address has been changed</p>
        <p>A email verification has been send to {newEmail}</p>
      </div>
    )
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({
        submitForm
      }) => (
        <Form className={styles.form}>
          <h2>Change email</h2>
          <label htmlFor='password'>New email</label>
          <Field id='email' name='email' type='text' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='email' component='small' className={styles.errorMessage} />
          <label htmlFor='password'>Password</label>
          <Field id='password' name='password' type='password' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='password' component='small' className={styles.errorMessage} />
          {authError}
          <div className={styles.buttonsContainer}>
            <button className={styles.cancelButton} type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.submitButton} type='submit'>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
