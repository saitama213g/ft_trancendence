import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import styles from './RadialProgressCard.module.css';

const data = [{ name: 'Goal', value: 62, fill: '#6366f1' }];

const RadialProgressCard: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        innerRadius="70%"
                        outerRadius="90%"
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                        barSize={12}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background={{ fill: '#e5e7eb' }}
                            dataKey="value"
                            cornerRadius={10}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className={styles.overlay}>
                    <span className={styles.overlayValue}>62%</span>
                    <span className={styles.overlayLabel}>Goal</span>
                </div>
            </div>
            <p className={styles.caption}>RANK UP GOAL</p>
        </div>
    );
};

export default RadialProgressCard;
