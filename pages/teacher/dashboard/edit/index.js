import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import style from './edit.module.css';
import FormLabel from '@mui/material/FormLabel';
import {Grid} from '@material-ui/core'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import { DepartureBoard, Subject } from '@mui/icons-material';

function Registercomp() {
  const router = useRouter()
  const [employeeid, setEmployeeId] = useState();
  const [employeeErr, setEmployeeErr] = useState({});
  const [name, setName] = useState();
  const [nameErr,setnameErr] = useState({});
  const [loading,setLoading]=useState(true);
  const [department, setDepartment] = useState();
  const [departmentErr, setDepartmentErr] = useState({});
  const [dob, setDob] = useState();
  const [dobErr, setDobErr] = useState({});
  const [gender, setGender] = useState();
  const [genderErr, setGenderErr] = useState({});
  const [address, setAddress] = useState();
  const [addressErr,setAddressErr] = useState({});
  const [mobile, setMobile] = useState();
  const [mobileErr, setMobileErr] = useState({});
  const [password, setPassword] = useState();
  const [passwordErr, setPasswordErr] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const EmployeeId = localStorage.getItem("id");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "localhost:3000",
      },
    };
    const employee = {
      EmployeeId: EmployeeId,
      
    };
    console.log(EmployeeId);
    axios
      .post("http://localhost:3000/getTeacherProfile", employee, axiosConfig)
      .then((res) => {
        if (res.data != null) {
          console.log(res.data);
          setEmployeeId(res.data[0].EmployeeId);
          setName(res.data[0].name);
          setDepartment(res.data[0].Dep);
          setDob(res.data[0].dob);
          setGender(res.data[0].gender);
          setAddress(res.data[0].contactInfo.address);
          setMobile(res.data[0].contactInfo.mobileNo);
          setLoading(false);
        } else {
          alert("No student Found");
        }
      });
  };
  const handleSubmit = event => {
    event.preventDefault();
    const validate = FormValidation();
    console.log(employeeid,password,department,gender,dob,mobile,password);
    const user = {
        EmployeeId:employeeid,
        name:name,
      
        Dep:department,
        gender:gender,

        dob:dob,
        contactInfo:{
            address:address,
            mobileNo:mobile,
            parentMobileNo:8976543210
            
        },
        role:'teachers',
        password:password
    };
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "localhost:3000",
        }
      };
      console.log(user);
      axios.post('http://localhost:3000/updateTeacherProfile',  user , axiosConfig)
          .then(res => {
            console.log(res.data);
            if(res.data.data.length===0){
            //   handleClickToOpen();
            }else{
              router.push('/teacher/dashboard');
              alert("Update SuccessFully")
          
            }
          
            
          })
}
const FormValidation = () =>{
  const employeeErr = {};
  const mobileErr = {};
  const passwordErr = {};
  const nameErr = {};
  const addressErr = {};
  const genderErr = {};
  const dobErr = {};
  let validate = true;

 
  
  if(name==null||name.length==0){
      nameErr.error = "Field cannot be empty";
      validate = false;
  }
  if(address==null||address.length==0){
      addressErr.err = "Field cannot be empty";
      validate = false;
  }
  if(gender==null){
      genderErr.err = "select the gender";
      validate = false;
  }
  if(department==null){
      departmentErr.err = "select the department"
      validate = false;
  }
  if(dob==null){
      dobErr.err = "select the date";
      validate = false;
  }
  if(mobile==null||mobile.length==0){
      mobileErr.mobilerror = "Field cannot be empty";
      validate = false;
  }
  else if(String(mobile).length!=10||mobile==undefined){
      mobileErr.error = "invalid mobile number";
      validate = false;
  }

  setEmployeeErr(employeeErr);
  setMobileErr(mobileErr);
  setPasswordErr(passwordErr);
  setnameErr(nameErr);
  setAddressErr(addressErr);
  setGenderErr(genderErr);
  setDobErr(dobErr);
  setDepartmentErr(departmentErr);
  return validate;
}
return (
    
  <div className={style.main}>
  <div > 
  <div className={style.subMain}>
     
      <div className={style.registerform}>
      <h2 className={style.heading}>Teacher Profile Update</h2>
      {loading ? <></>:  <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete='off'
            >
      <Grid container>
          <Grid item>
          <TextField className={style.text1} disabled fullWidth value={employeeid} label="Employee Id" id="employeeId"  onChange={e=>setEmployeeId(e.target.value)}/>
          {Object.keys(employeeErr).map((key)=>{
                  return <div className='usncheck' style={{color:"red"}}>{employeeErr[key]}</div>
                })}
          </Grid>
      </Grid>
      <br/>
      <Grid container>
          <Grid item>
          <TextField className={style.text1} value={name}  fullWidth label="Name" id="name"  onChange={e=>setName(e.target.value)}/>
          {Object.keys(nameErr).map((key)=>{
                          return <div className='usncheck' style={{color:"red"}}>{nameErr[key]}</div>
                          })}
          </Grid>
      </Grid>
     
      
      <br/>
      <Grid container>
          <Grid item>
              <FormControl fullWidth className={style.text1} >
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={department}
                      label="Branch"
                      onChange={e=>setDepartment(e.target.value)}
                  >
                      <MenuItem value={"CSE"}>CSE</MenuItem>
                      <MenuItem value={"ISE"}>ISE</MenuItem>
                      <MenuItem value={"ECE"}>ECE</MenuItem>
                      <MenuItem value={"MEC"}>MEC</MenuItem>
                      <MenuItem value={"EEE"}>EEE</MenuItem>
                      <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
                  </Select>
                  {Object.keys(departmentErr).map((key)=>{
                  return <div className='usncheck' style={{color:"red"}}>{departmentErr[key]}</div>
                })}
              </FormControl>
          </Grid>
      </Grid>
      
      <br/>
      <Grid container>
          <Grid item>
          <input type="date" value={dob} className={style.dob} onChange={e=>setDob(e.target.value)} id="name"/>
          {Object.keys(dobErr).map((key)=>{
                          return <div className='usncheck' style={{color:"red"}}>{dobErr[key]}</div>
                          })}
          </Grid>
      </Grid>
     
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
      <br/>
      <Grid container>
          <Grid item >
              <TextField
              className={style.text1}
              id="outlined-textarea"
              label="Address"
              value={address}
              placeholder="Enter Your Address"
              multiline
              onChange={e=>setAddress(e.target.value)}
              rows={3}
              />
              {Object.keys(addressErr).map((key)=>{
                           return <div className='usncheck' style={{color:"red"}}>{addressErr[key]}</div>
                          })}
          </Grid>
      </Grid>

      <br/>
      <Grid container>
          <Grid item>
          <TextField className={style.text1} value={mobile} fullWidth label="Mobile No" id="mobile"  onChange={e=>setMobile(e.target.value)} type="number"/>
          {Object.keys(mobileErr).map((key)=>{
                  return <div className='usncheck' style={{color:"red"}}>{mobileErr[key]}</div>
                })}
          </Grid>
      </Grid>
     
      <br/>
      <Grid container>
          <Grid item>
          <TextField className={style.text1} fullWidth label="Password" id="password"  onChange={e=>setPassword(e.target.value)}/>
          {Object.keys(passwordErr).map((key)=>{
                  return <div className='usncheck' style={{color:"red"}}>{passwordErr[key]}</div>
                })}
          </Grid>
      </Grid>
      <br/>
      <Button variant="contained" className={style.text1}onClick={handleSubmit}>Submit</Button>
      </Box>}
      </div>
  </div>
  </div>
</div>
)
}

export default Registercomp;