import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from 'react';
import DatePicker from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';


const locales = {
  "en-US": require("date-fns/locale/en-US")
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

  const renderCustomInputStart = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="Seleccionar Día"
      value={newEvent.start ? `${newEvent.start.day}/${newEvent.start.month}/${newEvent.start.year}` : ''}
      style={{
        textAlign: 'center',
        padding: '1rem 1.5rem',
        fontSize: '1.5rem',
        border: '1px solid #9c88ff',
        borderRadius: '100px',
        boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
        color: '#9c88ff',
        outline: 'none',
      }}
      className="my-custom-input-class" // a styling class
    />
  )
  const renderCustomInputEnd = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="Seleccionar Día"
      value={newEvent.end ? `${newEvent.end.day}/${newEvent.end.month}/${newEvent.end.year}` : ''}
      style={{
        textAlign: 'center',
        padding: '1rem 1.5rem',
        fontSize: '1.5rem',
        border: '1px solid #9c88ff',
        borderRadius: '100px',
        boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
        color: '#9c88ff',
        outline: 'none',
      }}
      className="my-custom-input-class" // a styling class
    />
  )

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
          shouldHighlightWeekends
          renderInput={renderCustomInputStart}
          value={newEvent.start} onChange= {(start) => setNewEvent({ ...newEvent, start }, console.log(start))}
        />
        <DatePicker 
          shouldHighlightWeekends
          renderInput={renderCustomInputEnd}
          value={newEvent.end} onChange= {(end) => setNewEvent({ ...newEvent, end })}
        />
        <button type="button" className="btn btn-primary" style={{ width:"auto" }} onClick={handleAddEvent}>Agregar Evento</button>
      </div>
    </div>
  );
}

export default App;
