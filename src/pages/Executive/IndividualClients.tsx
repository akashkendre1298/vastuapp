import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualClients = () => {
  const { executiveId } = useParams();

  const [executive, setExecutive] = useState(null);
  const [clientCount, setClientCount] = useState(0);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch executive details using executiveId
    fetch(`http://localhost:8888/api/executives/${executiveId}`)
      .then((response) => response.json())
      .then((data) => {
        setExecutive(data);
      })
      .catch((error) => {
        console.error("Error fetching executive details:", error);
      });

    // Fetch client details using executiveId
    fetch(`http://localhost:8888/api/cases/byExecutiveId/${executiveId}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the client count directly from the response
        setClientCount(data.count);
        setClients(data.clients);
      })
      .catch((error) => {
        console.error("Error fetching client details:", error);
      });
  }, [executiveId]);

  return (
    <div>
    {executive && (
      <div>
        <h1>Executive Details</h1>
        <div>
          <p>Name: {executive.firstName}</p>
          <p>Phone Number: {executive.phoneNumber}</p>
        </div>
      </div>
    )}
    <div>
      <h2>Client Information</h2>
      <div>
        <p>Number of Unique Clients: {clientCount}</p>
        <button onClick={() => console.log(clients)}>View Clients</button>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  </div>
  
  );
};

export default IndividualClients;
