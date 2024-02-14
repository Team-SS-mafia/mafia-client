import React from 'react';
import styles from '../../styles/Chat.module.css'; // CSS 모듈 import

const _chatForm: React.FC = () => {
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
                  <p>Test which is a new approach to have all solutions</p>
                  <span className={styles.time_date}> TODO : date to nickname change </span>
                </div>
              </div>
            </div>
            {/* End of message history items */}
          </div>
          <div className={styles.type_msg}>
            <div className={styles.input_msg_write}>
              <input type="text" className={styles.write_msg} placeholder="Type a message" />
              <button className={styles.msg_send_btn} type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default _chatForm;
