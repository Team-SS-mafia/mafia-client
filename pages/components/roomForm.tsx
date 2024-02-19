import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; // Socket.ts 파일에서 getSocket 함수를 import

// TODO 

const _roomForm: React.FC <{ showOtherComponent: boolean; setShowOtherComponent: React.Dispatch<React.SetStateAction<boolean>> }> 
= ({ showOtherComponent, setShowOtherComponent }) => {
  const router = useRouter();
  const socket = getSocket(); 

  // 게임 시작 핸들러
  const gameStart = () => {
    router.push('../game');
    console.log("게임 시작");
 };
   
 // 게임 나가기 핸들러
  const gameQuit = () => {
    setShowOtherComponent(false);
    router.push('../lobby');
    console.log("게임 나가기");
    socket.emit('quitRoom', getRoom());
 };
  
  // 클라이언트 방 변화를 감지하는 핸들러
  useEffect(() => {
    socket.on('changeRoom', (roomId: number) => {
      setRoom(roomId);
      console.log(getRoom(),' << roomnumber');

      if (roomId !== 0){
        setShowOtherComponent(true);
        console.log('너는?');
      }
      else if(roomId === 0){
        setShowOtherComponent(false);
        router.push('../lobby');
        console.log('받았니?');
      }
    });
    return () => {
      socket.off('changeRoom');
    };
  }, []);

  return (
    <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")}>
      <Table striped bordered hover width={'600px'}>
          <thead>
            <div className={styles.lobby_wrapper}>
              <h2>{getRoom()}번방 (8/8)</h2>
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
        <br></br>
      </Table>
      <div>
        <button className={styles.lobby_form_button} onClick={gameStart} style={{margin:'10px'}}>게임 시작</button>
        <button className={styles.lobby_form_button} onClick={gameQuit} style={{margin:'10px'}}>나가기</button>
      </div>
    </div>
  );
};
export default _roomForm;