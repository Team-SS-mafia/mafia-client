import React, { useEffect, useState } from 'react';
import styles from '../../styles/UserList.module.css';
import mafia_reverse from '../../Images/gun_reverse.png'; // LogoReverse
import police_reverse from '../../Images/police_reverse.png'; // LogoReverse
import doctor_reverse from '../../Images/doctor_reverse.png'; // LogoReverse
import Image from 'next/image'; // next/image 패키지 import
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom } from '../utils/Room';

const _userListForm: React.FC = () => {
  const [userList, setUserList] = useState<string[]>([]);
  const socket = getSocket(); 

  useEffect(() => {
    socket.emit('joinGame', getRoom());

    socket.on('joinGame', (users: string[]) => {
      setUserList(users);
      console.log(users);
    });

    socket.on('reloadGame', (user: string) => {
      setUserList(prevUsers => prevUsers.filter(existingUser => existingUser !== user));
    });
  }, []);

  return (
    <div className={`${styles.colMd8} ${styles.colMdOffset2} ${styles.bootstrap} ${styles.snippets} ${styles.bootdeys} ${styles.inbox_msg}`}>
      <div className={`${styles.widgetContainer} ${styles.scrollable} ${styles.list} ${styles.rollodex}`}>
        <div className={styles.heading}>
          <h2>Users</h2>
        </div>
        <div className={styles.widgetContent}>
          <ul>
            {userList.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
        <div className={styles.widgetContent}>
          <h2>My role</h2>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Image src={mafia_reverse} alt="role" width={145} height={160}></Image>
            Mafia
          </div>
        </div>
      </div>
    </div>
  );
};

export default _userListForm;
