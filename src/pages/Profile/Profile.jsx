import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButton,
  IonIcon,
  IonLoading,
  IonText,
  IonAlert
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { pencil, lockClosed, logOut, eye, eyeOff } from 'ionicons/icons' // Import icons for eye and eyeOff
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Profile.css'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [formData, setFormData] = useState({})
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  })
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPasswordVisible: false,
    newPasswordVisible: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [passwordError, setPasswordError] = useState('')
  const history = useHistory()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userData')).userId
        const response = await axios.get(
          `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`
        )
        setUser(response.data)
        setFormData(response.data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching user data')
        setLoading(false)

        setTimeout(() => {
          setError('')
        }, 3000)
      }
    }

    fetchUserData()
  }, [])

  // Handle form changes
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle password change form changes
  const handlePasswordChange = e => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  // Toggle password visibility
  const togglePasswordVisibility = field => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }))
  }

  // Handle form submission for editing profile
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const userId = JSON.parse(localStorage.getItem('userData')).userId
      await axios.patch(
        `https://backend.piyushshivkumarshhri.com/api/admin/${userId}`,
        formData
      )
      setUser(formData)
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Error updating profile')
    }
  }

  const handleChangePassword = async e => {
    e.preventDefault()

    const adminId = JSON.parse(localStorage.getItem('userData')).userId
    const requestData = {
      adminId,
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    }

    try {
      const response = await axios.patch(
        `https://backend.piyushshivkumarshhri.com/api/admin/change-pass`,
        requestData
      )
      if (response.data.message === 'Password successfully changed') {
        toast.success('Password changed successfully!')
        setIsChangingPassword(false)
      } else {
        setPasswordError(
          response.data.message ||
            'Failed to change password. Please try again.'
        )

        setTimeout(() => {
          setPasswordError('')
        }, 3000)
      }
    } catch (err) {
      setPasswordError('Error changing password. Please try again.')

      setTimeout(() => {
        setPasswordError('')
      }, 3000)
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.clear() // Clear local storage
    history.push('/login') // Redirect to login page
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />
  if (error) return <IonText color='danger'>{error}</IonText>

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

      <IonContent style={{ backgroundColor: '#e2dee9' }}>
        <div className='user-profile-container'>
          <div>
            <IonAvatar className='user-avatar'>
              <img src={user.admin_url} alt='Profile' />
            </IonAvatar>
          </div>
          <div className='user-details'>
            <IonLabel className='user-greeting'>
              Hello, {user.firstname} {user.lastname}!
            </IonLabel>
            <p className='user-email'>{user.email}</p>
          </div>
        </div>

        <IonList className='profile-actions'>
          <IonItem button onClick={() => setIsEditing(true)}>
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon icon={pencil} slot='end' />
          </IonItem>
          <IonItem button onClick={() => setIsChangingPassword(true)}>
            <IonLabel>Change Password</IonLabel>
            <IonIcon icon={lockClosed} slot='end' />
          </IonItem>
          <IonItem button color='danger' onClick={handleLogout}>
            <IonLabel>Logout</IonLabel>
            <IonIcon icon={logOut} slot='end' />
          </IonItem>
        </IonList>

        {isEditing && (
          <form onSubmit={handleSubmit} className='profile-form'>
            {/* First Name */}
            <IonItem>
              <IonLabel
                position='stacked'
                style={{ marginBottom: '15px', fontSize: '20px' }}
              >
                First Name
              </IonLabel>
              <input
                style={inputStyles}
                type='text'
                name='firstname'
                value={formData.firstname}
                onChange={handleChange}
              />
            </IonItem>
            {/* Last Name */}
            <IonItem>
              <IonLabel
                position='stacked'
                style={{ marginBottom: '15px', fontSize: '20px' }}
              >
                Last Name
              </IonLabel>
              <input
                style={inputStyles}
                type='text'
                className='ProfileInput'
                name='lastname'
                value={formData.lastname}
                onChange={handleChange}
              />
            </IonItem>
            {/* Email */}
            <IonItem>
              <IonLabel
                position='stacked'
                style={{ marginBottom: '15px', fontSize: '20px' }}
              >
                Email
              </IonLabel>
              <input
                style={inputStyles}
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </IonItem>
            {/* Phone Number */}
            <IonItem>
              <IonLabel
                position='stacked'
                style={{ marginBottom: '15px', fontSize: '20px' }}
              >
                Phone Number
              </IonLabel>
              <input
                style={inputStyles}
                type='text'
                name='phonenumber'
                value={formData.phonenumber}
                onChange={handleChange}
              />
            </IonItem>
            {/* Save Button */}
            <div style={buttonContainerStyles}>
              <button className='save-btn-profile' type='submit'>
                Save
              </button>
            </div>
            {/* Cancel Button */}
            <div style={buttonContainerStyles}>
              <button
                className='changepass-cancel-btn-edit'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {isChangingPassword && (
          <form onSubmit={handleChangePassword} className='password-form'>
            {/* Current Password */}
            <IonItem>
              <IonLabel
                position='stacked'
                style={{ marginBottom: '15px', fontSize: '20px' }}
              >
                Current Password
              </IonLabel>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  style={inputStyles}
                  type={
                    passwordVisibility.currentPasswordVisible
                      ? 'text'
                      : 'password'
                  }
                  name='currentPassword'
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder='Enter your current password'
                />
                <IonIcon
                  icon={
                    passwordVisibility.currentPasswordVisible ? eyeOff : eye
                  }
                  style={iconStyles}
                  onClick={() =>
                    togglePasswordVisibility('currentPasswordVisible')
                  }
                />
              </div>
            </IonItem>
            {/* New Password */}
            <IonItem>
              <IonLabel
                position='stacked'
                style={{ marginBottom: '15px', fontSize: '20px' }}
              >
                New Password
              </IonLabel>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  style={inputStyles}
                  type={
                    passwordVisibility.newPasswordVisible ? 'text' : 'password'
                  }
                  name='newPassword'
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder='Enter your new password'
                />
                <IonIcon
                  icon={passwordVisibility.newPasswordVisible ? eyeOff : eye}
                  style={iconStyles}
                  onClick={() => togglePasswordVisibility('newPasswordVisible')}
                />
              </div>
            </IonItem>

            {/* Save Password Button */}
            <div style={buttonContainerStyles}>
              <button className='changepass-btn' type='submit'>
                Change Password
              </button>
            </div>
            {/* Cancel Password Change */}
            <div style={buttonContainerStyles}>
              <button
                className='changepass-cancel-btn'
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </IonContent>
    </IonPage>
  )
}

const inputStyles = {
  border: 'none',
  borderRadius: '10px',
  padding: '8px',
  fontSize: '16px',
  width: '100%',
  backgroundColor: 'white',
  height: '45px'
}

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px'
}

const iconStyles = {
  position: 'absolute',
  top: '50%',
  right: '10px',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  fontSize: '24px'
}

export default ProfilePage
