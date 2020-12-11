import React, { useState, useEffect } from "react";
import { getLocalEvents } from "./functions/getLocalEvents";
import Form from "./components/Form";
import Events from "./components/Events";
import { mapNumber } from "./SVGCircle";
import Footer from "./components/Footer";

function App() {
  const [eventList, setEventList] = useState(getLocalEvents());
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");

  const calculateDate = (event) => {
    let realDate = "";
    let realName = "";
    let realId = "";
    if (event === undefined) {
      realDate = date;
      realName = eventName;
      realId = Date.now();
    } else {
      realDate = event.eventDate;
      realName = event.eventName;
      realId = event.id;
    }
    const currentDate = new Date().getTime();
    const eventDate = new Date(realDate).getTime();
    const distance = eventDate - currentDate;

    const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

    let timeLeft = {
      id: realId,
      eventName: realName,
      eventDate: realDate,
      isDone: false,
      date: {
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      },
      dateRadius: [
        mapNumber(daysLeft, 30, 0, 0, 360),
        mapNumber(hoursLeft, 24, 0, 0, 360),
        mapNumber(minutesLeft, 60, 0, 0, 360),
        mapNumber(secondsLeft, 60, 0, 0, 360),
      ],
    };

    if (distance < 0) {
      timeLeft.isDone = true;
    }
    return timeLeft;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = calculateDate();
    setEventList((list) => {
      return [...list, event];
    });

    setEventName("");
    setDate("");
  };

  const removeEvent = (id) => {
    setEventList((eventList) => {
      return eventList.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    let idTimeOut = "";
    if (eventList.length !== 0) {
      idTimeOut = setTimeout(() => {
        setEventList((eventList) => {
          return eventList.map((item) => {
            const calculateDate = (event) => {
              let realDate = "";
              let realName = "";
              let realId = "";
              if (event === undefined) {
                realDate = date;
                realName = eventName;
                realId = Date.now();
              } else {
                realDate = event.eventDate;
                realName = event.eventName;
                realId = event.id;
              }
              const currentDate = new Date().getTime();
              const eventDate = new Date(realDate).getTime();
              const distance = eventDate - currentDate;

              const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hoursLeft = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutesLeft = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
              );
              const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

              let timeLeft = {
                id: realId,
                eventName: realName,
                eventDate: realDate,
                isDone: false,
                date: {
                  days: daysLeft,
                  hours: hoursLeft,
                  minutes: minutesLeft,
                  seconds: secondsLeft,
                },
                dateRadius: [
                  mapNumber(daysLeft, 30, 0, 0, 360),
                  mapNumber(hoursLeft, 24, 0, 0, 360),
                  mapNumber(minutesLeft, 60, 0, 0, 360),
                  mapNumber(secondsLeft, 60, 0, 0, 360),
                ],
              };

              if (distance < 0) {
                timeLeft.isDone = true;
              }
              return timeLeft;
            };

            return calculateDate(item);
          });
        });
      }, 1000);
    }

    return () => clearTimeout(idTimeOut);
  }, [eventList, date, eventName]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventList));
  }, [eventList]);

  return (
    <>
      <div className="container">
        <Form
          handleSubmit={handleSubmit}
          eventList={eventList}
          eventName={eventName}
          setEventName={setEventName}
          date={date}
          setDate={setDate}
        />
        <Events eventList={eventList} removeEvent={removeEvent} />
      </div>
      <Footer />
    </>
  );
}

export default App;
