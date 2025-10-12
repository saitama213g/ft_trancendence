"use client";
import React from 'react';
import style from './dash.module.css';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { GoalCard } from './components/GoalCard';
import { MainChart } from './components/MainChart';

export default function App() {
  return (
    <div className={style['app-container']}>
        <div className={style['dashboard-layout']}>
            <Sidebar />
            <main className={style['main-content']}>
                <Header />
                <section className={style['stats-grid']}>
                    <StatCard title="NEW MESSAGES" value="85" progress={75} footerText="Response Rate" />
                    <GoalCard />
                    <StatCard title="NEW MESSAGES" value="85" progress={75} footerText="Response Rate" />
                </section>
                <section>
                    <MainChart />
                </section>
            </main>
        </div>
    </div>
  );
}

