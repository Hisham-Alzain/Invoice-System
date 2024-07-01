import React, { useEffect, useState } from 'react';
import { useContext,useRef } from 'react';
import styles from './css/ProfilePage.module.css';
import { LoginContext } from '../App';
import { FetchUserData } from '../apis/api';
import NavBar from './NavBar';

const ProfilePage = () => {
    const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
    useContext(LoginContext);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const initialized = useRef(false);
    useEffect(() => {
        if (!initialized.current) {
          initialized.current = true;
    
          if (loggedIn) {
            FetchUserData(accessToken).then((response) => {
              if (response.status === 200) {
                setEmail(response.data.user.email);
                setName(response.data.user.name);
              } else {
                console.log(response.statusText);
              }
            });
          }
        }
      }, [loggedIn]);
return (
    <div>
        <NavBar/>
    <div className={styles.profile}>
      <h1>Profile</h1>
      <div className={styles.profileInfo}>
        <div className={styles.profileItem}>
          <span className={styles.label}>Name:</span>
          <span className={styles.value}>{name}</span>
        </div>
        <div className={styles.profileItem}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{email}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;