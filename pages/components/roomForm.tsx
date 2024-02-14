import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';


const _roomForm: React.FC <{ showOtherComponent: boolean; setShowOtherComponent: React.Dispatch<React.SetStateAction<boolean>> }> 
= ({ showOtherComponent, setShowOtherComponent }) => {
  const router = useRouter();

  // 게임 시작 핸들러
  const gameStart = () => {
    router.push('../game')
    console.log("게임 시작");
 };
   
 // 게임 나가기 핸들러
  const gameQuit = () => {
    setShowOtherComponent(false);
    router.push('../lobby')
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
            <div className={styles.lobby_wrapper}>
              <tr>
                  <h2>Users (8/8)</h2>
              </tr>
            </div>
          </thead>
          <tbody>
            <tr>
              <th>Joan Andrews</th>
            </tr>
            <tr>
              <th>Jose Anderson</th>
            </tr>
            <tr>
              <th>Phil Aaron</th>
            </tr>
            <tr>
              <th>Samatha Brown</th>
            </tr>
            <tr>
              <th>Chris Baker</th>
            </tr>
            <tr>
              <th>Kristin Blues</th>
            </tr>
            <tr>
              <th>Adam Carter</th>
            </tr>
            <tr>
              <th>Greg Campbell</th>
            </tr>
        </tbody>
      </Table>
      <div>
        <button className={styles.lobby_form_button} onClick={gameStart} style={{margin:'10px'}}>게임 시작</button>
        <button className={styles.lobby_form_button} onClick={gameQuit} style={{margin:'10px'}}>나가기</button>
      </div>
    </div>
  );
};
export default _roomForm;