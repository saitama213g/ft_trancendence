import React from 'react';
import style from '../dash.module.css';

export const Logo = () => (
    <div className={style['logo']}>
        <div className={style['logo-icon-bg']}>
            <div className={style['logo-icon-dot']}></div>
        </div>
        <span className={style['logo-text']}>excuseme</span>
    </div>
);
