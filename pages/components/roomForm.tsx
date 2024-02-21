import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; 

const _roomForm: React.FC = () => {
  const router = useRouter();
  const socket = getSocket(); 


  // 게임 시작 핸들러
  const gameStart = () => {
    router.push('../game');
 };
   
 // 게임 나가기 핸들러
  const gameQuit = async () => {
    socket.emit('quitRoom', getRoom());
    setRoom(0);
    await router.push('../lobby');
 };

 // html 매칭 에러
 // 렌더링 후 상태 업데이트하는 방식
  const [mounted, setMounted] = useState<boolean>(false);

  const [userList, setUserList] = useState<string[]>([]);

  const [userCount, setUserCount] = useState<number>();

  useEffect(() => {
    setMounted(true);
    console.log(getRoom());
    
    // 들어가자마자 reload socket 통신
    // TODO
    socket.emit('joinUser', getRoom());

    // joinUser로 받아온 것을 user list 갱신
    socket.on('setUsers', (users: string[], count: number) => {
      setUserList(users);
      setUserCount(count);
    });

    // 이후에 user list 갱신
    socket.on('reloadUser', (func: string, user: string, roomId: number, count: number) => {
      if (func === 'join' && roomId === getRoom()){
        setUserList(prevUsers => [...prevUsers, user]);
        setUserCount(count);
      }
      else if (func === 'quit' && roomId === getRoom()){
        setUserList(prevUsers => prevUsers.filter(existingUser => existingUser !== user));
        setUserCount(count);
      }
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
              <h2>{getRoom()}번방 ({userCount}/8)</h2>
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