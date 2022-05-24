import React, { useState } from "react";
import style from "./event.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
function eventForm(props) {
  const [eventname, setEventName] = useState("");
  const [shortdesc, setsDesc] = useState("");
  const [longdesc, setLDesc] = useState("");
  const [dateAndTime, setDNT] = useState(new Date());
  function SubmitHandle(e) {
    e.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "localhost:3000",
      },
    };
    
    const user = {

      eventName: eventname,
      shortDes: shortdesc,
      longDes: longdesc,
      dateTime: dateAndTime.toString(),
    };
    console.log(user);
    axios.post("http://localhost:3000/addEvent", user, axiosConfig).then((res) => {
      console.log(res.data);
      if (res.data != undefined) {
        //   handleClickToOpen();
        alert("Event Added");
      } else {
        alert("Something Wrong");
      }
    });

    console.log(eventname);
    console.log(shortdesc);
    console.log(longdesc);
    console.log(dateAndTime);
  }
 
  return (
    <div className={style.main}>
      <Grid container className={style.mainContainer}>
        <Grid item className={style.dashboardContainer}>
          <h1>Event Form</h1>
        </Grid>
      </Grid>
      <div className={style.formBlock}>
        <Box
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
          onSubmit={SubmitHandle}
          Validate
          autoComplete="off"
        >
          <InputLabel sx={{ m: 1, width: "50vw" }}>Event Name</InputLabel>
          <TextField
            required
            id="event-name"
            type="text"
            onChange={(e) => setEventName(e.target.value)}
            
            sx={{ m: 1, width: "35vw" }}
            value={eventname}
          ></TextField>

          <InputLabel sx={{ m: 1, width: "50vw" }}>
            Short Description
          </InputLabel>
          <TextField
            required
            id="short-desc"
          
            type="text"
            onChange={(e) => setsDesc(e.target.value)}
            sx={{ m: 1, width: "50vw" }}
            value={shortdesc}
            fullWidth
          />

          <InputLabel sx={{ m: 1, width: "50vw" }}>Long Description</InputLabel>

          <TextField
             required
            value={longdesc}
            type="text"
           
            id="long-desc"
            sx={{ m: 1, width: "50vw" }}
            multiline
            fullWidth
            maxRows={3}
            rows={3}
            onChange={(e) => setLDesc(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <InputLabel sx={{ m: 1, width: "50vw" }}>Date&Time</InputLabel>
            <Grid item sx={{ m: 1, width: "50vw" }}>
              <DateTimePicker
              required
                onChange={setDNT}
                value={dateAndTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
          <div className={style.formButton}>
            <Button variant="contained" type="submit">
              Add Event
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default eventForm;
