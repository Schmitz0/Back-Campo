const puppeteer = require("puppeteer");
const { Numbers, Tickets, User, TicketNumber } = require("../../../db");
const { Op } = require("sequelize");

async function lotedom1355() {
  let browser;
  let page;

  try {
    const today = new Date();
    today.setHours(today.getHours() - 3);

    const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

    const numberAlready = await Numbers.findOne({
      where: {
        nameLottery: "LoteDom",
        hr: "13:55",
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

    page = await browser.newPage();

    const url = "https://lotedom.com/";
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".col-10.div_resultados", { timeout: 30000 }); // Espera 60 segundos en lugar de 30.

    const numbersData = await page.evaluate(() => {
      const divResultados = Array.from(
        document.querySelectorAll(".col-10.div_resultados")
      );

      const data = divResultados.map((div) => {
        const numeros = Array.from(
          div.querySelectorAll(".num_bola_blanca")
        ).map((span) => span.textContent.trim());
        return numeros;
      });

      return data;
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
        page: "https://lotedom.com/",
        nameLottery: "LoteDom",
        hr: "13:55",
        imageUrl:
          "https://enloteria.com/assets/lotedom-9aae43273ce4d8d4d5429f6f57f2fadc54012eb96fc80d6f59cfb9b72576b7e9.svg",
        day: today,
      });
    } else {
      console.log("No se encontraron números válidos en la página.");
    }
  } catch (error) {
    console.error(
      "Se produjo un error al ejecutar la función lotedom1355:",
      error
    );
  } finally {
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  }
}

async function anguilla() {
  let browser;
  let page;

  try {
    const today = new Date();
    today.setHours(today.getHours() - 4);
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const hr = `${currentHour - 1 < 10 ? "0" : ""}${currentHour - 1}:${
      currentMinute < 10 ? "0" : ""
    }00`;

    const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999);

    const numberAlready = await Numbers.findOne({
      where: {
        nameLottery: "Anguilla",
        hr: hr,
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

    page = await browser.newPage();

    const url = "https://anguillalottery.ai/es/";
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".bolas-sorteo", { timeout: 150000 }); // Espera 60 segundos en lugar de 30.

    const numbersData = await page.evaluate(() => {
      const divResultados = Array.from(
        document.querySelectorAll(".bolas-sorteo")
      );

      const data = divResultados.map((div) => {
        const numeros = Array.from(div.querySelectorAll(".numero")).map(
          (span) => {
            const textoCompleto = span.textContent.trim();
            const numero = textoCompleto.replace(/^\D+/g, ""); // Extraer los números del texto
            return numero;
          }
        );
        return numeros;
      });

      return data;
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
        page: "https://anguillalottery.ai/es/",
        nameLottery: "Anguilla",
        hr: hr,
        imageUrl:
          "https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
        day: today,
      });
    } else {
      console.log("No se encontraron números válidos en la página.");
    }
  } catch (error) {
    console.error(
      "Se produjo un error al ejecutar la función anguilla:",
      error
    );
  } finally {
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  }
}

async function laPrimeraNoche() {
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
          nameLottery: "La Primera Noche",
          hr: "20:00",
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

      if (numbersData.length > 0 && numbersData[1].length === 3) {
        const numbers = numbersData[1];

        // Verificar si el número es "00" y ajustar el valor
        const adjustedNumbers = numbers.map((num) =>
          num === "00" ? "100" : num
        );

        await Numbers.create({
          number1: adjustedNumbers[0],
          number2: adjustedNumbers[1],
          number3: adjustedNumbers[2],
          page: "https://www.conectate.com.do/loterias/la-primera",
          nameLottery: "La Primera Noche",
          hr: "20:00",
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

async function real1300() {
  let browser;
  let page;

  try {
    const today = new Date();
    today.setHours(today.getHours() - 3);

    const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

    const numberAlready = await Numbers.findOne({
      where: {
        nameLottery: "Real",
        hr: "13:00",
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

    page = await browser.newPage();
    const url = "https://www.lotoreal.com.do/";

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".result__bowls-container", { timeout: 150000 });

    const numbersData = await page.evaluate(() => {
      const container = Array.from(
        document.querySelectorAll(".result__bowls-container")
      );

      const numbers = container.map((element) => {
        const numberBubbles = Array.from(element.querySelectorAll(".bolo"));
        const numbers = numberBubbles.map((bubble) =>
          bubble.textContent.trim()
        );
        return numbers;
      });

      return numbers;
    });

    if (numbersData.length > 1 && numbersData[1].length === 3) {
      const numbers = numbersData[1];

      // Verificar si el número es "00" y ajustar el valor
      const adjustedNumbers = numbers.map((num) =>
        num === "00" ? "100" : num
      );

      await Numbers.create({
        number1: adjustedNumbers[0],
        number2: adjustedNumbers[1],
        number3: adjustedNumbers[2],
        page: "https://www.lotoreal.com.do/",
        nameLottery: "Real",
        hr: "13:00",
        imageUrl:
          "https://enloteria.com/assets/real-eeb33736cd36eff0dfb219af8954fe0ab37245bd412801ea864f6a131c3c758c.svg",
        day: today,
      });
    } else {
      console.log("No se encontraron números válidos en la página.");
    }
  } catch (error) {
    console.error(
      "Se produjo un error al ejecutar la función real1300:",
      error
    );
  } finally {
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  }
}

async function floridaTarde() {
  const maxRetries = 3; // Número máximo de intentos
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "Florida Tarde",
          hr: "14:30",
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

      page = await browser.newPage();
      const url =
        "https://www.conectate.com.do/loterias/americanas/florida-dia";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 30000 });

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
          page: "https://www.conectate.com.do/loterias/americanas/florida-dia",
          nameLottery: "Florida Tarde",
          hr: "14:30",
          imageUrl:
            "https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg",
          day: today,
        });

        break;
      } else {
        console.log("No se encontraron números válidos en la página.");
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función floridaTarde:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function floridaNoche() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 6);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "Florida Noche",
          hr: "22:45",
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

      page = await browser.newPage();
      const url =
        "https://www.conectate.com.do/loterias/americanas/florida-noche";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 30000 });

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
          page: "https://www.conectate.com.do/loterias/americanas/florida-noche",
          nameLottery: "Florida Noche",
          hr: "22:45",
          imageUrl:
            "https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg",
          day: today,
        });

        break;
      } else {
        console.log("No se encontraron números válidos en la página.");
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función floridaNoche:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function newYorkTarde() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "New York Tarde",
          hr: "15:30",
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

      page = await browser.newPage();
      const url =
        "https://www.conectate.com.do/loterias/americanas/new-york-medio-dia";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 30000 });

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
          page: "https://www.conectate.com.do/loterias/americanas/new-york-medio-dia",
          nameLottery: "New York Tarde",
          hr: "15:30",
          imageUrl:
            "https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg",
          day: today,
        });

        break;
      } else {
        console.log("No se encontraron números válidos en la página.");
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función newYorkTarde:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function newYorkNoche() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 6);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "New York Noche",
          hr: "23:30",
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

      page = await browser.newPage();
      const url =
        "https://www.conectate.com.do/loterias/americanas/new-york-noche";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 30000 });

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
          page: "https://www.conectate.com.do/loterias/americanas/new-york-noche",
          nameLottery: "New York Noche",
          hr: "23:30",
          imageUrl:
            "https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg",
          day: today,
        });

        break;
      } else {
        console.log("No se encontraron números válidos en la página.");
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función newYorkNoche:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function ganaMas() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "Gana Más",
          hr: "14:30",
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

      page = await browser.newPage();
      const url = "https://ganamas.com.do/loteria-gana-mas-resultados/";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 30000 });

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
          page: "https://ganamas.com.do/loteria-gana-mas-resultados/",
          nameLottery: "Gana Más",
          hr: "14:30",
          imageUrl:
            "https://enloteria.com/assets/ganamas-5c2fba8ccbe1a70b7b12afdf18ff38cfbf7ce032e5c7397dcb1f03e858ff4335.svg",
          day: today,
        });

        break;
      } else {
        console.log("No se encontraron números válidos en la página.");
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función ganaMas:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function loteka1955() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "Loteka",
          hr: "20:55",
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

      page = await browser.newPage();
      const url = "https://loteka.com.do/";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".bloque-loteria.quiniela", {
        timeout: 30000,
      });

      const numbersData = await page.evaluate(() => {
        const container = Array.from(
          document.querySelectorAll(".home-results.results")
        );

        const numbers = container.map((element) => {
          const numberBubbles = Array.from(element.querySelectorAll(".bola"));
          const numbers = numberBubbles.map((bubble) =>
            bubble.textContent.trim()
          );
          return numbers;
        });

        return numbers;
      });

      if (numbersData.length > 3) {
        const number = numbersData[3];

        const allNumbers = number.map((text) => {
          const numbers = text.match(/\d+/g);
          return numbers;
        });

        const response = [];

        for (const subarray of allNumbers) {
          // Validar y ajustar el valor si es "00"
          const adjustedNumber = subarray[1] === "00" ? "100" : subarray[1];
          response.push(adjustedNumber);
        }

        await Numbers.create({
          number1: response[0],
          number2: response[1],
          number3: response[2],
          page: "https://loteka.com.do/",
          nameLottery: "Loteka",
          hr: "19:55",
          imageUrl:
            "https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/focusgn.com/latinoamerica/wp-content/uploads/sites/2/2023/04/megachance-loteka.jpg",
          day: today,
        });

        break;
      } else {
        console.log("No se encontraron números válidos en la página.");
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función loteka2055:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function leidsaLS2055() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "Leidsa",
          hr: "20:55",
          day:{
              [Op.between]: [startOfDay, endOfDay],
  }
        },
      });

      if (numberAlready) return "Ok";

      const dayOfWeek = today.getDay();

      if (dayOfWeek === 0) {
        console.log("Hoy es domingo, la función no se ejecutará.");
        return;
      }

      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });

      page = await browser.newPage();
      const url = "https://www.leidsa.com/";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".css-vfrnz6", { timeout: 30000 });

      const numbersData = await page.evaluate(() => {
        const container = Array.from(document.querySelectorAll(".css-vfrnz6"));

        const numbers = container.map((element) => {
          const numberBubbles = Array.from(
            element.querySelectorAll(".css-13o2snc")
          );
          const numbers = numberBubbles.map((bubble) =>
            bubble.textContent.trim()
          );
          return numbers;
        });

        return numbers;
      });

      if (numbersData.length > 2 && numbersData[2].length === 3) {
        const numbers = numbersData[2];

        // Verificar si el número es "00" y ajustar el valor
        const adjustedNumbers = numbers.map((num) =>
          num === "00" ? "100" : num
        );

        await Numbers.create({
          number1: adjustedNumbers[0],
          number2: adjustedNumbers[1],
          number3: adjustedNumbers[2],
          page: "https://www.leidsa.com/",
          nameLottery: "Leidsa",
          hr: "20:55",
          imageUrl:
            "https://enloteria.com/assets/leidsa-26031367f0cd9ba743253bbae1c55e546de6732adf18eda71c73d4387c0da2d1.svg",
          day: today,
        });

        break;
      } else {
        console.log(
          "No se encontraron números válidos en la página. Intentando de nuevo..."
        );
        retries++;
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función leidsaLS2055:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  if (retries === maxRetries) {
    console.log(`Se agotaron los intentos (${maxRetries}).`);
  }
}

async function leidsaDom1555() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "Leidsa",
          hr: "15:55",
day:{
            [Op.between]: [startOfDay, endOfDay],
}
        },
      });

      if (numberAlready) return "Ok";

      const dayOfWeek = today.getDay();

      if (dayOfWeek !== 0) {
        console.log("La función solo se ejecutará los domingos.");
        return;
      }

      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });

      page = await browser.newPage();
      const url = "https://www.leidsa.com/";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".css-vfrnz6", { timeout: 30000 });

      const numbersData = await page.evaluate(() => {
        const container = Array.from(document.querySelectorAll(".css-vfrnz6"));

        const numbers = container.map((element) => {
          const numberBubbles = Array.from(
            element.querySelectorAll(".css-13o2snc")
          );
          const numbers = numberBubbles.map((bubble) =>
            bubble.textContent.trim()
          );
          return numbers;
        });

        return numbers;
      });

      if (numbersData.length > 2 && numbersData[2].length === 3) {
        const numbers = numbersData[2];

        // Verificar si el número es "00" y ajustar el valor
        const adjustedNumbers = numbers.map((num) =>
          num === "00" ? "100" : num
        );

        await Numbers.create({
          number1: adjustedNumbers[0],
          number2: adjustedNumbers[1],
          number3: adjustedNumbers[2],
          page: "https://www.leidsa.com/",
          nameLottery: "Leidsa",
          hr: "15:55",
          imageUrl:
            "https://enloteria.com/assets/leidsa-26031367f0cd9ba743253bbae1c55e546de6732adf18eda71c73d4387c0da2d1.svg",
          day: today,
        });

        break;
      } else {
        console.log(
          "No se encontraron números válidos en la página. Intentando de nuevo..."
        );
        retries++;
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función leidsaDom1555:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  if (retries === maxRetries) {
    console.log(`Se agotaron los intentos (${maxRetries}).`);
  }
}

async function nacionalLS21() {
  const maxRetries = 3;
  let retries = 0;
  let browser;
  let page;

  while (retries < maxRetries) {
    try {
      const today = new Date();
      today.setHours(today.getHours() - 3);

      const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

      const numberAlready = await Numbers.findOne({
        where: {
          nameLottery: "Nacional",
          hr: "21:00",
day:{
            [Op.between]: [startOfDay, endOfDay],
}
        },
      });

      if (numberAlready) return "Ok";

      const dayOfWeek = today.getDay();

      if (dayOfWeek === 0) {
        console.log("Hoy es domingo, la función no se ejecutará.");
        return;
      }

      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });

      page = await browser.newPage();
      const url = "https://www.conectate.com.do/loterias/nacional/quiniela";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 30000 });

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
          page: "https://www.conectate.com.do/loterias/nacional/quiniela",
          nameLottery: "Nacional",
          hr: "21:00",
          imageUrl:
            "https://enloteria.com/assets/nacional-6f4e8ccd25d07edb6452e418cbfab9ae8ec36f728266fc7189a6ee68e7bdd4f0.svg",
          day: today,
        });

        break;
      } else {
        console.log(
          "No se encontraron números válidos en la página. Intentando de nuevo..."
        );
        retries++;
      }
    } catch (error) {
      console.error(
        "Se produjo un error al ejecutar la función nacionalLS21:",
        error
      );
      retries++;
    } finally {
      if (page) {
        await page.close();
      }
      if (browser) {
        await browser.close();
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  if (retries === maxRetries) {
    console.log(`Se agotaron los intentos (${maxRetries}).`);
  }
}

async function nacionalDom6() {
  try {
    const today = new Date();
    today.setHours(today.getHours() - 3);

    const startOfDay = new Date(today);
startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999); 

    const numberAlready = await Numbers.findOne({
      where: {
        nameLottery: "Nacional",
        hr: "18:00",
        day:{
            [Op.between]: [startOfDay, endOfDay],
}
      },
    });

    if (numberAlready) return "Ok";

    const dayOfWeek = today.getDay();

    if (dayOfWeek !== 0) {
      console.log("La función solo se ejecutará los domingos.");
      return;
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    const url = "https://www.conectate.com.do/loterias/nacional/quiniela";

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".game-scores", { timeout: 30000 });

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
        page: "https://www.conectate.com.do/loterias/nacional/quiniela",
        nameLottery: "Nacional",
        hr: "18:00",
        imageUrl:
          "https://enloteria.com/assets/nacional-6f4e8ccd25d07edb6452e418cbfab9ae8ec36f728266fc7189a6ee68e7bdd4f0.svg",
        day: today,
      });
    } else {
      console.log("No se encontraron números válidos en la página.");
    }

    await browser.close();
  } catch (error) {
    console.error(
      "Se produjo un error al ejecutar la función nacionalDom6:",
      error
    );
  }
}

async function laSuerteDominicanaMD() {
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
          nameLottery: "La Suerte Dominicana",
          hr: "12:30",
day:{
            [Op.between]: [startOfDay, endOfDay],
}
        },
      });

      if (numberAlready) return "Ok";

      // const dayOfWeek = today.getDay();

      // if (dayOfWeek === 0) {
      //   console.log("Hoy es domingo, la función no se ejecutará.");
      //   return;
      // }

      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      const url = "https://www.conectate.com.do/loterias/la-suerte-dominicana";

      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".game-scores", { timeout: 30000 });

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
          page: "https://www.conectate.com.do/loterias/la-suerte-dominicana",
          nameLottery: "La Suerte Dominicana",
          hr: "12:30",
          imageUrl: "https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg",
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

async function laSuerteDominicana6() {
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
          nameLottery: "La Suerte Dominicana",
          hr: "18:00",
day:{
            [Op.between]: [startOfDay, endOfDay],
}
        },
      });

      if (numberAlready) return "Ok";

      // const dayOfWeek = today.getDay();

      // if (dayOfWeek === 0) {
      //   console.log("Hoy es domingo, la función no se ejecutará.");
      //   return;
      // }

      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      const url = "https://www.conectate.com.do/loterias/la-suerte-dominicana";

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

      if (numbersData.length > 0 && numbersData[1].length === 3) {
        const numbers = numbersData[1];

        // Verificar si el número es "00" y ajustar el valor
        const adjustedNumbers = numbers.map((num) =>
          num === "00" ? "100" : num
        );

        await Numbers.create({
          number1: adjustedNumbers[0],
          number2: adjustedNumbers[1],
          number3: adjustedNumbers[2],
          page: "https://www.conectate.com.do/loterias/la-suerte-dominicana",
          nameLottery: "La Suerte Dominicana",
          hr: "18:00",
          imageUrl: "https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg",
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

async function updateTicketStatusAdmin() {
  try {

    const ticketsWithMatchingNumbers = await Tickets.findAll({
      where: {
        state: "Activo",
        stateAdmin:null,
        createdAt: {
          [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        model: TicketNumber,
      },
    });

    const matchingNumbersInDatabase = await Numbers.findAll({
      where: {
        day: {
          [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
    });

    const matchingTickets = [];

    for (const ticket of ticketsWithMatchingNumbers) {
      const matchingNumbers = ticket?.TicketNumbers.map((ticketNumber) => ticketNumber.number);
      const matchingBets = ticket?.TicketNumbers.map((c) => c.bet);

      const user = await User.findOne({
        where: {
          id: ticket.dataValues.userId,
        },
      });


      const validationLottery = await Numbers.findOne({
        where: {
            nameLottery: ticket.lotteryName,
            hr: ticket.lotteryHr,
            day:{
              [Op.and]: [
                Sequelize.where(Sequelize.fn('DATE', Sequelize.col('day')), Sequelize.fn('DATE', ticket.createdAt))
            ]
          }
        }
    });


    if(validationLottery) {
    
    const { number1, number2, number3 } = validationLottery?.dataValues;

    let total1 = 0
    let total2 = 0
    let total3 = 0

        if((matchingNumbers[0]) === number1)  total1 =  matchingBets[0] * user.dataValues.firstPrize;
        if((matchingNumbers[1]) === number2)  total2 = matchingBets[1] * user.dataValues.SecondPrize;
        if((matchingNumbers[2]) === number3) total3 = matchingBets[2] * user.dataValues.ThirdPrize;

        if((total1+total2+total3) > 0){
        await ticket.update({
          stateAdmin: "GNC",
          winningPrize: total1 + total2 + total3,
        });
      }
    } 
    }


  } catch (error) {
    console.error(error);

  }
}

async function updateTicketStatus() {
  try {
    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() - 7);

    const ticketsExpirados = await Tickets.update(
      { state: "Expirado" },
      {
        where: {
          createdAt: {
            [Op.lte]: expiredDate,
          },
          state: "Activo",
          stateAdmin: "GNC",
        },
      }
    );

    console.log(
      `Se actualizaron ${ticketsExpirados[0]} tickets a estado Expirado.`
    );
  } catch (error) {
    console.error("Error al actualizar tickets expirados:", error);
  }
}

module.exports = {
  updateTicketStatus,
  updateTicketStatusAdmin,
  laSuerteDominicanaMD,
  laSuerteDominicana6,
  nacionalDom6,
  leidsaDom1555,
  nacionalLS21,
  leidsaLS2055,
  lotedom1355,
  anguilla,
  laPrimeraDia,
  laPrimeraNoche,
  real1300,
  floridaNoche,
  floridaTarde,
  newYorkNoche,
  newYorkTarde,
  ganaMas,
  loteka1955,
};
