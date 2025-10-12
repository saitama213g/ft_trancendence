import React from 'react';
import style from '../dash.module.css';
import { EnvelopeIcon, DocumentTextIcon, TargetIcon, GridIcon, QuestionMarkCircleIcon } from './Icons';

export const Sidebar = () => {
    const navItems = [
        { icon: <EnvelopeIcon />, active: true },
        { icon: <DocumentTextIcon />, active: false },
        { icon: <TargetIcon />, active: false },
        { icon: <GridIcon />, active: false },
    ];

    return (
        <aside className={style['sidebar']}>
            <div className={style['sidebar-logo-placeholder']}></div>
            <nav>
                {navItems.map((item, index) => (
                    <button key={index} className={`${style['nav-button']} ${item.active ? style['active'] : ''}`}>
                        {item.icon}
                    </button>
                ))}
            </nav>
            <div className={style['sidebar-footer']}>
                <button>
                    <QuestionMarkCircleIcon />
                </button>
            </div>
        </aside>
    );
};
