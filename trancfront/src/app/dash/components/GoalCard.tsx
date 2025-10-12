import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import style from '../dash.module.css';
import { DotsGridIcon } from './Icons';

const goalData = [
  { name: 'Completed', value: 62, color: '#6366F1' },
  { name: 'Remaining', value: 38, color: '#F3F4F6' },
];

export const GoalCard = () => (
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
