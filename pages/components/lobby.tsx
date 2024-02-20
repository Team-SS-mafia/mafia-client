import React, { useState, useEffect } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import _roomForm from './roomForm';
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; 

const _lobby: React.FC = () => {
  
  // router
  const router = useRouter();

  // Socket 가져오는 함수 사용
  const socket = getSocket(); 
  
  // 상태(State) 정의
  const [roomList, setRoomList] = useState([{id:0, owner:"", members:""}]);

  // 방 클릭 핸들러
  const roomClick = (roomId: number) =>{
    socket.emit('joinRoom', roomId);
  }

  // 방 생성 핸들러
  const createRoom = () =>{
    socket.emit('createRoom');
    console.log("방 생성");
    console.log(getRoom());
    // router.push('../room');
  }

  useEffect(() => {
    // 컴포넌트가 마운트될 때 소켓 통신을 보냄
    socket.emit('joinLobby');

    // 클라이언트 방 변화를 감지하는 핸들러
    socket.on('changeRoom', (roomId: number) => {
      setRoom(roomId);
      console.log(getRoom(),' << roomnumber');
      // if (roomId !== 0){
      //   console.log('너는?');
      //   router.push('../room');
      // }
      // else if(roomId === 0){
      //   console.log('받았니?');
      //   router.push('../lobby');
      // }
    });
  
    // 로비 방 변화를 감지하는 핸들러
    socket.on('reloadRoom', (roomId: number, func: string, admin: string) => {
      if (func === "delete") {
        // 삭제된 방의 roomId를 사용하여 해당 방을 roomList에서 제거
        setRoomList(prevRoomList => prevRoomList.filter(room => room.id !== roomId));
      } 
      else if (func === "insert") {
        // 새로 생성된 방의 roomId를 사용하여 해당 방을 roomList에 추가
        const newRoom = { id: roomId, owner: admin, members: '0/8' }; // 새로운 방의 기본 정보 설정
        setRoomList(prevRoomList => [...prevRoomList, newRoom]);
      }
    });
  
    // 방 입장 감지하는 핸들러
    socket.on('SuccessJoinRoom', (roomId: number) => {
      setRoom(roomId);
      console.log(roomId);
      router.push('../room');
    });
  
    socket.on('serverMessage', (msg: any) =>{
      console.log(msg);
    });
  
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      socket.off('changeRoom');
      socket.off('reloadRoom');
      socket.off('SuccessJoinRoom');
      socket.off('joinLobby');
      socket.off('serverMessage');
    };
  }, []);

  return (
    <div className={[styles.lobby_wrapper, styles.noDrag, styles.inbox_msg].join(" ")}>
      <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")}>
        <Table width={'600px'}>
          <thead>
            <tr>
                <th>번호</th>
                <th>주인장</th>
                <th>인원</th>
            </tr>
          </thead>
          <tbody>
            {roomList.map(room => (
              room.id !== 0 && (
                <tr key={room.id} onClick={() => roomClick(room.id)}>
                  <th>{room.id}</th>
                  <th>{room.owner}</th>
                  <th>{room.members}</th>
                </tr>
              )
            ))}
          </tbody>
        </Table>
        <button className={styles.lobby_form_button} onClick={createRoom}>방 만들기</button>
        </div>
    </div>
  );
};
export default _lobby;