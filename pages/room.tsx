import React, { useEffect, useState } from 'react';
import styles from '../styles/Room.module.css'; // CSS 모듈 import
import Image from 'next/image'; // next/image 패키지 import
import Logo from '../Images/mafia.jpg'; // Logo
import Logo_reverse from '../Images/mafia_reverse.jpg'; // LogoReverse
import Table from "react-bootstrap/Table";

const RoomForm: React.FC = () => {

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

  // 게임 시작 핸들러
  const gameStart = () => {
    window.location.href="http://localhost:3000/game";
    console.log("게임 시작");
 };
   
 // 게임 나가기 핸들러
  const gameQuit = () => {
    window.location.href="http://localhost:3000/lobby";
    console.log("게임 나가기");
 };

  // 방 참가자 리로드 요소
  // 변화가 있으면? useEffect에서? 동작을 정의한다?
  var userName = "";
  
  useEffect(() => {
    console.log("실행할 내용, 아래 []로 변수가 들어감.");
  }, [userName]);

  // TODO >> 서버와 동기화 및 유저 요소 리로드
  return (
    <div>
      <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")}>
        <a href="http://localhost:3000/">
          <Image  src={isHovered ? Logo : Logo_reverse} alt="Logo"
            width={180} height={200} style={{margin: '40px'}}
            onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
          </Image>
        </a>
        <Table striped bordered hover width={'600px'}>
          <thead>
            <tr>
                <th>참가자 (6/8)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>a</th>
            </tr>
            <tr>
              <th>b</th>
            </tr>
            <tr>
              <th>c</th>
            </tr>
            <tr>
              <th>d</th>
            </tr>
            <tr>
              <th>e</th>
            </tr>
            <tr>
              <th>f</th>
            </tr>
          </tbody>
        </Table>
        <button className={styles.lobby_form_button} onClick={gameStart}>게임 시작</button>
        <button className={styles.lobby_form_button} onClick={gameQuit}>나가기</button>
      </div>
    </div>
    
    
    
  );
};

export default RoomForm;