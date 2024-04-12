import React from "react";
import DbCard from "./SMDbCard";

function SMDashboard() {
  return (
    <section>
      <div className="col">
        <div className="row">
          <DbCard

            title="Service Quotations"

            value="02"
          />
          <DbCard
            title="Reports"
            value="150+"
          />
          <DbCard
            title="Service records"
            value="100+"
          />
        </div>

      </div>
    </section>
  );
}

export default SMDashboard;
