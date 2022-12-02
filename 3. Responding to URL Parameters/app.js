const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/list.json`)
);

app.get("/api/v1/tours/:id", (req, res) => {
  /*Tambah :key/:key/:key? Untuk target URL atau  */
  console.log(req.params);
  const id = req.params.id * 1; /* trick untuk buatkan dia jadi number*/
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) { /* boleh guna "id > tours.length" atau "!tour"*/
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({ status: "success", data: { tour } });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
