import React from "react";
import TrashBtn from "./TrashBtn";
import { SVGCircle } from "../SVGCircle";
import { BiAlarm } from "react-icons/bi";

const Events = ({ eventList, removeEvent }) => {
  return (
    <div className="events">
      {eventList.map((item) => {
        return (
          <div className="event" key={item.id}>
            <h2>{item.eventName}</h2>
            {item.isDone ? (
              <>
                <h2 className="cong-title">Congratulations!</h2>
                <p className="cong-text">
                  Your {item.eventName} countdown end! <BiAlarm />
                </p>
              </>
            ) : (
              <div className="event-date countdown-wrapper">
                {Object.keys(item.date).map((key, index) => {
                  return (
                    <div className="countdown-item" key={index}>
                      <SVGCircle
                        radius={item.dateRadius[index]}
                        className="cound-down-anim"
                      />
                      {item.date[key] < 10
                        ? "0" + item.date[key]
                        : item.date[key]}
                      <p>{key}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <TrashBtn id={item.id} removeEvent={removeEvent} />
          </div>
        );
      })}
    </div>
  );
};

export default Events;
