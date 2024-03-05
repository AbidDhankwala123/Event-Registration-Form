import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import Success from "./Success/Success";
import { useState } from "react";

function App() {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventMobile, setEventMobile] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register setEventId={setEventId} setEventName={setEventName} setEventEmail={setEventEmail} setEventMobile={setEventMobile} setSelectedEvent={setSelectedEvent} />} />
          <Route path="/success" element={<Success eventId={eventId} eventName={eventName} eventEmail={eventEmail} eventMobile={eventMobile} selectedEvent={selectedEvent} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
