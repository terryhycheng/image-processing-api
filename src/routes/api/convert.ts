import express from "express";
const convert = express.Router();

convert.get("/", (req, res) => {
  res.send({ message: "convert page" });
});

export default convert;
