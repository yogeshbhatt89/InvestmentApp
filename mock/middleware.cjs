module.exports = (req, res, next) => {
  if (req.method === 'POST' && (req.url === '/auth/login' || req.url === '/auth/register')) {
    // Return predefined static responses for auth endpoints
    const responses = {
      "/auth/login": { message: "Login successful", code: 200 },
      "/auth/register": { message: "Registration successful", code: 201 }
    };
    return res.json(responses[req.url]);
  }
  next(); // Proceed to normal JSON Server behavior for other endpoints
};
