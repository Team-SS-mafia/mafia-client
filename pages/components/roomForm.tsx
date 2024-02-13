import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';

const _roomForm: React.FC = () => {
  const router = useRouter();

  // 게임 시작 핸들러
  const gameStart = () => {
    router.push('../game')
    // window.location.href="http://localhost:3000/game";
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

  return (
    <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")}>
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
  );
};
export default _roomForm;