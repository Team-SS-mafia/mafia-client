import React, { useEffect, useState } from 'react';
import styles from '../styles/Game.module.css'; // CSS 모듈 import
import _logo from './components/logo';
import _gameForm from './components/gameForm';

const GameForm: React.FC = () => {
  return (
    <div>
      <div className={[styles.game_wrapper, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
        <_logo/>
        <_gameForm/>        
      </div>
    </div>
  );
};

export default GameForm;