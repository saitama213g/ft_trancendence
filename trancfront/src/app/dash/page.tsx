"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import style from './dash.module.css';
// import type { ChartData } from './types';

export interface ChartData {
  name: string;
  value: number;
}


// --- MOCK DATA ---
const chartData: ChartData[] = [
    { name: 'Jan', value: 85 }, { name: 'Feb', value: 78 },
    { name: 'Mar', value: 95 }, { name: 'Apr', value: 60 },
    { name: 'May', value: 100 }, { name: 'Jun', value: 18 },
    { name: 'Jul', value: 65 }, { name: 'Aug', value: 45 },
    { name: 'Sep', value: 88 }, { name: 'Oct', value: 82 },
    { name: 'Nov', value: 96 }, { name: 'Dec', value: 88 },
    { name: 'Jan', value: 92 }, { name: 'Feb', value: 75 },
    { name: 'Mar', value: 98 }, { name: 'Apr', value: 45 },
];
const goalData = [
  { name: 'Completed', value: 62, color: '#6366F1' },
  { name: 'Remaining', value: 38, color: '#F3F4F6' },
];


// --- ICONS ---
const Icon = ({ children }: { children: React.ReactNode }) => <div className={style['icon-wrapper']}>{children}</div>;

const EnvelopeIcon = () => (
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    </Icon>
);
const DocumentTextIcon = () => (
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    </Icon>
);
const TargetIcon = () => (
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    </Icon>
);
const GridIcon = () => (
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    </Icon>
);
const QuestionMarkCircleIcon = () => (
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </Icon>
);
const ChatBubbleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
    </svg>
);
const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const DotsGridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h.01M4 12h.01M4 18h.01M12 6h.01M12 12h.01M12 18h.01M20 6h.01M20 12h.01M20 18h.01" />
    </svg>
);

// --- COMPONENTS ---

const Logo = () => (
    <div className={style['logo']}>
        <div className={style['logo-icon-bg']}>
            <div className={style['logo-icon-dot']}></div>
        </div>
        <span className={style['logo-text']}>excuseme</span>
    </div>
);

const Sidebar = () => {
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

const Header = () => (
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

interface StatCardProps {
    title: string;
    value: string;
    progress: number;
    footerText: string;
}
const StatCard = ({ title, value, progress, footerText }: StatCardProps) => (
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

const GoalCard = () => (
    <div className={style['goal-card']}>
        <div className={style['stat-card-header']}>
            <h3 className={style['stat-card-title']}>NEW LEADS</h3>
            <DotsGridIcon />
        </div>
        <div className={style['goal-card-content']}>
            <div className={style['goal-card-text']}>
                <p className={style['goal-card-value']}>21</p>
                <p className={style['goal-card-details']}>60% Daily Goal</p>
                <p className={style['goal-card-details']}>72 This week</p>
            </div>
            <div className={style['goal-chart-container']}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={goalData}
                            cx="50%"
                            cy="50%"
                            innerRadius="70%"
                            outerRadius="100%"
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={0}
                            cornerRadius={5}
                        >
                            {goalData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className={style['goal-chart-overlay']}>
                    <span className={style['goal-chart-overlay-label']}>Goal</span>
                    <span className={style['goal-chart-overlay-value']}>62%</span>
                </div>
            </div>
        </div>
    </div>
);

// Fix: The `payload` property is passed to a custom tooltip component by recharts,
// but it might not be defined on the `TooltipProps` type in some versions.
// Intersecting with `{ payload?: any[] }` correctly types the props.
const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType> & { payload?: any[] }) => {
    if (active && payload && payload.length) {
        return (
            <div className={style['custom-tooltip']}>
                <p>{`${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const MainChart = () => (
    <div className={style['main-chart-container']}>
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A6CEE3" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 12 }} dy={10} />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#a3a3a3', fontSize: 12 }}
                    domain={[0, 125]}
                    ticks={[0, 25, 50, 75, 100, 125]}
                    dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#A6CEE3', strokeWidth: 1, strokeDasharray: '3 3' }}/>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#A6CEE3"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    dot={{ stroke: '#A6CEE3', strokeWidth: 2, fill: 'white', r: 4 }}
                    activeDot={{ r: 6, fill: '#fff', stroke: '#A6CEE3', strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);


// --- APP ---

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
