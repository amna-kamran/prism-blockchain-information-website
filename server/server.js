const http = require("http");
const axios = require("axios");

// Base URLs
const BASE_URL_1 = "http://3.111.196.231:10011/api/v1/rand/node";
const BASE_URL_2 = "http://{{node_ip}}/info";
const NODES_URL = "http://3.111.196.231:10011/api/v1/nodes";

// Function to get a single node and transaction data
async function getTransactionData() {
  try {
    // Fetch the node IP address
    const nodeResponse = await axios.get(BASE_URL_1);
    const nodeIp = nodeResponse.data.ip;

    if (!nodeIp) {
      throw new Error("Node IP address not found.");
    }

    // Construct the second URL
    const secondUrl = `${BASE_URL_2.replace("{{node_ip}}", nodeIp)}?id=1`;

    // Fetch the transaction data
    const transactionResponse = await axios.get(secondUrl);

    return {
      ip: nodeIp,
      transactionData: transactionResponse.data,
    };
  } catch (error) {
    console.error("Error fetching transaction data:", error.message);
    throw new Error("Failed to fetch transaction data.");
  }
}

// Function to get all nodes
async function getAllNodes() {
  try {
    const response = await axios.get(NODES_URL);
    return response.data; // Return the nodes data
  } catch (error) {
    console.error("Error fetching nodes:", error.message);
    throw new Error("Failed to fetch nodes.");
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === "/getTransactionData" && req.method === "GET") {
    try {
      const transactionData = await getTransactionData();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(transactionData));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    }
  } else if (req.url === "/getAllNodes" && req.method === "GET") {
    try {
      const nodes = await getAllNodes();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ nodes }));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
