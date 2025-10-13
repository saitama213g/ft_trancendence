import React from 'react';
import styles from './LatestGames.module.css';

export interface LatestGame {
  opponent: string;
  outcome: 'win' | 'loss';
  score: string;
  playedAt: string;
  displayTime: string;
}

interface LatestGamesProps {
  games: LatestGame[];
}

const LatestGames: React.FC<LatestGamesProps> = ({ games }) => {
  return (
    <section className={styles.card} aria-labelledby="latest-games-heading">
      <div className={styles.header}>
        <h2 id="latest-games-heading" className={styles.title}>Latest Games</h2>
        <a className={styles.viewAll} href="#" aria-label="View all recent games">
          View All
        </a>
      </div>
      <div className={styles.list}>
        {games.map((game) => (
          <article key={`${game.opponent}-${game.playedAt}`} className={styles.game}>
            <span className={styles.opponent}>{game.opponent}</span>
            <div className={styles.details}>
              <span
                className={styles.result}
                data-outcome={game.outcome}
              >
                {game.outcome === 'win' ? 'Win' : 'Loss'}
              </span>
              <span className={styles.score}>{game.score}</span>
            </div>
            <time className={styles.timestamp} dateTime={game.playedAt}>
              {game.displayTime}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestGames;
