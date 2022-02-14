import React, { useState } from 'react'
import withFirebase from '../../hoc/withFirebase'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import Loader from '../Loader/Loader'

const DeleteForm = ({ auth, deletePicture, handleCancel, idPicture }) => {
  const [authError, setAuthError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleSubmit = (values) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, auth.currentUser.email, values.password)
      .then(() => {
        deletePicture(idPicture)
        setLoading(false)
        setSuccess(true)
      })
      .catch((error) => {
        setLoading(false)
        setAuthError('Wrong password')
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
        <p>The picture was deleted successfully.</p>
        <Link href='/'><a>Go back to the list</a></Link>
      </div>
    )
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form className='grid'>
        <h2>Are you sure ?</h2>
        <label htmlFor='password'>Password</label>
        <Field id='password' name='password' type='password' required />
        <ErrorMessage name='password' component='small' />
        {authError}
        <div className='flex justify-end pt-6'>
          <button className='cancelButton' type='button' onClick={handleCancel}>
            Cancel
          </button>
          <button className='deleteButton' type='submit'>
            Delete
          </button>
        </div>
      </Form>
    </Formik>
  )
}

const WrappedComponent = withFirebase(DeleteForm)

export default WrappedComponent
