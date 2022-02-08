import React, { useState } from 'react'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { getAuth, updatePassword, signInWithEmailAndPassword } from 'firebase/auth'
import Loader from '../Loader/Loader'

export default function ChangePassword ({ handleCancel }) {
  const [authError, setAuthError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true)
    const auth = getAuth()
    signInWithEmailAndPassword(auth, auth.currentUser.email, values.password)
      .then(() => {
        updateUserPassword(auth, values.newPassword)
      })
      .catch((error) => {
        setLoading(false)
        setAuthError('Wrong password')
        console.log(error)
      })
  }

  const updateUserPassword = (auth, newPassword) => {
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        setSuccess(true)
      }).catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: yup.string()
      .oneOf([yup.ref('newPassword'), null], "Passwords don't match!")
      .required('Required'),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      )
  })
  const initialValues = {
    newPassword: '',
    confirmPassword: '',
    password: ''
  }
  if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>
  if (success) {
    return (
      <div>
        <p>Your password has been changed</p>
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
          <label htmlFor='newPassword'>New password</label>
          <Field id='newPassword' name='newPassword' type='password' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='newPassword' component='small' />
          <label htmlFor='confirmPassword'>Confirm new password</label>
          <Field id='confirmPassword' name='confirmPassword' type='password' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='confirmPassword' component='small' />
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
