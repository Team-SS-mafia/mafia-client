import React, { useState } from 'react';
import styles from '../../styles/User.module.css'; // CSS 모듈 import
import { useRouter } from 'next/router';
import { CreateUserDto } from '../dto/create-user.dto';

const _createForm: React.FC = () => {
  const router = useRouter();
  const [errAlert, setErrAlert] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 기본 동작 방지
    const formData = new FormData(event.currentTarget);
    const newUser = new CreateUserDto();
    
    const pw = formData.get('userPassword') as string;
    const repw = formData.get('userRePassword') as string;

    if (pw === repw){
      newUser.userName = formData.get('userId') as string;
      newUser.userPassword = formData.get('userPassword') as string;
      newUser.userNickname = formData.get('userName') as string;
      newUser.userEmail = formData.get('userEmail') as string;
    }
    else{
      setErrAlert('비밀번호가 일치하지 않습니다.');
      return 0;
    }

    if(newUser.userName !== "" && newUser.userPassword !== "" && newUser.userNickname !== "" && newUser.userEmail !== "" ){
      try {
        // 서버로 데이터를 전송하여 로그인 처리
        const response = await fetch('http://localhost:3002/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });
        console.log(newUser);
        console.log(response.status);
        if (response.status == 200) {
          router.push('../login');
        } 
        else{
          // 응답이 실패하면 오류 처리
          console.error('로그인 실패:', response.statusText);
        }
      } catch (error) {
        // 오류 처리
        console.error('로그인 중 오류 발생:', error);
      }
    }
    else{
      setErrAlert('빈칸이 존재합니다.');
      return 0;
    }
  };

  return (
    <div className={[styles.login_wrapper, styles.noDrag].join(" ")}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userId" placeholder="ID" className={styles.login_wrapper_input}/>
        <input type="password" name="userPassword" placeholder="PASSWORD" className={styles.login_wrapper_input}/>
        <input type="password" name="userRePassword" placeholder="RETYPE PASSWORD" className={styles.login_wrapper_input}/>
        <input type="text" name="userName" placeholder="NICKNAME" className={styles.login_wrapper_input}/>
        <input type="text" name="userEmail" placeholder="EMAIL" className={styles.login_wrapper_input}/>
        <input type="submit" value="회원가입" className={styles.login_form_button}/>
        {errAlert && <h3 style={{ textAlign: 'right', color: 'red' }}>{errAlert}</h3>}
      </form>
    </div>
  );
};
export default _createForm;