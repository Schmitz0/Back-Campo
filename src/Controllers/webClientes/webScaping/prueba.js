const puppeteer = require("puppeteer");
// const { Numbers, Tickets, User, TicketNumber } = require("../../../db");
// const { Op } = require("sequelize");


async function laPrimeraDia() {
  const maxRetries = 3;
  let retryCount = 0;
  const today = new Date();
  let browser;

  while (retryCount < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "La Primera Día",
          hr: "12:00",
day:{
            [Op.between]: [startOfDay, endOfDay],
}
        },
      });

      if (numberAlready) return "Ok";

      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      const url = "https://www.conectate.com.do/loterias/la-primera";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 150000 });

      const numbersData = await page.evaluate(() => {
        const container = Array.from(document.querySelectorAll(".game-scores"));
        const numbers = container.map((element) => {
          const numberBubbles = Array.from(element.querySelectorAll(".score"));
          const numbers = numberBubbles.map((bubble) =>
            bubble.textContent.trim()
          );
          return numbers;
        });
        return numbers;
      });

      if (numbersData.length > 0 && numbersData[0].length === 3) {
        const numbers = numbersData[0];

        // Verificar si el número es "00" y ajustar el valor
        const adjustedNumbers = numbers.map((num) =>
          num === "00" ? "100" : num
        );

        await Numbers.create({
          number1: adjustedNumbers[0],
          number2: adjustedNumbers[1],
          number3: adjustedNumbers[2],
          page: "https://www.conectate.com.do/loterias/la-primera",
          nameLottery: "La Primera Día",
          hr: "12:00",
          imageUrl:
            "https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg",
          day: today,
        });
      } else {
        console.log("No se encontraron números válidos en la página.");
      }

      await browser.close();
      return;
    } catch (error) {
      retryCount++;
      console.error(`Error en el intento ${retryCount}:`, error);
      if (retryCount >= maxRetries) {
        console.error(
          "Se alcanzó el número máximo de intentos. No se pudo completar la operación."
        );
      }
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
