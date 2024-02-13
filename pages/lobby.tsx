import React, { useState } from 'react';
import styles from '../styles/Room.module.css'; // CSS 모듈 import
import _logo from './components/logo';
import _lobbyForm from './components/lobby';
import _roomForm from './components/roomForm';

const LobbyForm: React.FC = () => {
  // 상태(State) 정의
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  // 다른 컴포넌트를 렌더링하는 함수
  const renderOtherComponent = () => {
    if (showOtherComponent) {
      return <_roomForm/>;
    } else {
      return null; // 다른 컴포넌트를 렌더링하지 않음
    }
  };
  
  // TODO >> 방 리스트 서버 / 클라 통신으로 업데이트 필요
  return (
    <div>
      <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
        <_logo/>
        <_lobbyForm/>
      </div>
    </div>
  );
};

export default LobbyForm;