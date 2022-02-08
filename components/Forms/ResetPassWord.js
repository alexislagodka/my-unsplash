import React, { useState } from 'react'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import Loader from '../Loader/Loader'

export default function ResetPassword ({ handleCancel }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [resetError, setResetError] = useState(null)

  const handleSubmit = (values) => {
    setLoading(true)
    setEmail(values.email)
    const auth = getAuth()
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        setLoading(false)
        setSuccess(true)
      })
      .catch((error) => {
        setResetError(error.message)
        setLoading(false)
        console.log(error)
      })
  }

  const schema = yup.object().shape({
    email: yup.string()
      .email('Must be a valid email')
      .required('This field is required')
  })
  const initialValues = {
    password: ''
  }
  if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>
  if (success) {
    return (
      <div>
        <p>A reset password email has been send to {email}</p>
        <button className='cancelButton' onClick={handleCancel}>Close</button>
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
          <h2>Reset your password</h2>
          <label htmlFor='password'>Email</label>
          <Field id='email' name='email' type='text' required onKeyUp={(event) => { if (event.key === 'Enter') { submitForm() } }} />
          <ErrorMessage name='email' component='small' />
          {resetError}
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
