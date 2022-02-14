import React, { useState } from 'react'
import withFirebase from '../../hoc/withFirebase'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import {
  signInWithEmailAndPassword,
  updateEmail,
  getAuth,
  sendEmailVerification
} from 'firebase/auth'
import Loader from '../Loader/Loader'

const ChangeEmail = ({ auth, handleCancel }) => {
  const [authError, setAuthError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  const handleSubmit = (values) => {
    console.log(auth)
    setLoading(true)
    signInWithEmailAndPassword(auth, auth.currentUser.email, values.password)
      .then(() => {
        updateUserEmail(values.email)
        setNewEmail(values.email)
      })
      .catch((error) => {
        setLoading(false)
        setAuthError('Wrong password')
        console.log(error)
      })
  }

  const updateUserEmail = (newEmail) => {
    console.log('update')
    updateEmail(auth.currentUser, newEmail).then(() => {
      const newAuth = getAuth()
      sendEmailVerification(newAuth.currentUser)
      setLoading(false)
      setSuccess(true)
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
    email: '',
    password: ''
  }
  if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>
  if (success) {
    return (
      <div>
        <p className='text-white'>Your email address has been changed</p>
        <p className='text-white'>A email verification has been send to {newEmail}</p>
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
        <Form className='grid'>
          <h2>Change email</h2>
          <label htmlFor='email'>New email</label>
          <Field id='email' name='email' type='text' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='email' component='small' />
          <label htmlFor='password'>Password</label>
          <Field id='password' name='password' type='password' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='password' component='small' />
          {authError}
          <div className='flex justify-end pt-6'>
            <button className='cancelButton' type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button className='submitButton' type='submit'>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const WrappedComponent = withFirebase(ChangeEmail)

export default WrappedComponent
