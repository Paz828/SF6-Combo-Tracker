//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Imports and such
import express from "express";
import dotenv from "dotenv";
import pkg from "pg";
import cors from "cors";

const app = express();
const { Pool } = pkg;
dotenv.config();

const port = process.env.PORT;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.static("dist"));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET request handlers

// characters table
// ALL
app.get("/characters", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM characters");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// ONE
app.get("/characters/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM characters WHERE char_id = ${id}`
    );
    if (!result.rows[0]) {
      res.status(404).send("Character not found");
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// combos table
// ALL
app.get("/combos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM combos");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//ONE
app.get("/combos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM combos WHERE combo_id = ${id}`
    );
    if (!result.rows[0]) {
      res.status(404).send("Combo not found");
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST request handlers

// characters table
app.post("/characters", async (req, res) => {
  const { char_name, char_img } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO characters (char_name, char_img) VALUES ($1, $2) RETURNING *`,
      [char_name, char_img]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// combos table
app.post("/combos", async (req, res) => {
  const { combo_inputs, combo_dmg, combo_resources, char_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO combos (combo_inputs, combo_dmg, combo_resources, char_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [combo_inputs, combo_dmg, combo_resources, char_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE request handlers

// characters table
app.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM characters WHERE char_id = ${id} RETURNING *`
    );
    if (!result.rows[0]) {
      res.status(404).send("Character not found");
    } else {
      res.status(204).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.send("Internal Server Error").status(500);
  }
});
// combos table
app.delete("/combos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM combos WHERE combo_id = ${id} RETURNING *`
    );
    if (!result.rows[0]) {
      res.status(404).send("Combo not found");
    } else {
      console.log(result.rows[0]);
      res.status(204).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.send("Internal Server Error").status(500);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PATCH request handlers

// characters table
app.patch("/characters/:id", async (req, res) => {
  const { id } = req.params;
  let input = "";

  const bodyArr = Object.keys(req.body);
  bodyArr.forEach((elem) => {
    if (!req.body[elem]) {
      return;
    } else if (typeof req.body[elem] === "string") {
      req.body[elem] = `'${req.body[elem]}'`;
    }

    if (!input) {
      input += `${elem} = ${req.body[elem]}`;
    } else {
      input += `, ${elem} = ${req.body[elem]}`;
    }
  });

  const SQLcode = `UPDATE characters SET ${input} WHERE char_id = ${id} RETURNING *;`;
  try {
    const result = await pool.query(SQLcode);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Servor Error");
  }
});
// combos table
app.patch("/combos/:id", async (req, res) => {
  const { id } = req.params;
  let input = "";

  const bodyArr = Object.keys(req.body);
  bodyArr.forEach((elem) => {
    if (!req.body[elem]) {
      return;
    } else if (typeof req.body[elem] === "string") {
      req.body[elem] = `'${req.body[elem]}'`;
    }

    if (!input) {
      input += `${elem} = ${req.body[elem]}`;
    } else {
      input += `, ${elem} = ${req.body[elem]}`;
    }
  });

  const SQLcode = `UPDATE combos SET ${input} WHERE combo_id = ${id} RETURNING *;`;
  try {
    const result = await pool.query(SQLcode);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Servor Error");
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log("Listening on port", port);
});
