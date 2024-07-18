const express = require("express");
const { getQuestions } = require("./actions/questionServer");

const app = express();
const port = 3000;

app.get("/questions", async (req, res) => {
  try {
    const questions = await getQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las preguntas" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
