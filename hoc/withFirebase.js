import React, { Component } from 'react'
// firebase
import db from '../utils/firebase'
import {
  ref,
  push,
  child,
  update
} from 'firebase/database'
import { 
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'


const withFirebase = (WrappedComponent) =>
  class HOC extends Component {
    constructor (props) {
      super(props)
      this.state = {
        pictures: {},
        user: null,
        auth: null
      }
    }

    componentDidMount () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.setState({ auth })
        if (user) {
          this.setState({ user })
        } else {
          this.setState({ user: null })
        }
      })
    }
    
    // Picture service
    addPicture = picture => {
      console.log(picture)
      const newPictureKey = push(child(ref(db), 'pictures')).key
      const updates = {}
      updates['/pictures/' + newPictureKey] = picture
      update(ref(db), updates)
    }

    deletePicture = id => {
      const updates = {}
      updates['/pictures/' + id] = null
      update(ref(db), updates)
    }


    render () {
      return <WrappedComponent 
        auth={this.state.auth}
        user={this.state.user} 
        addPicture={this.addPicture}
        deletePicture={this.deletePicture}

        {...this.props} />
    }
  }

export default withFirebase
