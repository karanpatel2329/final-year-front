import React from "react";
import style from "./dashboardMain.module.css";
import view from '../../../assets/report.png';
import attendance from '../../../assets/attendence.png';
import edit from '../../../assets/edit.png';
import event from '../../../assets/event.png';
import Block from "./Block";
import Grid from '@mui/material/Grid';
import style1 from "./Block.module.css"
import Link from "next/link";
function DashboardMain({ handleToggleSidebar }) {
  const eventLink="teacher/dashboard/event";
  
  
  return (
    <main className={style.main}>
      <Grid container className={style.mainContainer}>
        <Grid item className={style.dashboardContainer}>
          <h1>Dashboard</h1>
        </Grid>
       
          
    
        </Grid>
        <div className={style1.Blocks1}>
        <Block image={view} text="View Student Report" className={style1.blockItem} ></Block>
        <Block image={attendance}  text="View Student Attendance" className={style1.blockItem}></Block>
        </div>
        <div className={style1.Blocks1}>
        <Block image={event} targetLink={eventLink} text="Add Event" className={style1.blockItem} ></Block>
        <Block image={edit} text="Edit Profile" className={style1.blockItem}></Block>
        </div>
      
    </main>
  );
}

export default DashboardMain;
