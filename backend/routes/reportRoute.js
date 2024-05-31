const express = require('express');
const axios = require('axios'); // For making HTTP requests
const router = express.Router();

// Define route for report API
router.get('/', async (req, res) => {
    try {
        // Make a GET request to fetch all cases data
        const responseCases = await axios.get('https://vastu-web-app.onrender.com/api/cases');
        const casesData = responseCases.data.data; // Accessing the data property

        // Make a GET request to fetch all clients data
        const responseClients = await axios.get('https://vastu-web-app.onrender.com/api/clients');
        const clientsData = responseClients.data.data; // Accessing the data property

        // Group cases by client name
        const groupedCases = casesData.reduce((acc, currentCase) => {
            const clientName = currentCase.client;
            const clientID = currentCase.client_id;

            // Find if client ID exists in client data
            const client = clientsData.find(client => client._id === clientID); // Compare with _id
            console.log("client" , client)

            if (!acc[clientName]) {
                acc[clientName] = {
                    client: clientName,
                    cases: [],
                    statusCounts: {
                        "On Hold": 0,
                        "Ongoing": 0,
                        "Completed": 0
                    },
                    totalAmount: 0
                };
            }

            // Add reference based on client availability
            const reference = client ? client.refrance : null; // Ensure correct field name
            const joiningDate = client ? client.joiningDate : null ;

            // Add case data to client's cases array with reference
            acc[clientName].cases.push({
                ...currentCase,
                reference , 
                joiningDate
            });

            acc[clientName].statusCounts[currentCase.status]++; // Increment status count
            acc[clientName].totalAmount += parseInt(currentCase.payment); // Add payment to total amount
            return acc;
        }, {});

        // Convert groupedCases object to an array
        const finalData = Object.values(groupedCases);

        // Return the final data as the response
        res.json(finalData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
