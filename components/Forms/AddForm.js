import React, { useState } from 'react'
import withFirebase from '../../hoc/withFirebase'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Loader from '../Loader/Loader'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'

const AddForm = ({ addPicture, handleCancel }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()
  const forceReload = () => {
    router.reload()
  }
  const schema = yup.object().shape({
    name: yup.string()
      .required('This field is required'),
    url: yup.string()
      .matches('https://images.unsplash.com/',
        'The url must start with "https://images.unsplash.com/..." ')
      .required('This field is required')
  })

  const initialValues = {
    name: '',
    url: ''
  }

  const handleSubmit = (values) => {
    setLoading(true)
    const auth = getAuth()
    const uid = auth.currentUser.uid
    const img = new Image()
    img.onload = function () {
      const picture = {
        name: values.name,
        src: values.url,
        width: this.width,
        height: this.height,
        uidowner: uid
      }
      addPicture(picture)
      setLoading(false)
      setSuccess(true)
    }
    img.onerror = function () {
      console.log('error')
      setError('Sorry this url does not contain image.')
      setLoading(false)
    }
    img.src = values.url
  }
  if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>
  if (success) {
    return (
      <div>
        <p>The picture was added successfully.</p>
        <a onClick={forceReload}>Go back to the list</a>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button className='cancelButton' onClick={() => setError(null)}>Retry</button>
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
        <h2>Add new photo</h2>
        <label htmlFor='name'>Name</label>
        <Field id='name' name='name' type='text' placeholder='Hello world' />
        <ErrorMessage name='name' component='small' />
        <label htmlFor='url'>Photo URL</label>
        <Field id='url' name='url' type='text' placeholder='https://images.unsplash.com/photo-1501949997128-2fdb9f6428f1' />
        <ErrorMessage name='url' component='small' />
        <div className='flex justify-end pt-6'>
          <button className='cancelButton' type='button' onClick={handleCancel}>
            Cancel
          </button>
          <button className='submitButton' type='submit'>
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  )
}

const WrappedComponent = withFirebase(AddForm)

export default WrappedComponent
