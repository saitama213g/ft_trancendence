import React from 'react';
import styles from './Sidebar.module.css';

const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoIcon}>
        <circle cx="16" cy="16" r="16" fill="white"/>
        <path d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 11L11 21" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const NavIcon: React.FC<{ active?: boolean; children: React.ReactNode; 'aria-label': string }> = ({ active = false, children, 'aria-label': ariaLabel }) => {
    const linkClass = active ? `${styles.navLink} ${styles.active}` : styles.navLink;
    return (
        <li>
            <a href="#" className={linkClass} aria-label={ariaLabel} title={ariaLabel}>
                {children}
            </a>
        </li>
    );
};

// New Icons
const StatsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.navSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const FriendsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.navSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const AppearanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.navSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.navSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    return (
      <>
        <aside className={`${styles.sidebar} ${styles.desktopSidebar}`}>
            <div className={styles.logo}>
                <LogoIcon/>
            </div>
            <nav>
                <ul className={styles.navList}>
                    <NavIcon active={true} aria-label="Stats"><StatsIcon /></NavIcon>
                    <NavIcon aria-label="Friends"><FriendsIcon /></NavIcon>
                    <NavIcon aria-label="Appearance"><AppearanceIcon /></NavIcon>
                </ul>
            </nav>
            <div className={styles.footer}>
                 <NavIcon aria-label="Settings"><SettingsIcon /></NavIcon>
            </div>
        </aside>

        <div className={`${styles.mobileWrapper} ${isOpen ? styles.mobileWrapperVisible : ''}`}>
            <div className={styles.mobileOverlay} onClick={() => setIsOpen(false)}></div>
            <aside className={`${styles.sidebar} ${styles.mobileSidebar} ${isOpen ? styles.mobileOpen : ''}`}>
                <button onClick={() => setIsOpen(false)} className={styles.closeButton} aria-label="Close sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className={styles.logo}>
                    <LogoIcon/>
                </div>
                <nav>
                    <ul className={styles.navList}>
                        <NavIcon active={true} aria-label="Stats"><StatsIcon /></NavIcon>
                        <NavIcon aria-label="Friends"><FriendsIcon /></NavIcon>
                        <NavIcon aria-label="Appearance"><AppearanceIcon /></NavIcon>
                    </ul>
                </nav>
                <div className={styles.footer}>
                     <NavIcon aria-label="Settings"><SettingsIcon /></NavIcon>
                </div>
            </aside>
        </div>
      </>
    );
}

export default Sidebar;