import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import style from "./edit.module.css";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { set } from "date-fns";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function Registercomp() {
  const router = useRouter();
  const [usn, setUSN] = useState();
  const [usnErr, setusnErr] = useState({});
  const [name, setName] = useState();
  const [nameErr, setnameErr] = useState({});
  const [sem, setSem] = useState();
  const [semErr, setSemErr] = useState({});
  const [branch, setBranch] = useState();
  const [dob, setDob] = useState(null);
  const [dobErr, setDobErr] = useState({});
  const [mobile, setMobile] = useState();
  const [loading,setLoading]=useState(true);
  const [mobileErr, setMobileErr] = useState({});
  const [parentsmobile, setParentsmobile] = useState();
  const [parentsmobileErr, setParentsmobileErr] = useState({});
  const [password, setPassword] = useState();
  const [passwordErr, setPasswordErr] = useState({});
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [addressErr, setAddressErr] = useState({});

  const getData = () => {
    const id = localStorage.getItem("id");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "localhost:3000",
      },
    };
    const student = {
      USN: id,
    };
    axios
      .post("http://localhost:3000/getStudentProfile", student, axiosConfig)
      .then((res) => {
        if (res.data != null) {
          console.log(res.data[0]);
          setUSN(res.data[0].USN);
          setName(res.data[0].name);
          setBranch(res.data[0].branch);
          setSem(res.data[0].sem);
          const date=res.data[0].dob;
          const newDate=date.split('/')[2]+'-'+date.split('/')[1]+'-'+date.split('/')[0];
          setDob(res.data[0].dob);
          setGender(res.data[0].gender);
          setAddress(res.data[0].contactInfo.address);
          setMobile(res.data[0].contactInfo.mobileNo);
          setParentsmobile(res.data[0].contactInfo.parentMobileNo);
          setLoading(false);
        } else {
          alert("No student Found");
        }
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validate = FormValidation();
    console.log(
      usn,
      name,
      sem,
      branch,
      dob,
      mobile,
      parentsmobile,
      password
    );
    const user = {
      USN: usn,
      name: name,
      branch: branch,
      sem: sem,
      subject: [],
      dob: dob,
      gender:gender,
      contactInfo: {
        address: address,
        mobileNo: mobile,
        parentMobileNo: parentsmobile,
      },
      password: password,
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "localhost:3000",
      },
    };
    axios
      .post("http://localhost:3000/studentUpdate", user, axiosConfig)
      .then((res) => {
        console.log(res);
        if(res.data.data=="Updated Successfully")
        {
          router.push("/student/dashboard");
          alert("Updated Successfully");
        }
        else{
          alert("Something Wrong");
        }
        
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const FormValidation = () => {
    const usnErr = {};
    const nameErr = {};
    const addressErr = {};
    const mobileErr = {};
    const parentsmobileErr = {};
    const passwordErr = {};
    const semErr = {};
    const dobErr = {};
    let validate = true;

    if (usn == null || usn.length == 0) {
      usnErr.error = "Field cannot be empty";
      validate = false;
    } else if (usn.trim().length != 10 || usn == undefined) {
      usnErr.usnerror = "Invalid Usn";
      validate = false;
    }
    if (mobile == null || mobile.length == 0) {
      mobileErr.mobilerror = "Field cannot be empty";

      validate = false;
    } else if (String(mobile).length != 10 ) {
      console.log(mobile.length);
      mobileErr.error = "invalid mobile number";
      validate = false;
    }
    if (parentsmobile == null ) {
      parentsmobileErr.mobileerr = "Field cannot be empty";
      validate = false;
    } else if (String(parentsmobile).length != 10 || parentsmobile == undefined) {
      parentsmobileErr.error = "invalid mobile number";
      validate = false;
    }
    if (dob == null || dob.length == 0) {
      dobErr.err = "select the date";
      validate = false;
    }
    if (name == null || name.length == 0) {
      nameErr.error = "Field cannot be empty";
      validate = false;
    }
    if (address == null || address.length == 0) {
      addressErr.err = "Field cannot be empty";
      validate = false;
    }
    if (sem == null || sem.length == 0) {
      semErr.err = "please select the semester";
      validate = false;
    }
   

    setusnErr(usnErr);
    setnameErr(nameErr);
    setMobileErr(mobileErr);
    setParentsmobileErr(parentsmobileErr);
    setPasswordErr(passwordErr);
    setAddressErr(addressErr);
    setSemErr(semErr);
    setDobErr(dobErr);
    return validate;
  };
  return (
    <div className={style.main}>
      <div>
        <div className={style.subMain}>
          <div className={style.registerform}>
            <h2 className={style.heading}>Student Profile Edit</h2>
            {loading ? <></>:  <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete='off'
            >
            <Grid container>
              <Grid item>
                <TextField
                  className={style.text1}
                  fullWidth
                  label="USN"
                  id="usn"
                  disabled
                  value={usn}
                  onChange={(e) => setUSN(e.target.value)}
                />
                {Object.keys(usnErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {usnErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>
            <br />
            <Grid container>
              <Grid item>
                <TextField
                  className={style.text1}
                  fullWidth
                  label="Name"
                  id="name"
                 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {Object.keys(nameErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {nameErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>
            <br />
            <Grid container>
              <Grid item>
                <TextField
                  className={style.text1}
                  fullWidth
                  label="Sem"
                  id="sem"
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 8 } }}
                />
                {Object.keys(semErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {semErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            <br />
            <Grid container>
              <Grid item>
                <FormControl fullWidth className={style.text1}>
                  <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={branch}
                    label="Branch"
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <MenuItem value={"CSE"}>CSE</MenuItem>
                    <MenuItem value={"ISE"}>ISE</MenuItem>
                    <MenuItem value={"ECE"}>ECE</MenuItem>
                    <MenuItem value={"MEC"}>MEC</MenuItem>
                    <MenuItem value={"EEE"}>EEE</MenuItem>
                    <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <br />
            <Grid container>
              <Grid item>
                <input
                  type="date"
                  className={style.dob}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  id="name"
                />
                {Object.keys(dobErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {dobErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>
            <br/>
            <div className={style.radio}>
            <FormControl>
            <Grid container style={{ display: "inline" }}>
              
           
            <FormLabel id="demo-radio-buttons-group-label" >Gender</FormLabel>
            <RadioGroup
            row
              aria-labelledby="demo-radio-buttons-group-label"
               defaultValue={gender}
              name="radio-buttons-group"
            >
              <FormControlLabel value="Male"  control={<Radio />} label="Male" />
              <FormControlLabel value="Female"   control={<Radio />} label="Female" />

            </RadioGroup>
          
             </Grid>
             </FormControl>
             </div>
            <br />
            <Grid container>
              <Grid item>
                <TextField
                  className={style.text1}
                  id="outlined-textarea"
                  label="Address"
                  placeholder="Enter Your Address"
                  multiline
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  value={address}
                />
                {Object.keys(addressErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {addressErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            <br />
            <Grid container>
              <Grid item>
                <TextField
                  value={mobile}
                  className={style.text1}
                  fullWidth
                  label="Mobile No"
                  id="mobile"
                  defaultValue={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  type="number"
                />
                {Object.keys(mobileErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {mobileErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            <br />
            <Grid container>
              <Grid item>
                <TextField
                  className={style.text1}
                  value={parentsmobile}
                  fullWidth
                  label="Parent Mobile No"
                  id="parentmobile"
                  onChange={(e) => setParentsmobile(e.target.value)}
                  type="number"
                />
                {Object.keys(parentsmobileErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {parentsmobileErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            <br />
            <Grid container>
              <Grid item>
                <TextField
                  className={style.text1}
                  fullWidth
                  label="New Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {Object.keys(passwordErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {passwordErr[key]}
                    </div>
                  );
                })}
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              className={style.text1}
              type="submit"
            >
              Submit
            </Button>
            </Box>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registercomp;
