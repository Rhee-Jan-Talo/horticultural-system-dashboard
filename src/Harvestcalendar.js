import './App.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect, useCallback } from "react";
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Link, useNavigate, generatePath, useParams } from 'react-router-dom';

const locales = {
    "en-US": require("date-fns/locale/en-US"),
    timeZone: "Asia/Manila"
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})


function Harvestcalendar() {
    const { batch_id } = useParams();
    const x = batch_id
    console.log(x)
    const navigate = useNavigate();
    const [batchinfo, setbatchinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/plantbatchinfo/${x}`).then((response) => {
            setbatchinfo(response.data);
        })
    }, [x])
    var today = new Date();
    const batchea = batchinfo[0]
    var batchstatus, batchend, areaname, areasize, thestatus
    for (var key in batchea) {
        if (batchea.hasOwnProperty(key)) {
            if (key === "batch_status"){
                batchstatus = batchea[key]
            }
            if (key === "expected_harvest_period"){
                batchend = batchea[key]
            }
            if (key === "area_name"){
                areaname = batchea[key]
            }
            if (key === "size"){
                areasize = batchea[key]
            }
            if (key === "batch_status"){
                thestatus = batchea[key]
            }
        }
      }
    const [latestinfo, setlatestinfo] = useState([]);
    useEffect(() =>{
        Axios.get(`http://localhost:3001/plantbatchlatestinfo/${x}`).then((response) => {
            setlatestinfo(response.data);
        })
    }, [x])
    var y,z
    var values = {id: "", startd: "", endd: ""}
    const handleSelectSlot = ({start,end,resourceId}) => {
        y = start
        z = end
        console.log("x: ",x)
        console.log("y: ",y)
        console.log("z: ",z)
        values["id"] = x
        values["startd"] = y
        values["endd"] = z
        console.log("value: ",values)
        values = JSON.stringify(values);
        console.log("w: ",values)
        var yy = new Date(y);
        var zz = new Date(z);
        function convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
        }
        const ydate = convertTZ(yy, "Asia/Manila")
        const zdate = convertTZ(zz, "Asia/Manila")
        console.log("start manila: ", ydate)
        console.log("end manila: ", zdate)
        alert("Plant Monitoring for Batch "+x+"\nFrom: "+ydate+"\nTo: "+zdate)
        values && navigate(generatePath("/harvestcalendarmonitoring/:values", { values }));
    }
    var eventvalues = {id: "", startd: "", endd: "", actinc: ""}
    const handleEventSelection = ({title,start,end,act_increment,resourceId}) =>{
        y = start
        z = end
        eventvalues["id"] = x
        eventvalues["startd"] = y
        eventvalues["endd"] = z
        eventvalues["actinc"] = act_increment
        eventvalues["remarks"] = title
        eventvalues = JSON.stringify(eventvalues)
        var yy = new Date(y);
        var zz = new Date(z);
        function convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
        }
        const ydate = convertTZ(yy, "Asia/Manila")
        const zdate = convertTZ(zz, "Asia/Manila")
        console.log("start manila: ", ydate)
        console.log("end manila: ", zdate)
        alert("Plant Monitoring for Batch "+x+"\nFrom: "+ydate+"\nTo: "+zdate)
        eventvalues && navigate(generatePath("/harvestcalendarmonitoringevent/:eventvalues", { eventvalues }));
    }
    /*const handleEventSelection = useCallback(
        (event) => window.alert(event.title + event.start),
        []
      ) */
    
    /*function handleAddEvent() {
        setallEvents([...allEvents, newEvent])
        console.log(newEvent.start)
        console.log(newEvent.end)
    }*/ //for adding event w datepickers

    const [harvestcalendarinfo, setharvestcalendarinfo] = useState([]);
    const events = []
    const [allEvents, setallEvents] = useState(events)
    const [newEvent, setnewEvent] = useState({id: "", start: "", end: ""})
    const [eventid, seteventid] = useState("")
    const [eventdatef, seteventdatef] = useState("")
    const [eventdatet, seteventdatet] = useState("")
    useEffect(() =>{
        async function fetchData(){
            await Axios.get(`http://localhost:3001/harvestcalendar/${x}`).then((response) => {
             setharvestcalendarinfo(response.data);
        })
        }
        fetchData()
    }, [x])
    useEffect(() =>{
        (async function(){
            try {
                harvestcalendarinfo.forEach((info)=>{
                    const datef = new Date(info.date_from)
                    const datet = new Date(info.date_to)
                    const remarks = info.remarks
                    const act_increment = info.act_increment
                    var newState = {title: remarks, start: datef, end: datet, act_increment: act_increment}
                    setnewEvent(newState)
                    console.log("event: ", newEvent)
                    setallEvents (prevState => [...prevState, newState])
                })
            }
            catch (e) {
                console.error(e);
              }
        })()
    }, [harvestcalendarinfo])
    console.log("event; ", newEvent)
    console.log("all: ",allEvents)

    const calendarStyle = (date) => {
        let currentDate = `${new Date().getDate()} ${new Date().getMonth()+1} ${new Date().getFullYear()}`
        let allDate = `${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}`
    
        if ( allDate === currentDate)
        return {
          style: {
            backgroundColor: '#88C9E8', 
            border: '1px solid gray',
            margin: 0,
            padding: 0,
          },
        }
    }
    var cdatetodayy = (new Date(today)).toLocaleDateString();
    var cdateend = (new Date(batchend)).toLocaleDateString();
   if(thestatus == "Active"){
    if (latestinfo.length > 0) {
        return (
            <div className='App'>
                <h1>Harvest Calendar of Batch {x}</h1>
                <br></br>
                <h6><strong>Date Today:</strong>: {cdatetodayy}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <strong>Expected Harvest Period:</strong>: {cdateend} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h6>
                 <h6><strong>Area:</strong>: {areaname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <strong>Area Size:</strong>: {areasize} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h6>
                <h3><em>Latest Data Inputted:</em></h3>
                {latestinfo.map((val)=> {
                    return (
                        <div>
                            <p>
                                <h6><strong>Plant Stage</strong>: {val.plant_stage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <strong>Quantity</strong>: {val.quantity} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <strong>Survival Rate</strong>: {val.survival_rate} </h6>
                            </p>
                            <p>
                                <h6><strong>Average Current Height in M</strong>: {val.curr_height} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <strong>Average Current Width in M:</strong> {val.curr_width} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <strong>Remarks</strong>: {val.remarks}</h6>
                            </p>
                        </div>
                    )
                })}
                <Link to="/harvestcalendarlist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                {/*<div>
                    <input type="text" placeholder='Add Title' style={{width:"20%", marginRight:"10px"}} value={newEvent.title} onChange={(e) => setnewEvent({...newEvent, title: e.target.value})} />
                </div>
                <DatePicker placeholderText='Start Date' style={{marginRight:"10px"}} selected={newEvent.start} onChange={(start) => setnewEvent({...newEvent, start})} />
                <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setnewEvent({...newEvent, end})} />
                <button style={{marginTop:"10px"}} onClick={handleAddEvent}>Add Event</button> */}
                <Calendar 
                localizer={localizer} 
                events={allEvents} 
                startAccessor="start" 
                endAccessor="end" 
                dayPropGetter={calendarStyle}
                style={{height: 500, margin: "50px"}} 
                selectable views={['month', 'day']} 
                onSelectSlot={handleSelectSlot} 
                onSelectEvent={handleEventSelection}
                onDoubleClickEvent={handleEventSelection} />
            </div>
        )
       }
       else {
        return (
            <div className='App'>
                <h1>Harvest Calendar of Batch {x}</h1>
                <br></br>
                <h6><strong>Date Today:</strong>: {cdatetodayy}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <strong>Expected Harvest Period:</strong>: {cdateend} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h6>
                 <h6><strong>Area:</strong>: {areaname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <strong>Area Size:</strong>: {areasize} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h6>
                <h3><em>No data yet</em></h3>
                <Link to="/harvestcalendarlist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
                {/*<div>
                    <input type="text" placeholder='Add Title' style={{width:"20%", marginRight:"10px"}} value={newEvent.title} onChange={(e) => setnewEvent({...newEvent, title: e.target.value})} />
                </div>
                <DatePicker placeholderText='Start Date' style={{marginRight:"10px"}} selected={newEvent.start} onChange={(start) => setnewEvent({...newEvent, start})} />
                <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setnewEvent({...newEvent, end})} />
                <button style={{marginTop:"10px"}} onClick={handleAddEvent}>Add Event</button> */}
                <Calendar 
                localizer={localizer} 
                events={allEvents} 
                startAccessor="start" 
                endAccessor="end" 
                dayPropGetter={calendarStyle}
                style={{height: 500, margin: "50px"}} 
                selectable views={['month', 'day']} 
                onSelectSlot={handleSelectSlot} 
                onSelectEvent={handleEventSelection}
                onDoubleClickEvent={handleEventSelection} />
            </div>
        )
       }
   }
   else {
    return (
        <div className='App'>
            <h1>Harvest Calendar of Batch {x} <em>(batch not active for input)</em></h1>
            <br></br>
            <h6><strong>Date Today:</strong>: {cdatetodayy}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <strong>Expected Harvest Period:</strong>: {cdateend} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h6>
             <h6><strong>Area:</strong>: {areaname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <strong>Area Size:</strong>: {areasize} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h6>
            <h3><em>Last Data Inputted:</em></h3>
            {latestinfo.map((val)=> {
                return (
                    <div>
                        <p>
                            <h6><strong>Plant Stage</strong>: {val.plant_stage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <strong>Quantity</strong>: {val.quantity} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <strong>Survival Rate</strong>: {val.survival_rate} </h6>
                        </p>
                        <p>
                            <h6><strong>Average Current Height in M</strong>: {val.curr_height} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <strong>Average Current Width in M:</strong> {val.curr_width} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <strong>Remarks</strong>: {val.remarks}</h6>
                        </p>
                    </div>
                )
            })}
            <Link to="/harvestcalendarlist"><button type="button" class="btn btn-outline-dark backbutton">Back</button></Link>
            {/*<div>
                <input type="text" placeholder='Add Title' style={{width:"20%", marginRight:"10px"}} value={newEvent.title} onChange={(e) => setnewEvent({...newEvent, title: e.target.value})} />
            </div>
            <DatePicker placeholderText='Start Date' style={{marginRight:"10px"}} selected={newEvent.start} onChange={(start) => setnewEvent({...newEvent, start})} />
            <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setnewEvent({...newEvent, end})} />
            <button style={{marginTop:"10px"}} onClick={handleAddEvent}>Add Event</button> */}
            <Calendar 
            localizer={localizer} 
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end" 
            dayPropGetter={calendarStyle}
            style={{height: 500, margin: "50px"}} 
            selectable views={['month', 'day']} 
            onSelectEvent={handleEventSelection}
            onDoubleClickEvent={handleEventSelection} />
        </div>
    )
   }
}


export default Harvestcalendar;