import React, { useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import _roomForm from './roomForm';

const _lobby: React.FC = () => {
  // 방 클릭 핸들러
  const roomClick = () =>{
    // TODO >> IF 방 입장에 문제가 없다면
    setShowOtherComponent(true);
    
    console.log("방 클릭");
  }

  // 방 생성 핸들러
  const createRoom = () =>{
    // TODO >> IF 방 생성에 문제가 없다면
    // setShowOtherComponent(true);

    console.log("방 생성");
  }

  // 상태(State) 정의
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  // 다른 컴포넌트를 렌더링하는 함수
  const renderOtherComponent = () => {
    if (showOtherComponent) {
      return <_roomForm showOtherComponent={showOtherComponent} setShowOtherComponent={setShowOtherComponent}/>;
    } else {
      return null; // 다른 컴포넌트를 렌더링하지 않음
    }
  };

  return (
    <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")}>
      {renderOtherComponent()}
      {!showOtherComponent && (
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
              <tr onClick={roomClick}>
                <th>1</th>
                <th>a</th>
                <th>1/8</th>
              </tr>
              <tr>
                <th>2</th>
                <th>b</th>
                <th>1/8</th>
              </tr>
              <tr>
                <th>3</th>
                <th>c</th>
                <th>1/8</th>
              </tr>
            </tbody>
          </Table>
          <button className={styles.lobby_form_button} onClick={createRoom}>방 만들기</button>
        </div>
      )}
    </div>
  );
};
export default _lobby;