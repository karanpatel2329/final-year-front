import React ,{useState} from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid } from "@material-ui/core";

import style from './viewPerformance.module.css';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { SutdentMarks as data } from './data';
import { Stack, Animation } from '@devexpress/dx-react-chart';
const ViewPerformance=(props)=>{
 
  const Root = props => (
    <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
  );
  const Label = props => (
    <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} className={style.bottomLabel} />
  );
  
    const [selectedSem,setSem]=useState(1);
    console.log(selectedSem)
    const Marks = data.filter((x)=>{
      if(x.sem==selectedSem)
      return x.marks;
    
     
    });
    const chartData= Marks[0].marks;
    console.log(chartData)
    if(chartData.length==0){
      return(
        <div className={style.main}>
        <div className={style.select}>
        <Grid container>
              <Grid item>
                <FormControl fullWidth className={style.text1}>
                  <InputLabel id="demo-simple-select-label">Sem Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className={style.selection}
                    label="Sem Select"
                    value={selectedSem}
                    onChange={(e) => setSem(e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
        </div>
        <div className={style.chartContainer}>
        <div>
          
        <h2>No Data Found</h2>
        </div>
        </div>
        </div>
      );
    }
    else{
    return(
        <div className={style.main}>
        <div className={style.select}>
        <Grid container>
              <Grid item>
                <FormControl fullWidth className={style.text1}>
                  <InputLabel id="demo-simple-select-label">Sem Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className={style.selection}
                    label="Sem Select"
                    value={selectedSem}
                    onChange={(e) => setSem(e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
        </div>
        <div className={style.chartContainer}>
        <div>
          
        <Paper className={style.chart}>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="IA1"
            valueField="IA1"
            argumentField="subName"
            color="#ffd700"
          />
          <BarSeries
            name="IA2"
            valueField="IA2"
            argumentField="subName"
            color="#c0c0c0"
          />
          <BarSeries
            name="IA3"
            valueField="IA3"
            argumentField="subName"
            color="#cd7f32"
          />
          <BarSeries
            name="External"
            valueField="External"
            argumentField="subName"
            color="#ad7e32"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Marks" />
          <Stack />
        </Chart>
      </Paper>
        </div>
        </div>
        </div>
    );}
}
export default ViewPerformance;