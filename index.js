import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import usersRouter from "./routes/users.js";
import pictureRouter from "./routes/pictures.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = "your_jwt_secret";
mongoose.connect(process.env.MONGODB_URI);
console.log("connected to mongo");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/pictures", pictureRouter);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Save the user info for use in other routes
    next();
  });
};
app.get("/", (req, res) => {
  res.send("welcome to my app");
});

app.use("/login", async (req, res) => {
  const { username, password } = req.body;

  //try {
  //     const user = await User.findOne({ username });
  //     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

  //     // Create a JWT token
  //     const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
  //       expiresIn: '1h',
  //     });

  //     res.json({ token });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });
  res.send({
    username: username,
    token: "token-test123",
  });
});

app.listen(PORT, () => console.log("server running on port: ", PORT));
