import React, { useState } from 'react'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { getAuth, deleteUser, signInWithEmailAndPassword } from 'firebase/auth'
import Loader from '../Loader/Loader'

export default function DeleteAccount ({ handleCancel }) {
  const [authError, setAuthError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true)
    const auth = getAuth()
    signInWithEmailAndPassword(auth, auth.currentUser.email, values.password)
      .then(() => {
        deleteUserAccount(auth.currentUser)
      })
      .catch((error) => {
        setLoading(false)
        setAuthError('Wrong password')
        console.log(error)
      })
  }

  const deleteUserAccount = (user) => {
    deleteUser(user).then(() => {
      setSuccess(true)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  const schema = yup.object().shape({
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
          <h2>Are you sure to delete your account ?</h2>
          <label htmlFor='password'>Password</label>
          <Field id='password' name='password' type='password' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='password' component='small' />
          {authError}
          <div className='flex justify-end pt-6'>
            <button className='cancelButton' type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button className='deleteButton' type='submit'>
              delete
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
