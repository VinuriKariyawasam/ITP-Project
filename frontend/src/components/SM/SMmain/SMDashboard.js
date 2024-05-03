import React, { useState, useEffect } from "react";
import DbCard from "./SMDbCard";

function SMDashboard({ toggleLoading }) {
  const [reportCount, setReportCount] = useState(null);

  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sm/count");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReportCount(data.count);
      } catch (error) {
        console.error("Error fetching report count:", error);
        setReportCount(0); // Fallback to 0 on error
      }
    };

    fetchReportCount();
  }, []);

  const [recordCount, setRecordCount] = useState(null);

  useEffect(() => {
    const fetchRecordCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sm/records/count");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecordCount(data.count);
      } catch (error) {
        console.error("Error fetching record count:", error);
        setRecordCount(0); // Fallback to 0 on error
      }
    };

    fetchRecordCount();
  }, []);

  const [quotationCount, setQuotationCount] = useState(null);

  useEffect(() => {
    const fetchQuotationCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sm/quotations/count");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setQuotationCount(data.count);
      } catch (error) {
        console.error("Error fetching quotation count:", error);
        setQuotationCount(0); // Fallback to 0 on error
      }
    };

    fetchQuotationCount();
  }, []);

  return (
    <section>
      <div className="col">
        <div className="row">
          <DbCard
            title="Service Quotations"
            value={quotationCount !== null ? quotationCount : "Loading..."}
          />
          <DbCard
            title="Reports"
            value={reportCount !== null ? reportCount.toLocaleString() : "Loading..."}
          />
          <DbCard
            title="Service records"
            value={recordCount !== null ? recordCount.toLocaleString() : "Loading..."}
          />
        </div>
      </div>
    </section>
  );
}

export default SMDashboard;
