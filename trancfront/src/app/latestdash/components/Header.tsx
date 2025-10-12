import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                 <button onClick={toggleSidebar} className={styles.toggleButton} aria-label="Toggle sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <h1 className={styles.title}>
                    <span className={styles.highlight}>PingPong</span>Pro
                </h1>
            </div>
            <nav className={styles.nav}>
                <a href="#" className={styles.link}>Dashboard</a>
                <a href="#" className={styles.link}>Leaderboard</a>
                <a href="#" className={styles.link}>My Account</a>
                <button className={styles.menuButton} aria-label="Open menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>
        </header>
    );
};

export default Header;