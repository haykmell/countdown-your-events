import React from "react";

const Form = ({
  handleSubmit,
  eventList,
  eventName,
  setEventName,
  date,
  setDate,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      style={
        eventList.length === 0 ? { margin: "0px auto" } : { margin: "0px" }
      }
    >
      <h1>Countdown events</h1>
      <div className="form-info">
        <input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          type="text"
          placeholder="Event Name"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button className="sub-btn" type="submit">
          Start
        </button>
      </div>
    </form>
  );
};

export default Form;
