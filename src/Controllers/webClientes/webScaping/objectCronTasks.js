const { lotedom1355,updateTicketStatus, updateTicketStatusAdmin, laSuerteDominicanaMD,laSuerteDominicana6,anguilla, laPrimeraNoche, laPrimeraDia, real1300, floridaNoche, floridaTarde, newYorkNoche, newYorkTarde, ganaMas, loteka1955, leidsaLS2055, leidsaDom1555, nacionalLS21, nacionalDom6 } = require('./lotteryFunction');

const cronTasks = [
  { pattern: '15 10 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 10 * * *',nombre:"control", func: anguilla },

  { pattern: '15 11 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 11 * * *',nombre:"control", func: anguilla },

  { pattern: '15 12 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 12 * * *',nombre:"control", func: anguilla },

  { pattern: '15 13 * * *',nombre:"laPrimeraDia", func: laPrimeraDia },

  { pattern: '40 13 * * *',nombre:"control", func: laPrimeraDia },

  { pattern: '50 13 * * *',nombre:"laSuerteDominicanaMD", func: laSuerteDominicanaMD },

  { pattern: '30 14 * * *',nombre:"control", func: laSuerteDominicanaMD },

  { pattern: '15 14 * * *',nombre:"real1300", func: real1300 },

  { pattern: '40 14 * * *',nombre:"control", func: real1300 },

  { pattern: '10 15 * * *',nombre:"lotedom1355", func: lotedom1355 },

  { pattern: '40 15 * * *',nombre:"control", func: lotedom1355 },

  { pattern: '50 15 * * *',nombre:"floridaTarde", func: floridaTarde },

  { pattern: '30 16 * * *',nombre:"control", func: floridaTarde },

  { pattern: '51 15 * * *',nombre:"ganaMas", func: ganaMas },

  { pattern: '30 16 * * *',nombre:"control", func: ganaMas },

  { pattern: '15 16 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '30 16 * * *',nombre:"control", func: anguilla },

  { pattern: '45 16 * * *',nombre:"newYorkTarde", func: newYorkTarde },

  { pattern: '30 17 * * *',nombre:"control", func: newYorkTarde },

  { pattern: '10 17 * * *',nombre:"leidsaDom1555", func: leidsaDom1555 },

  { pattern: '40 17 * * *',nombre:"control", func: leidsaDom1555 },

  { pattern: '15 17 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 17 * * *',nombre:"control", func: anguilla },

  { pattern: '15 18 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 18 * * *',nombre:"control", func: anguilla },

  { pattern: '15 19 * * *',nombre:"nacionalDom6", func: nacionalDom6 },

  { pattern: '40 19 * * *',nombre:"control", func: nacionalDom6 },

  { pattern: '16 19 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 19 * * *',nombre:"control", func: anguilla },

  { pattern: '17 19 * * *',nombre:"laSuerteDominicana6", func: laSuerteDominicana6 },

  { pattern: '40 19 * * *',nombre:"control", func: laSuerteDominicana6 },

  { pattern: '15 20 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 20 * * *',nombre:"control", func: anguilla },

  { pattern: '10 20 * * *',nombre:"loteka1955", func: loteka1955 },

  { pattern: '40 20 * * *',nombre:"control", func: loteka1955 },

  { pattern: '15 21 * * *',nombre:"laPrimeraNoche", func: laPrimeraNoche },

  { pattern: '40 21 * * *',nombre:"control", func: laPrimeraNoche },

  { pattern: '10 22 * * *',nombre:"leidsaLS2055", func: leidsaLS2055 },

  { pattern: '40 22 * * *',nombre:"control", func: leidsaLS2055 },

  { pattern: '16 22 * * *',nombre:"nacionalLS21", func: nacionalLS21 },

  { pattern: '40 22 * * *',nombre:"control", func: nacionalLS21 },

  { pattern: '15 23 * * *',nombre:"anguilla", func: anguilla },

  { pattern: '40 23 * * *',nombre:"control", func: anguilla },

  { pattern: '0 1 * * *',nombre:"newYorkNoche", func: newYorkNoche },

  { pattern: '30 1 * * *',nombre:"control", func: newYorkNoche },

  { pattern: '55 23 * * *',nombre:"floridaNoche", func: floridaNoche },

  { pattern: '30 0 * * *',nombre:"control", func: floridaNoche },

  { pattern: '0 4 * * *',nombre:"ticketUpdateStateAdmin", func: updateTicketStatusAdmin },

  { pattern: '0 5 * * *',nombre:"ticketUpdate", func: updateTicketStatus },
  ];
  
  module.exports = {cronTasks}