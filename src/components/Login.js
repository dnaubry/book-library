import React from 'react';
import PropTypes from 'prop-types';
import googleSignInImage from '../images/btn_google_signin_light_normal_web@2x.png';

function Login (props) {
  return (
    <div className='login'>
      <p>Please sign in to use the library.</p>
      <button
        className='btn-white'
        onClick={props.signInGoogle}>
        <img 
          src={googleSignInImage}
          alt='Sign in with Google'
          width={175} />
      </button>
       <button
        className='btn-black sign-in-btn'
        onClick={props.signInAnonymously}>
          Sign in Anonymously
      </button>
    </div>
  )
}

Login.propTypes = {
  signInAnonymously: PropTypes.func.isRequired
}

export default Login;