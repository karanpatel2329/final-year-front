import React from "react";
import Paper from '@material-ui/core/Paper';
import {
ArgumentAxis,
ValueAxis,
Chart,
BarSeries,
Title,
} from '@devexpress/dx-react-chart-material-ui';
import style from './Attendance.module.css'

const App = () => {

// Sample data
const data = [
{ argument: 'OS', value: 83 },
{ argument: 'Python', value: 50 },
{ argument: 'Java', value: 90 },
{ argument: 'Web', value: 50 },
{ argument: 'C#', value: 60 },
{ argument: 'React', value: 60 },
];
return (
    <div className={style.main}>
    <div className={style.chartContainer}>
	<Paper className={style.chartPaper}>
	<Chart
    className={style.chart}
data={data}
barsize={10}

	>
	<ArgumentAxis />
	<ValueAxis  max={100}/>   

	<BarSeries valueField="value" backgroundColor='red'argumentField="argument" />
    <Title text="Subject Wise Attendence" />
	</Chart>
</Paper>
</div>
</div>
);
}

export default App;
