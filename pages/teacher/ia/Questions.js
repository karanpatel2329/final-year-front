import React,{useState,useEffect} from "react";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";

import { default as ReactSelect } from "react-select";
import { FileDownload } from "@mui/icons-material";
import { style } from "@mui/system";
const Questions=props=>{
  let [dummyNo,setNo]=useState(null);
  let [dummyMark,addMark]=useState(null);
  let [dummyObtainMark,addObtainMark]=useState(null);
  let [isDisabled,setDisable]=useState(false);
  let [mark,addAndSetMarks]=useState(props.markList);
  let [dummyList,setList]=useState(props.list);
  function setQueNo(e){
    setNo(e.value)
 

  };
  function setMark(e){
    addMark(parseInt(e.target.value,10));
  
  };
  function setObtainMark(e){
    addObtainMark(parseInt(e.target.value,10))
  }

  let dummyData={questionNo:null,questionMark:null,obtainMark:null}
  function addHandler(e){
    e.preventDefault();
    if(dummyNo!=null && dummyMark!=null&&dummyObtainMark!=null){
    dummyData={
      
      questionNo:dummyNo,
      questionMark:dummyMark,
      obtainMark:dummyObtainMark

    }
    let id=dummyNo-1;
    
    addAndSetMarks(mark.push(dummyData))
    console.log(mark)
   setList(dummyList[id].isdisabled=true)
   
    props.addFunction(dummyData);
 
    setDisable(true);
   
    }
    else
    alert("Please Select Above Field");
  };
  

    return(
        <div>
        <div className="question">
                    Question No.
                    
                    <ReactSelect
                      options={dummyList}
                      onChange={setQueNo}
                     
                      //disabled={isDisabled1}
                      isOptionDisabled={(option) => option.isdisabled} 
                    />
                  </div>
                  <div className="question">
                  <InputLabel sx={{ m: 1 }}>Question Marks</InputLabel>
                    <TextField
                      disabled={isDisabled}
                      type="number"
                      id="mark-field"
                      
                      onChange={setMark}
                    />
                  </div>
                  <div className='question'>
                  <InputLabel sx={{ m: 1 }}>Obtain Marks</InputLabel>
                    <TextField
                      disabled={isDisabled}
                      type="number"
                      
                      id="obtain-mark-field"
                      onChange={setObtainMark}
                    />
                  </div>
                  <button type='button' onClick={addHandler} disabled={isDisabled}>
                    Add Mark
                  </button>
                  </div>
    );
};
export default Questions;