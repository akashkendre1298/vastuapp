import React, { useState, useEffect } from 'react'
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonPage
} from '@ionic/react'
import './AddExecutive.css'
import ToolBar from '../../components/ToolBar/ToolBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddExecutive = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { firstName, lastName, email, phoneNumber } = formData

    // Basic validation
    if (!firstName || !lastName || !phoneNumber || !email) {
      toast.error('All fields are required')
      return
    }

    try {
      // Check for duplicate phone number
      const response = await fetch(
        'https://backend.piyushshivkumarshhri.com/api/executives',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()
      const phoneExists = data.some(
        executive => executive.phoneNumber === phoneNumber
      )

      if (phoneExists) {
        toast.error('Phone number already exists')
        return
      }

      // If no duplicates, proceed to add the executive
      const addResponse = await fetch(
        'https://backend.piyushshivkumarshhri.com/api/executives',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )

      if (addResponse.ok) {
        toast.success('Executive added successfully')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          address: '',
          city: '',
          password: ''
        })
      } else {
        toast.error('Failed to add executive')
      }
    } catch (error) {
      toast.error('Failed to add executive')
    }
  }

  useEffect(() => {
    const keyboardDidShow = () => {
      document.body.classList.add('keyboard-open')
    }

    const keyboardDidHide = () => {
      document.body.classList.remove('keyboard-open')
    }

    window.addEventListener('keyboardDidShow', keyboardDidShow)
    window.addEventListener('keyboardDidHide', keyboardDidHide)

    return () => {
      window.removeEventListener('keyboardDidShow', keyboardDidShow)
      window.removeEventListener('keyboardDidHide', keyboardDidHide)
    }
  }, [])

  return (
    <IonPage>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 0'
        }}
      >
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <ToolBar />
      <IonContent className='add-executive' style={{ height: '100vh' }}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCardContent className='add-executive-card-content'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <h1>Add Executive</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div style={{ paddingBottom: '10px' }}>
                    {/* <IonLabel position="stacked">First Name</IonLabel> */}
                  </div>
                  <IonItem className='add-executive-item'>
                    <IonInput
                      placeholder='First Name'
                      className='add-executive-input'
                      name='firstName'
                      value={formData.firstName}
                      onIonChange={handleChange}
                      pattern='[A-Za-z ]*'
                    />
                  </IonItem>

                  <div style={{ paddingBottom: '10px' }}>
                    {/* <IonLabel position="stacked">Last Name</IonLabel> */}
                  </div>
                  <IonItem className='add-executive-item'>
                    <IonInput
                      placeholder='Last Name'
                      className='add-executive-input'
                      name='lastName'
                      value={formData.lastName}
                      onIonChange={handleChange}
                      pattern='[A-Za-z ]*'
                    />
                  </IonItem>

                  <div style={{ paddingBottom: '10px' }}>
                    {/* <IonLabel position="stacked">Email Address</IonLabel> */}
                  </div>
                  <IonItem className='add-executive-item'>
                    <IonInput
                      placeholder='email'
                      type='email'
                      className='add-executive-input'
                      name='email'
                      value={formData.email}
                      onIonChange={handleChange}
                    />
                  </IonItem>
                  <div style={{ paddingBottom: '10px' }}>
                    {/* <IonLabel position="stacked">Contact Number</IonLabel> */}
                  </div>

                  <IonItem className='add-executive-item'>
                    <IonInput
                      placeholder='Contact Number'
                      type='tel'
                      className='add-executive-input'
                      name='phoneNumber'
                      value={formData.phoneNumber}
                      onIonChange={handleChange}
                      pattern='[0-9]{10}'
                      title='Please enter a 10-digit phone number'
                    />
                  </IonItem>

                  <div style={{ paddingBottom: '10px' }}>
                    {/* <IonLabel position="stacked">Location</IonLabel> */}
                  </div>
                  <IonItem className='add-executive-item'>
                    <IonInput
                      placeholder='address'
                      className='add-executive-input'
                      name='address'
                      value={formData.address}
                      onIonChange={handleChange}
                    />
                  </IonItem>

                  <div style={{ paddingBottom: '10px' }}>
                    {/* <IonLabel position="stacked">City</IonLabel> */}
                  </div>

                  <IonItem className='add-executive-item'>
                    <IonInput
                      placeholder='city'
                      className='add-executive-input'
                      name='city'
                      value={formData.city}
                      onIonChange={handleChange}
                      pattern='[A-Za-z ]*'
                    />
                  </IonItem>

                  <div style={{ paddingBottom: '10px' }}>
                    {/* <IonLabel position="stacked">Password</IonLabel> */}
                  </div>
                  <IonItem
                    className='add-executive-item'
                    style={{ marginBottom: '50px' }}
                  >
                    <IonInput
                      placeholder='password'
                      type='password'
                      className='add-executive-input'
                      name='password'
                      value={formData.password}
                      onIonChange={handleChange}
                    />
                  </IonItem>
                </form>
              </IonCardContent>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div
          style={{
            zIndex: 1,
            margin: '0 25px',
            justifyContent: 'center'
          }}
        >
          <button className='add-executive-btn'>Add Executive</button>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default AddExecutive
