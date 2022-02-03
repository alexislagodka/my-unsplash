import React, { useState } from 'react'
import styles from './Form.module.scss'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Loader from '../Loader/Loader'
import { useRouter } from 'next/router'
import db from '../../utils/firebase'
import { update, push, child, ref } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function AddForm ({ handleCancel }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState(null)

  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })

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

  const addPicture = async picture => {
    const newPictureKey = push(child(ref(db), 'pictures')).key
    const updates = {}
    updates['/pictures/' + newPictureKey] = picture
    update(ref(db), updates).then(() => setLoading(false))
    setLoading(false)
    setSuccess(true)
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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form className={styles.form}>
        <h2>Add new photo</h2>
        <label htmlFor='name'>Name</label>
        <Field id='name' name='name' type='text' placeholder='Hello world' />
        <ErrorMessage name='name' component='small' className={styles.errorMessage} />
        <label htmlFor='url'>Photo URL</label>
        <Field id='url' name='url' type='text' placeholder='https://images.unsplash.com/photo-1501949997128-2fdb9f6428f1' />
        <ErrorMessage name='url' component='small' className={styles.errorMessage} />
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} type='button' onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.submitButton} type='submit'>
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  )
}
