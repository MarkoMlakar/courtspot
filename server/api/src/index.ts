import express from "express";

const app = express();
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
