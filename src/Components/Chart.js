import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.chartData !== null ? this.props.chartData : null;
        let salesData = [];
        data.map((item) => salesData = item.sales);
        
        return (
            <ResponsiveContainer width="99%" height={320}>
                <LineChart data={salesData}>
                    <XAxis dataKey="weekEnding" />
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="retailSales" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="wholesaleSales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default Chart;