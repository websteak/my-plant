// 2022.10.04 - 기본 구조 작업

import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { authService } from '../../service/fbase';
import Button from '../UI/Button/Button';
import classes from './AuthNavigation.module.css';

const AuthNavigation = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 김동현 2022.10.05 - 이메일, 비밀번호 state에 저장
  const onChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };
  // 김동현 2022.10.05 - 로그인 기능
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
    } catch (error) {
      console.log(error.code);
    }
  };
  // 김동현 2022.10.05 - 게스트 로그인 기능
  const handleGuestButton = async () => {
    const user = await signInAnonymously(authService);
  };
  // 김동현 2022.10.05 - 구글 로그인 기능
  const handleGoogleLoginButton = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider);
  };
  return (
    <div className={classes.container}>
      <div className={classes.logoArea}>
        <img className={classes.logo} src='/image/logo.png' alt='logo' />
      </div>
      <div className={classes.authArea}>
        <form className={classes.authForm} onSubmit={onSubmit}>
          <input
            name='email'
            type='email'
            required
            placeholder='EMAIL'
            onChange={onChange}
          />
          <input
            name='password'
            type='password'
            required
            placeholder='PASSWORD'
            onChange={onChange}
          />
          <Button className={classes.loginBtn}>로그인</Button>
        </form>
      </div>
      <div className={classes.signUpArea}>
        <span>회원가입</span>
      </div>
      <div className={classes.externalLoginArea}>
        <Button
          className={classes.externalLogin}
          onClick={handleGoogleLoginButton}
        >
          <img src='/image/google.png' alt='google 로그인' />
          구글로 로그인
        </Button>
        <Button className={classes.externalLogin} onClick={handleGuestButton}>
          게스트 로그인
        </Button>
      </div>
    </div>
  );
};

export default AuthNavigation;
