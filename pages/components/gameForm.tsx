import React, { useEffect, useState } from 'react';
import styles from '../../styles/Game.module.css'; // CSS 모듈 import
import { useRouter } from 'next/router';

const _gameForm: React.FC = () => {
  const router = useRouter();

  // 게임 나가기 핸들러
  const gameQuit = () => {
    router.push('../lobby');
    console.log("게임 나가기");
 };

  // 방 참가자 리로드 요소
  // 변화가 있으면? useEffect에서? 동작을 정의한다?
  var userName = "";
  
  useEffect(() => {
    console.log("실행할 내용, 아래 []로 변수가 들어감.");
  }, [userName]);

  // TODO >> 서버와 동기화 및 게임 진행 상황, 유저 요소 리로드
  // 유저 목록, 나가기 버튼, 채팅창, 내 직업 표시, + @

  return (
    <div className={[styles.game_wrapper, styles.noDrag].join(" ")}>
      <button className={styles.game_form_button} onClick={gameQuit}>나가기</button>
    </div>
  );
};
export default _gameForm;