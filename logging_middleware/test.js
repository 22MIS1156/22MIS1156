const { setAuthToken, Log } = require('./index');

// Paste your access_token here temporarily
setAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnaXJpZGhhcmFuc2l2YWt1bWFyOTJAZ21haWwuY29tIiwiZXhwIjoxNzc4OTMzMTI3LCJpYXQiOjE3Nzg5MzIyMjcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3MzA5Njk5MS0yMjcyLTQwZDctYmRjOC1jYzU3MDk5NTczN2QiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJnaXJpZGhhcmFuIiwic3ViIjoiODNjNTIzMjAtODQxYi00YzdhLWE3N2QtODFkMGJlZTM4YWI0In0sImVtYWlsIjoiZ2lyaWRoYXJhbnNpdmFrdW1hcjkyQGdtYWlsLmNvbSIsIm5hbWUiOiJnaXJpZGhhcmFuIiwicm9sbE5vIjoiMjJtaXMxMTU2XyIsImFjY2Vzc0NvZGUiOiJTZkZ1V2ciLCJjbGllbnRJRCI6IjgzYzUyMzIwLTg0MWItNGM3YS1hNzdkLTgxZDBiZWUzOGFiNCIsImNsaWVudFNlY3JldCI6IlFjcktXZWJKaldxZFh1V1AifQ.TYZQOOLIclwBl2JPg6WShMSFmOgYgKcpr7f3SZ0KJSc");

(async () => {
  await Log('backend', 'info', 'utils', 'Logger initialized');
  await Log('backend', 'error', 'db', 'Connection timeout to MySQL');
  await Log('frontend', 'warn', 'component', 'Button missing aria-label');
})();