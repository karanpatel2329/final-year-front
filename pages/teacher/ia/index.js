import React, { Fragment, useState,useEffect } from "react";
import { useRouter } from "next/router";
import { default as ReactSelect } from "react-select";
import Select from "react-select";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Box,
} from "@material-ui/core";
import Questions from "./Questions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Backend from "../../../axios";
import style from "./ia.module.css";
import { PermDataSettingTwoTone, Router } from "@mui/icons-material";
import { sub } from "date-fns";
function IaMarksMain({ handleToggleSidebar }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [subject, setSubject] = useState(null);
  const [exam, setExam] = useState(null);
  const [student, setStudent] = useState(null);
  const [array, setArray] = useState([]);
  let [isDisabled,setDisable]=useState(false);
  const [examErr, setExamErr] = useState({});
  const [studentErr, setStudentErr] = useState({});
  const [subjectErr, setSubjectErr] = useState({});
  const [markErr, setmarkErr] = useState({});
  const [subjectCode, setSubjectCode] = useState([]);
  const [subjectlist, setSubjectList] = useState([]);
  const [studentlist, setStudentList] = useState([]);
  let [questionlist, setQuestionList] = useState([
    { value: "1", label: "1", isdisabled: false },
    { value: "2", label: "2" , isdisabled: false},
    { value: "3", label: "3" , isdisabled: false},
    { value: "4", label: "4" , isdisabled: false},
    { value: "5", label: "5" , isdisabled: false},
    { value: "6", label: "6" , isdisabled: false},
    { value: "7", label: "7" , isdisabled: false},
    { value: "8", label: "8" , isdisabled: false},
    { value: "9", label: "9" , isdisabled: false},
    { value: "10", label: "10" , isdisabled: false},
  ]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [marks, setMarks] = useState([]);
 
  const [examList, setExamList] = useState([
    { value: "IA 1", label: "IA 1" },
    { value: "IA 2", label: "IA 2" },
    { value: "IA 3", label: "IA 3" },
    { value: "other", label: "Other" },
  ]);
  const [optionSelected, selectOptionSelected] = useState(false);
  const [questionAttend, setQuestionAttend] = useState();
  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    const validate=FormValidation();
    // console.log(subject,subjectCode,subjectShort);
    console.log(
      exam,
      student,
      subject,
      questionAttend,
      marks
    )
    if(validate){
      const totalObtainMarks = marks.map(item => item.obtainMark).reduce((prev, curr) => prev + curr, 0);
   const totalMarks = marks.map(item => item.questionMark).reduce((prev, curr) => prev + curr, 0);
   console.log(totalMarks);
   console.log(totalObtainMarks);
    const studentMark = {
      usn:student,
      exam:exam,
      subject:subject,
      totalQuestion:10,
      questionAttend:questionAttend,
      question:marks,
      totalMarks:totalMarks,
      totalObtainMarks:totalObtainMarks

    };
 
   
    console.log(studentMark);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "localhost:3000",
      },
    };
    axios
      .post("http://localhost:3000/addMark", studentMark, axiosConfig)
      .then((res) => {
        console.log(res);
        if(res.data.data=="Marks Added Successfully"){
          handleToClose();
          alert("Marks Added Successfully");
        }
        else{
          alert("Something Went Wrong");
        }
      });
     
      
    }
    
  };
  const FormValidation = () =>{
    const examErr = {};
    const subjectErr = {};
    const studentErr = {};
    const markErr={};
    
    let validate = true;
    if(exam==null){
      examErr.error = "Select Exam";
      validate = false;
    }
    if(subject==null){
      subjectErr.error = "Select Subject";
      validate = false;
    }
    if(student==null){
      studentErr.error="Select Student";
      validate=false;
    }
    



    if(marks.length!=parseInt(questionAttend)){
      markErr.error = "Enter All Marks";
      validate = false;
    }
   
    setmarkErr(markErr);
    setExamErr(examErr);
    setSubjectErr(subjectErr);
    setStudentErr(studentErr);
    
    return validate;
  }
  function addMarks(e){
  
  };
  useEffect(() => {
    getSubjectList();
    getStudentList();
  }, []);

  const getStudentList = () => {
    Backend.get("/getStudentList", {}).then((res) => {
      res.data.map((v) => {
        console.log("*");
        return studentlist.push({ value: v.name, label: v.name ,usn:v.USN});
      });
    });
    setLoading(false);
  };

  const getSubjectList = () => {
    setLoading(true);
    Backend.get("/getSubject", {}).then((res) => {
      res.data.map((v) => {
        console.log("*");
        return subjectlist.push({ value: v.name, label: v.name });
      });
    });
    setLoading(false);
  };
 
  const questionHandler = (e) => {
    e.preventDefault();
    console.log(questionAttend);
    setDisable(true)
    let newArray = [];
    for (let i = 1; i <= questionAttend; i++) {
      newArray.push(i);
    }

    setArray((array) => newArray);
  };

  return loading ? (
    <></>
  ) : (
    <main className={style.main}>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Something went wrong"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Try Later</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className="btn-toggle"
        onClick={() => handleToggleSidebar(true)}
      ></div>
      <div className={style.main}>
        <h1>IA MARKS</h1>
        <Button className={style.addButton} onClick={() => setOpen(true)}>
          ADD IA MARKS
        </Button>
      </div>

      {open ? (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="lg"
        >
          {" "}
          <div className={style.formContainer}>
            <Box
              className="subjectForm lg-12 md-12"
              onSubmit={onSubmit}
              component="form"
              validate
              
            >
              <center>
                <h1>Add Subject</h1>
              </center>
              <FormGroup
                className={style.label}
                controlId="formBasicSubjectName"
              >
                <FormLabel sx={{ m: 1, width: "50vw" }}>Exam</FormLabel>
                <ReactSelect
                  label="Exam"
                  options={examList}
                  required
                  onChange={(e) => setExam(e.value)}
                />
                 {Object.keys(examErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {examErr[key]}
                    </div>
                  );
                })}
              </FormGroup>
              <FormGroup
                className={style.label}
                controlId="formBasicSubjectShortName"
              >
                <FormLabel>Subject</FormLabel>
                <ReactSelect
                  options={subjectlist}
                  onChange={(e) =>setSubject(e.value)}
                />
                {Object.keys(subjectErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {subjectErr[key]}
                    </div>
                  );
                })}
              </FormGroup>
              <FormGroup
                className={style.label}
                controlId="formBasicSubjectCode"
              >
                <FormLabel>Student</FormLabel>
                <ReactSelect
                  options={studentlist}
                  onChange={(e) => setStudent(e.usn)}
                />
                {Object.keys(studentErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {studentErr[key]}
                    </div>
                  );
                })}
              </FormGroup>
              <FormGroup
                className={style.label}
                controlId="formBasicSubjectCode"
              >
                <FormLabel>Total Question Attend</FormLabel>
                <Select options={questionlist} disabled={isDisabled} onChange={(e)=>setQuestionAttend(e.value)} />
                <button type='button' disabled={isDisabled} onClick={questionHandler}>Confirm</button>
              </FormGroup>
            
              <FormGroup
                className={style.label}
                controlId="formBasicSubjectCode"
              >
                <FormLabel>No. of questions</FormLabel>
                <div className="questionMain  lg-6 md-6">
                  {array.map((x) => (
                    <Questions
                      key={x}

                      markList={marks}
                      list={questionlist}
                      addFunction={addMarks}
                    />
                  ))}
                    {Object.keys(markErr).map((key) => {
                  return (
                    <div className="usncheck" style={{ color: "red" }}>
                      {markErr[key]}
                    </div>
                  );
                })}
                </div>
              </FormGroup>
              <div className={style.formButton}>
                <Button
                  className={style.Button}
                  color="white"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Box>
          </div>
        </Dialog>
      ) : (
        <></>
      )}
    </main>
  );
}

export default IaMarksMain;
