import React from 'react';
import styles from './MainChart.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', performance: 25 },
  { name: 'Feb', performance: 80 },
  { name: 'Mar', performance: 20 },
  { name: 'Apr', performance: 95 },
  { name: 'May', performance: 50 },
  { name: 'Jun', performance: 65 },
  { name: 'Jul', performance: 45 },
  { name: 'Aug', performance: 85 },
  { name: 'Sep', performance: 98 },
  { name: 'Oct', performance: 75 },
  { name: 'Nov', performance: 88 },
  { name: 'Dec', performance: 40 },
];

const MainChart: React.FC = () => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Match Performance</h3>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5, right: 20, left: -10, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.75rem',
                        }} 
                    />
                    <Line type="monotone" dataKey="performance" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5, fill: '#4f46e5' }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MainChart;
