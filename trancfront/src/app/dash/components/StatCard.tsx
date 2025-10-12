import React from 'react';
import style from '../dash.module.css';
import { ChatBubbleIcon } from './Icons';

export interface StatCardProps {
    title: string;
    value: string;
    progress: number;
    footerText: string;
}

export const StatCard = ({ title, value, progress, footerText }: StatCardProps) => (
    <div className={style['stat-card']}>
        <div className={style['stat-card-header']}>
            <h3 className={style['stat-card-title']}>{title}</h3>
            <ChatBubbleIcon />
        </div>
        <p className={style['stat-card-value']}>{value}</p>
        <div className={style['stat-card-footer']}>
            <span>{footerText}</span>
            <span>{progress}%</span>
        </div>
        <div className={style['progress-bar-bg']}>
            <div className={style['progress-bar-fg']} style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);
