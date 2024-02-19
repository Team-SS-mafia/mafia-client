import React from 'react';
import styles from '../../styles/UserList.module.css';
import mafia_reverse from '../../Images/gun_reverse.png'; // LogoReverse
import police_reverse from '../../Images/police_reverse.png'; // LogoReverse
import doctor_reverse from '../../Images/doctor_reverse.png'; // LogoReverse
import Image from 'next/image'; // next/image 패키지 import

const _userListForm: React.FC = () => {
  return (
    <div className={`${styles.colMd8} ${styles.colMdOffset2} ${styles.bootstrap} ${styles.snippets} ${styles.bootdeys} ${styles.inbox_msg}`}>
      <div className={`${styles.widgetContainer} ${styles.scrollable} ${styles.list} ${styles.rollodex}`}>
        <div className={styles.heading}>
          <h2>Users</h2>
        </div>
        <div className={styles.widgetContent}>
          <ul>
            <li>
              Joan Andrews
            </li>
            <li>
              Jose Anderson
            </li>
            <li>
              Phil Aaron
            </li>
            <li>
              Samatha Brown
            </li>
            <li>
              Chris Baker
            </li>
            <li>
              Kristin Blues
            </li>
            <li>
              Adam Carter
            </li>
            <li>
              Greg Campbell
            </li>
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
