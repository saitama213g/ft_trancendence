import React from 'react';
import styles from './OnlineFriends.module.css';

export interface OnlineFriend {
  name: string;
  status: string;
  latencyMs?: number;
}

interface OnlineFriendsProps {
  friends: OnlineFriend[];
}

const OnlineFriends: React.FC<OnlineFriendsProps> = ({ friends }) => {
  return (
    <section className={styles.card} aria-labelledby="online-friends-heading">
      <div className={styles.header}>
        <h2 id="online-friends-heading" className={styles.title}>Online Friends</h2>
        <span className={styles.badge}>{friends.length}</span>
      </div>
      <div className={styles.list}>
        {friends.map((friend) => (
          <div key={friend.name} className={styles.friend}>
            <div className={styles.avatar} aria-hidden="true">
              {friend.name.slice(0, 2).toUpperCase()}
            </div>
            <div className={styles.details}>
              <span className={styles.name}>{friend.name}</span>
              <span className={styles.status}>{friend.status}</span>
            </div>
            {friend.latencyMs !== undefined && (
              <span className={styles.ping}>{friend.latencyMs} ms</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OnlineFriends;
