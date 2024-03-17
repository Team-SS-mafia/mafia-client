import React, { useState, useEffect } from 'react';
import styles from '../../styles/User.module.css'; // CSS 모듈 import
import _createForm from './createForm';
import { useRouter } from 'next/router';

const _loginForm: React.FC = () => {
  const router = useRouter();
  const [errAlert, setErrAlert] = useState<string>('');

  // TODO 최초 접속 시 jwt 토큰이 없을 경우 login page, 아닐 경우 lobby redirect
  // 페이지 로드 시 실행되는 useEffect 훅
  useEffect(() => {
    // localStorage에서 accessToken 가져오기
    const accessToken = localStorage.getItem('accessToken');
    // accessToken이 있을 경우 로비 페이지로 리다이렉트
    if (accessToken) {
      router.push('../lobby');
    }
  }, []); // 빈 배열을 전달하여 페이지 로드 시 한 번만 실행되도록 함

  // 회원가입 
  const createuser = () => {
    router.push('../create')
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 기본 동작 방지
    const formData = new FormData(event.currentTarget);
    const userName = formData.get('userName') as string;
    const userPassword = formData.get('userPassword') as string;

    // TODO
    const rememberCheck = formData.get('rememberCheck') === 'on';

    if (userName !== "" && userPassword !== ""){
      try {
        // 서버로 데이터를 전송하여 로그인 처리
        const response = await fetch('http://localhost:3002/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userName, userPassword })
        });

        if (response.status == 200) {
          // 응답이 성공한 경우
          const data = await response.json();
          const accessToken = data.access_token;

          // localStorage에 JWT 토큰 저장
          localStorage.setItem('accessToken', accessToken);
          router.push('../lobby');
        } 
        else{
          // 응답이 실패하면 오류 처리
          console.error('로그인 실패:', response.statusText);
          setErrAlert('로그인 실패하였습니다.');
        }
      } catch (error) {
        // 오류 처리
        console.error('로그인 중 오류 발생:', error);
        setErrAlert('로그인 실패하였습니다.');
      }
    }
  };

  return (
    <div className={[styles.login_wrapper, styles.noDrag].join(" ")}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="ID" className={styles.login_wrapper_input}/>
        <input type="password" name="userPassword" placeholder="PASSWORD" className={styles.login_wrapper_input}/>
        <label htmlFor="rememberCheck">
          <input type="checkbox" id="rememberCheck" name="rememberCheck" /> 아이디 저장하기
        </label>
        <input type="submit" value="로그인" className={styles.login_form_button}/>
      </form>
        <button className={styles.login_form_button} onClick={createuser}>회원가입</button>
        {errAlert && <h3 id="alert" style={{ textAlign: 'right', color: 'red' }}>{errAlert}</h3>}
    </div>
  );
};
export default _loginForm;