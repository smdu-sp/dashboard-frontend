import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
    xAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 500,
    height: 400,
};
const dataset = [
    {
        london: 59,
        paris: 57,
        newYork: 86,
        seoul: 21,
        month: 'Guilherme',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        seoul: 28,
        month: 'José',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        seoul: 41,
        month: 'Guilherme Filho',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        seoul: 73,
        month: 'Fernando',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        seoul: 99,
        month: 'Sidney',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        seoul: 144,
        month: 'Bruno',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        seoul: 319,
        month: 'Diego',
    }
];

const valueFormatter = (value: number | null) => `${value}mm`;

export default function HorizontalBars() {
    return (
        <BarChart
            colors={['#0088FE']}
            sx={{ width: '300%', height: '100%'}}
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
            layout="horizontal"
            {...chartSetting}
        />
    );
}