import React, { useState } from 'react';
import styles from '../styles/Room.module.css'; // CSS 모듈 import
import Image from 'next/image'; // next/image 패키지 import
import Logo from '../Images/mafia.jpg'; // Logo
import Logo_reverse from '../Images/mafia_reverse.jpg'; // LogoReverse
import Table from "react-bootstrap/Table";

const LobbyForm: React.FC = () => {

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

  // 방 클릭 핸들러
  const roomClick = () =>{
    window.location.href="http://localhost:3000/room";
    console.log("방 클릭");
  }

  // 방 생성 핸들러
  const createRoom = () =>{
    console.log("방 생성");
  }

  // TODO >> 방 리스트 서버 / 클라 통신으로 업데이트 필요
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
                <th>번호</th>
                <th>주인장</th>
                <th>인원</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={roomClick}>
              <th>1</th>
              <th>a</th>
              <th>1/8</th>
            </tr>
            <tr>
              <th>2</th>
              <th>b</th>
              <th>1/8</th>
            </tr>
            <tr>
              <th>3</th>
              <th>c</th>
              <th>1/8</th>
            </tr>
          </tbody>
        </Table>
        <button className={styles.lobby_form_button} onClick={createRoom}>방 만들기</button>
      </div>
    </div>
  );
};

export default LobbyForm;