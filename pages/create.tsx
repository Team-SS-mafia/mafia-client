import React, { useState } from 'react';
import styles from '../styles/User.module.css'; // CSS 모듈 import
import Image from 'next/image'; // next/image 패키지 import
import Logo from '../Images/mafia.jpg'; // Logo
import Logo_reverse from '../Images/mafia_reverse.jpg'; // LogoReverse

const CreateForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 기본 동작 방지
    const formData = new FormData(event.currentTarget);
    const userId = formData.get('userID') as string;
    const userPassword = formData.get('userPassword') as string;
    const userRePassword = formData.get('userRePassword') as string;
    const userName = formData.get('userName') as string;
    const userEmail = formData.get('userEmail') as string;
    
    // 서버로 데이터 전송 및 로그인 처리
    console.log('아이디:', userId);
    console.log('비밀번호:', userPassword);
    console.log('비밀번호 재입력:', userRePassword);
    console.log('이름:', userName);
    console.log('이메일:', userEmail);
  };

  // 이미지 상태 관리
  const [isHovered, setIsHovered] = useState(false);

  // 로고 오버 핸들러
  const handleMouseOver = () => {
     setIsHovered(true);
  };
 
  // 로고 리브 핸들러
  const handleMouseLeave = () => {
     setIsHovered(false);
  };

  return (
    <div className={[styles.login_wrapper, styles.noDrag].join(" ")}>
        <a href="http://localhost:3000/">
          <Image  src={isHovered ? Logo : Logo_reverse} alt="Logo"
            width={180} height={200} style={{margin: '40px'}}
            onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
          </Image>
        </a>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userId" placeholder="ID" className={styles.login_wrapper_input}/>
        <input type="password" name="userPassword" placeholder="PASSWORD" className={styles.login_wrapper_input}/>
        <input type="password" name="userRePassword" placeholder="RETYPE PASSWORD" className={styles.login_wrapper_input}/>
        <input type="text" name="userName" placeholder="NICKNAME" className={styles.login_wrapper_input}/>
        <input type="text" name="userEmail" placeholder="EMAIL" className={styles.login_wrapper_input}/>
        <input type="submit" value="회원가입" className={styles.login_form_button}/>
      </form>
    </div>
  );
};

export default CreateForm;