import React, { useEffect, useState } from 'react';
import styles from '../../styles/Chat.module.css'; // CSS 모듈 import
import { io, Socket } from "socket.io-client";

export let socket: Socket;

const _chatForm: React.FC = () => {
  if (socket == null)
  {
    socket = io("http://localhost:3001", { transports: ["websocket"] });
  }

  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  function handleSendClick() {
    if (message.trim() != ''){
      socket.emit('message', message);
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on('message', (data: string) => {
      setReceivedMessage(data);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  // TODO
  // 1. 데이터 받을 때마다 p 없데이트 하는거
  // 2. div incoming msg에 스크롤
  // @. DATE TO NICKNAME
  // @. 채널 분류 및 소켓 분류
  return (
    <div className={styles.messaging}>
      <div className={styles.inbox_msg}>
        <div className={styles.mesgs}>
          <div className={styles.msg_history}>
            {/* Message history items */}
            {/* Example of incoming message */}
            <div className={styles.incoming_msg}>
              <div className={styles.received_msg}>
                <div className={styles.received_withd_msg}>
                  <p>{receivedMessage}</p> {/* 서버로부터 받은 메시지 출력 */}
                  <span className={styles.time_date}> TODO : date to nickname change </span>
                </div>
              </div>
            </div>
            {/* End of message history items */}
          </div>
          <div className={styles.type_msg}>
            <div className={styles.input_msg_write}>
              <input type="text" className={styles.write_msg} placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
              <button className={styles.msg_send_btn} type="button" onClick={handleSendClick}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default _chatForm;
