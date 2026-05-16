const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnaXJpZGhhcmFuc2l2YWt1bWFyOTJAZ21haWwuY29tIiwiZXhwIjoxNzc4OTM1NDE0LCJpYXQiOjE3Nzg5MzQ1MTQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxMDM3MGZhNS1hMmVkLTQ4OWYtYmZhZi1mN2ZmYzUxYjNhY2YiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJnaXJpZGhhcmFuIiwic3ViIjoiODNjNTIzMjAtODQxYi00YzdhLWE3N2QtODFkMGJlZTM4YWI0In0sImVtYWlsIjoiZ2lyaWRoYXJhbnNpdmFrdW1hcjkyQGdtYWlsLmNvbSIsIm5hbWUiOiJnaXJpZGhhcmFuIiwicm9sbE5vIjoiMjJtaXMxMTU2XyIsImFjY2Vzc0NvZGUiOiJTZkZ1V2ciLCJjbGllbnRJRCI6IjgzYzUyMzIwLTg0MWItNGM3YS1hNzdkLTgxZDBiZWUzOGFiNCIsImNsaWVudFNlY3JldCI6IlFjcktXZWJKaldxZFh1V1AifQ.ddpeiLcts7p-NI0p0sBK8aWNc_qMSsg6j0qcmTmTcnU";

// priority.js
const axios = require('axios');



// Weight for each notification type
const WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopPriority(limit = 10) {
  try {
    const res = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: { Authorization: `Bearer ${TOKEN}` }
      }
    );

    const notifications = res.data.notifications || [];

    const enriched = notifications.map(n => ({
      ...n,
      weight: WEIGHTS[n.Type],
      time: new Date(n.Timestamp)
    }));

    enriched.sort((a, b) => {
      if (b.weight !== a.weight) return b.weight - a.weight;
      return b.time - a.time;
    });

    return enriched.slice(0, limit);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

(async () => {
  const top = await getTopPriority(10);
  console.table(top);
})();