import React from 'react';
import style from '../dash.module.css';
import { Logo } from './Logo';
import { HamburgerIcon } from './Icons';

export const Header = () => (
    <header className={style['header']}>
        <Logo />
        <nav className={style['header-nav']}>
            <a href="#">home</a>
            <a href="#">support</a>
            <a href="#">my account</a>
        </nav>
        <button className={style['menu-button']}>
            <HamburgerIcon />
        </button>
    </header>
);
