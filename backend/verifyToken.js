const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.cookies.token; // Retrieve the token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" }); // No token provided
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        req.userId = decoded.userd; // Attach decoded user info to the request object
       console.log("passed")
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ message: "Invalid token" }); // Token verification failed
    }
}

module.exports = verifyToken;
