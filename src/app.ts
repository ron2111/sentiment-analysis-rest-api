import express from "express";
import cors from "cors";
import { getSentiment } from "./nlp";

const app = express();

app.use(express.json()); 

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.listen(4000, () => console.log("App is running http://localhost:4000")); // express server running on port 4000

 app.get("/health", (req, res) => res.send(200));
// OK Health check


// custom api for the sentiment
 app.post("/api/sentiment", (req, res) => {
   const data = req.body.data;

   const sentiment = getSentiment(data); // from the nlp.ts file

   return res.send({ sentiment });
 });
