import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const locales = {
  "en-US": require("date-fns/locale/es")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
    title: "Conferencia",
    allDay: true,
    start: new Date(2021, 9, 1),
    end: new Date(2021, 9, 2)
  },{
    title: "Almuerzo",
    start: new Date(2021, 9, 10),
    end: new Date(2021, 9, 10)
  },{
    title: "Descanso",
    start: new Date(2021, 9, 20),
    end: new Date(2021, 9, 23)
  }
]

function App() {

  const [ newEvent, setNewEvent ] = useState({title: "", start: "", end: ""})
  const [ allEvents, setAllEvents ] = useState(events)

  function handleAddEvent() {
    setAllEvents([ ...allEvents, newEvent ])
  }

  return (
    <div className="App">
      <h1 style={{ fontWeight: "700",marginTop: "20px" }}>Calendario</h1>
      <Calendar 
        localizer={localizer} 
        events={allEvents} 
        startAccessor="start" 
        endAccessor="end"
        style={{ height:500, margin: "20px" }}
      />
      <h2 style={{ fontWeight: "700",marginTop: "20px" }}>Nuevo Evento</h2>
      <div style={{display:"flex", flexWrap: "wrap", justifyContent: "center", gap:"1rem", margin:"1rem 2rem 2rem 2rem" , padding:"1rem"}}>
        <input type="text" placeholder="Add event" style={{ width:"auto", borderRadius:"4px", border: "2px solid #ccc", boxSizing: "border-box"}}
        value = {newEvent.title} onChange= {(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker 
          placeholderText="start date" style={{}}
          selected={newEvent.start} onChange= {(start) => setNewEvent({ ...newEvent, start }, console.log(start))}
        />
        <DatePicker 
          placeholderText="End date"
          selected={newEvent.end} onChange= {(end) => setNewEvent({ ...newEvent, end })}
        />
        <button type="button" className="btn btn-primary" style={{ width:"auto" }} onClick={handleAddEvent}>Agregar Evento</button>
      </div>
    </div>
  );
}

export default App;
