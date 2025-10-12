import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import style from '../dash.module.css';

export interface ChartData {
  name: string;
  value: number;
}

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

export const MainChart = () => (
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
