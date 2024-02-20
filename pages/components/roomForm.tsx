import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; 

// TODO 

const _roomForm: React.FC = () => {
  const router = useRouter();
  const socket = getSocket(); 

  // 게임 시작 핸들러
  const gameStart = () => {
    router.push('../game');
    console.log("게임 시작");
 };
   
 // 게임 나가기 핸들러
  const gameQuit = () => {
    router.push('../lobby');
    console.log("게임 나가기");
    socket.emit('quitRoom', getRoom());
    setRoom(0);
    console.log(getRoom());
 };

 // html 매칭 에러
 // 렌더링 후 상태 업데이트하는 방식
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted &&(
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
  ));
};
export default _roomForm;