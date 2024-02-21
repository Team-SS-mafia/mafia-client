import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; 

const _roomForm: React.FC = () => {
  const router = useRouter();
  const socket = getSocket(); 

  console.log(getRoom());

  // 게임 시작 핸들러
  const gameStart = () => {
    router.push('../game');
    console.log("게임 시작");
 };
   
 // 게임 나가기 핸들러
  const gameQuit = async () => {
    console.log("게임 나가기");
    socket.emit('quitRoom', getRoom());
    setRoom(0);
    await router.push('../lobby');
 };


 // html 매칭 에러
 // 렌더링 후 상태 업데이트하는 방식
  const [mounted, setMounted] = useState<boolean>(false);

  const [userList, setUserList] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // 들어가자마자 실행될 reload
    // TODO
    socket.emit('joinUser', getRoom());

    // 이후에 user list 갱신
    socket.on('setUsers', (users: string[]) => {
      setUserList(users);
    });

    // 이후에 user list 갱신
    socket.on('reloadUser', (users: string) => {
      // TODO
    });

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      socket.off('reloadUser');
    };
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
            {userList.map((user, index) => (
              <tr key={index}>
                <th>{user}</th>
              </tr>
            ))}
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