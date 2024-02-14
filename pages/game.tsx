import React, { useEffect, useState } from 'react';
import styles from '../styles/Game.module.css'; // CSS 모듈 import
import _logo from './components/logo';
import _gameForm from './components/gameForm';
import _chatForm from './components/chatForm';

// TODO >> 서버와 동기화 및 게임 진행 상황, 유저 요소 리로드
// 유저 목록, 나가기 버튼, 채팅창, 내 직업 표시, + @
// 게임 시작시 service 메시지 ex) 게임이 시작됐습니다.
// 아침입니다, 밤입니다, 마피아가 활동할 시간입니다. 등등 표시되도록 해야함.
// 어떻게? server side socket 통신을 통해 recv, send 과정을 통해서 진행

  const GameForm: React.FC = () => {
  return (
    <div>
      <div className={[styles.game_wrapper, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
        <_logo/>
        <_chatForm/>
        <_gameForm/>        
      </div>
    </div>
  );
};

export default GameForm;