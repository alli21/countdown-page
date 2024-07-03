import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { FaCalendar } from 'react-icons/fa';

function App() {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isActive && targetDate) {
      interval = setInterval(() => {
        const now = new Date();
        const distance = targetDate - now;

        if (distance < 0) {
          clearInterval(interval);
          setIsActive(false);
        } else {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        }
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, targetDate]);

  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      setTargetDate(date);
      setError(null); 
    } else {
      setError('Invalid date format'); 
    }
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setTargetDate(null);
    setTimeLeft({});
    setError(null); 
  };

  return (
    <div className="app">
      <div className="time">
        {targetDate ? (
          <>
            <div>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</div>
          </>
        ) : (
          <div>Select a date</div>
        )}
        {error && <div className="error">{error}</div>} 
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="row">
        <DatePicker
          selected={targetDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          className="datepicker"
          placeholderText="Select date"
        />
        <FaCalendar className="calendar-icon" /> 
      </div>
    </div>
  );
}

export default App;
