import React from "react";
import style from "./studentDashboardMain.module.css";
import view from '../../../assets/report.png';
import attendance from '../../../assets/attendence.png';
import edit from '../../../assets/edit.png';
import event from '../../../assets/event.png';
import Block from "./Block";
import Grid from '@mui/material/Grid';
import style1 from "./Block.module.css"
import Link from "next/link";
function studentDashboardMain({ handleToggleSidebar }) {
  const eventLink="student/dashboard/viewEvent";
  const editLink="student/dashboard/edit";
  const viewAttendanceLink="student/dashboard/viewAttendance";
  const viewPerformanceLink="student/dashboard/viewPerformance"
  return (
    <main className={style.main}>
      <Grid container className={style.mainContainer}>
        <Grid item className={style.dashboardContainer}>
          <h1>Dashboard</h1>
        </Grid>
       
          
    
        </Grid>
        <div className={style1.Blocks1}>
        <Block image={view} targetLink={viewPerformanceLink} text="View Your Performance" className={style1.blockItem} ></Block>
        <Block image={attendance} targetLink={viewAttendanceLink}  text="View Student Attendance" className={style1.blockItem}></Block>
        </div>
        <div className={style1.Blocks1}>
        <Block image={event} targetLink={eventLink} text="View Event" className={style1.blockItem} ></Block>
        <Block image={edit} targetLink={editLink} text="Edit Profile" className={style1.blockItem}></Block>
        </div>
      
    </main>
  );
}

export default studentDashboardMain;
