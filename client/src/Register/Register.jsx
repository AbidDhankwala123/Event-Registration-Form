import React, { useState } from 'react'
import styles from "./Register.module.css"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = ({ setEventId, setEventName, setEventEmail, setEventMobile, setSelectedEvent }) => {

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [eventSessions, setEventSessions] = useState("");
  let navigate = useNavigate();

  const [error, setError] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorMobile, setErrorMobile] = useState('');
  const [errorEventSessions, setErrorEventSessions] = useState('');

  const handleName = e => setName(e.target.value);

  const handleEmail = e => setEmail(e.target.value);

  const handleMobile = e => setMobile(e.target.value);

  const handleEventSessions = e => setEventSessions(e.target.value);

  const registerUserObject = {
    name,
    email,
    mobile,
    eventSessions
  }

  const validateName = () => {
    let regex = new RegExp("^[a-zA-Z\\s]*$");
    if (regex.test(name) === false) {
      setErrorName("Name must be in Characters");
      return true;
    }
    setErrorName("");
    return false;
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail("Please enter a valid email address");
      return true;
    }
    setErrorEmail("");
    return false;
  };

  const validateMobile = () => {
    let regex = new RegExp("^[0-9]{10}$");
    if (regex.test(mobile) === false) {
      setErrorMobile("Mobile number must be 10 digits number");
      return true;
    }
    setErrorMobile("");
    return false;
  };

  const validateEventSessions = () => {
    if (eventSessions === "Select") {
      setErrorEventSessions("Please select an event session");
      return true;
    }
    setErrorEventSessions("");
    return false;
  };

  const validateAllFields = () => {
    if ((!name || name.trim().length === 0) || !email || !mobile || !eventSessions) {
      setError("All fields are required");
      return true;
    }
    setError("");
    return false;
  }

  const handleSignUp = e => {
    e.preventDefault();

    if (loading) {
      return
    }

    if (validateAllFields() || validateName() || validateEmail() || validateMobile() || validateEventSessions()) {
      return;
    }

    setLoading(true);

    axios.post(`${process.env.REACT_APP_BACKEND_URL_FOR_AUTH}/register`, registerUserObject, { headers: { "Content-Type": "application/json" } })
      .then(response => {
        console.log(response);
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000
        })
        setLoading(false);
        setEventId(response.data.id);
        setEventName(response.data.name);
        setEventEmail(response.data.email);
        setEventMobile(response.data.mobile);
        setSelectedEvent(response.data.eventSessions);
        navigate("/success");
      })
      .catch(error => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 2000
        });
        setLoading(false);
      })
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.form_container}>
        <h1>REGISTER FOR AN EVENT</h1>
        <div className={styles.signup_btn}>
          Sign Up
        </div>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name" className={styles.name}>Name</label>
            <input type="text" className={styles.name_input} name="name" value={name} onChange={handleName} onBlur={validateName} />
            <p style={{ color: "red", position: "relative", left: "30%" }}>{errorName}</p>
          </div><br />
          <div>
            <label htmlFor="email" className={styles.email}>Email</label>
            <input type="email" className={styles.email_input} name="email" value={email} onChange={handleEmail} onBlur={validateEmail} />
            <p style={{ color: "red", position: "relative", left: "30%" }}>{errorEmail}</p>
          </div><br />
          <div>
            <label htmlFor="mobile" className={styles.mobile}>Mobile</label>
            <input type="tel" className={styles.mobile_input} name="mobile" value={mobile} onChange={handleMobile} onBlur={validateMobile} />
            <p style={{ color: "red", position: "relative", left: "30%" }}>{errorMobile}</p>
          </div><br />
          <div>
            <label htmlFor="eventSessions" className={styles.eventSessions}>Event Sessions</label>
            <select name="eventSessions" className={styles.dropdown} value={eventSessions} onChange={handleEventSessions} onBlur={validateEventSessions}>
              <option>Select</option>
              <option value="Introduction to Web Development">Introduction to Web Development</option>
              <option value="Data Science Workshop">Data Science Workshop</option>
              <option value="UX/UI Design Panel Discussion">UX/UI Design Panel Discussion</option>
              <option value="Cloud Computing Trends">Cloud Computing Trends</option>
            </select>
            <p style={{ color: "red", position: "relative", left: "30%" }}>{errorEventSessions}</p>
          </div><br /><br />
          <p style={{ color: "red" }} className={styles.error}>{error}</p>
          <div>
            <button className={styles.signup_login_btn}>{loading ? "Please Wait..." : "Sign-Up"}</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register