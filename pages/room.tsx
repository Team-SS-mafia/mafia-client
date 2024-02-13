import React, { useEffect, useState } from 'react';
import styles from '../styles/Room.module.css'; // CSS 모듈 import
import _logo from './components/logo';
import _roomForm from './components/roomForm';

const RoomForm: React.FC = () => {
  // TODO >> 서버와 동기화 및 유저 요소 리로드
  return (
    <div>
      <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
        <_logo/>
        <_roomForm/>
    </div>
  </div>
  );
};

export default RoomForm;