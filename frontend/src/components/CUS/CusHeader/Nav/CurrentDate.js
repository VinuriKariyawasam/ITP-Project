// CurrentDate.js
import "./CurrentDate.css";

import React, { useState, useEffect } from "react";

function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDate(formattedDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="current-date">
      <p>{currentDate}</p>
    </div>
  );
}

export default CurrentDate;
