import React ,{useState,useEffect} from "react";
import axios from "axios";
import EventCard from "./eventCard"
function viewEvent(){
    const [events,getevents]=useState([]);
    
      useEffect(() => {
        getEventList();
        },[]);

    function getEventList()
    {
        let axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "localhost:3000",
            },
          };
          axios.post("http://localhost:3000/getEvent", [], axiosConfig).then((res) => {
            console.log(res.data);
            getevents(res.data)
           
          });
    };
      
    
 
    return(
        <div>
           {events.map((x)=>(<EventCard key={x.id} name={x.eventName} date={x.dateTime} short={x.shortDes} long={x.longDes}/>))}
        </div>
    );

};

export default viewEvent;