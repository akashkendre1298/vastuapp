import React, { useState, useEffect } from 'react'
import './Login.css'
import {
  IonPage,
  IonImg,
  IonButton,
  IonLabel,
  IonItem,
  IonIcon
} from '@ionic/react'
import { eye, eyeOff } from 'ionicons/icons' // Import icons for eye and eyeOff
import logo from '../../Assets/pandit_shivkumar_logo.png'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false) // State for password visibility
  const history = useHistory()

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('userData')
    if (userData) {
      // Redirect to home page if user is logged in
      history.push('/bottomtabs/home')
    }
  }, [history])

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error('Both email and password are required.')
      return
    }

    const userData = {
      email,
      password
    }

    try {
      const response = await fetch(
        'https://backend.piyushshivkumarshhri.com/api/admin/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
      )

      if (response.ok) {
        // console.log("User logged in successfully");
        const responseData = await response.json()
        // Save user data in local storage
        localStorage.setItem('userData', JSON.stringify(responseData))
        // Store the email separately in local storage
        localStorage.setItem('userEmail', email)
        // Redirect the user to the dashboard or home page
        history.push('/bottomtabs/home')
      } else {
        toast.error('Invalid email or password. Please try again.')
      }
    } catch (error) {
      toast.error('Network error. Please check your internet connection.')
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className='login-page'>
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

      <div className='login-container'>
        <div className='login-logo-div'>
          <IonImg src={logo} className='login-logo' />
        </div>
        <div className='login-title'>
          <p>Login</p>
          <p className='para-after-login-title'>Please sign in to continue</p>
        </div>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            placeholder='Enter your email address'
            onChange={e => setEmail(e.target.value)}
            className='login-input'
          />
        </div>
        <div className='form-group'>
          <div style={{ position: 'relative' }}>
            <input
              type={passwordVisible ? 'text' : 'password'} // Toggle between text and password types
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='login-input'
            />
            <IonIcon
              icon={passwordVisible ? eyeOff : eye}
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: 'black',
                fontSize: '24px'
              }}
            />
          </div>
        </div>
        <a
          className='forgot-password'
          onClick={() => history.push('/forgot-password')}
        >
          Forgot Password?
        </a>
        <button onClick={handleSubmit} className='login-button'>
          Login
        </button>
        <p className='signup-link'>
          Don't have an account? <a href='/signup'>Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
