const axios = require("axios");
const moment = require("moment");
const config = require("../../config/config");

async function getQuestions() {
  try {
    const response = await axios.get(
      "https://us-central1-teamcore-retail.cloudfunctions.net/test_mobile/api/questions",
      {
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`
        }
      }
    );
    const { date, data } = response.data;

    const formattedDate = moment(date, "D/M/YYYY").format("DD-MM-YYYY");

    const info = data.map((item) => ({
      pregunta_id: item.question_id,
      pregunta: item.question
    }));

    return {
      titulo: "Preguntas Jose Omar",
      dia: formattedDate,
      info,
      api_version: 1
    };
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    throw error;
  }
}

module.exports = { getQuestions };
