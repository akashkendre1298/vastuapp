import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualClients = () => {
  const { executiveId } = useParams();
  const [executive, setExecutive] = useState(null);

  useEffect(() => {
    // Fetch executive details using executiveId
    fetch(`http://localhost:8888/api/executives/${executiveId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming data contains the details of the executive
        setExecutive(data);
      })
      .catch((error) => {
        console.error("Error fetching executive details:", error);
      });
  }, [executiveId]);

  return (
    <div>
      {executive && (
        <>
          <h1>Executive Details</h1>
          <p>Name: {executive.firstName}</p>
          <p>Phone Number: {executive.phoneNumber}</p>
          {/* Other details */}
        </>
      )}
    </div>
  );
};

export default IndividualClients;
