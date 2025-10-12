"use client";
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import MainChart from './components/MainChart';
import RadialProgressCard from './components/RadialProgressCard';
import styles from './App.module.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.app}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={styles.main}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={styles.section}>
          <div className={styles.layoutGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.statGrid}>
                <StatCard
                  title="NEW MATCHES"
                  value="85"
                  progress={75}
                  progressLabel="Win Rate"
                  icon={<MessageIcon />}
                />
                <StatCard
                  title="NEW RIVALS"
                  value="21"
                  footerText1="72 This week"
                  icon={<LeadsIcon />}
                />
                <StatCard
                    title="SERVE ACCURACY"
                    value="92%"
                    progress={92}
                    progressLabel="Success"
                    icon={<TargetIcon />}
                />
                <StatCard
                    title="TOP SPIN %"
                    value="78%"
                    progress={78}
                    progressLabel="Success Rate"
                    icon={<SpinIcon />}
                />
              </div>
              <MainChart />
            </div>

            <div className={styles.rightColumn}>
              <RadialProgressCard />
              <StatCard
                title="TOURNAMENT WINS"
                value="12"
                progress={88}
                progressLabel="Success Rate"
                icon={<MessageIcon />}
              />
              <StatCard
                  title="CURRENT RANK"
                  value="#12"
                  footerText1="Top 5% of players"
                  footerText2="Global Leaderboard"
                  icon={<MedalIcon />}
              />
              <StatCard
                  title="AVG. RALLY LENGTH"
                  value="6.2s"
                  footerText1="Last 10 matches"
                  icon={<ClockIcon />}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ICONS
const MessageIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const LeadsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const TargetIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const SpinIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-9-9" />
  </svg>
);

const MedalIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3.271l3 3 3-3V12h-6V3.271z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v9" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default App;