const { response } = require('../../../utils');
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Extract variables from the request body
    const {
      to,
      // Add other variables as needed
    } = req.body;

    console.log('estoy aca');

    // Construct the WhatsApp message payload
    const whatsappPayload = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: "comprobante2",
        language: {
          code: "es_AR",
        },
        components: [
          // Customize this part based on your template structure and variables
          // For example, you might have a dynamic array of parameters
          // that you iterate through to construct the components array.
          // This is a simplified example.
          {
            type: 'body',
            parameters: [
              {
                "type": "date_time",
                "date_time": {
                    "fallback_value": "MONTH DAY, YEAR"
                }
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            },
            {
                "type": "text",
                "text": "TEXT_STRING"
            }
              // Add other parameters as needed
            ],
          },
        ],
      },
    };

    // Send the WhatsApp message
    const response = await axios.post('https://graph.facebook.com/v17.0/131712886701836/messages', whatsappPayload, {
      headers: {
        'Authorization': 'Bearer EAAJO0S1tLTUBO2bXDVPm6FV2XTn6uLfF6jWyEMzLLIKd3HsXVT128oIOfLTyDUjwOa9oaPllARgJAeuog6ajx8YIuU0HYvoKlnXy3IUZChsZBlEky5kw6Fr2VbQ0IwoljtnifrIm87devC4KOE7zyZAQAzPfj8Ce2ZAb3p7JfSvt1eRA6t0vXuxSONdZBp6MktFLN6hewlmMAJbNV',
        'Content-Type': 'application/json',
      },
  });

    // Handle the response from the WhatsApp API
    console.log(response.data);

    // Respond to the client
    response(res, 200, 'WhatsApp message sent successfully');
  } catch (error) {
    console.error(error);
    response(res, 500, 'Internal Server Error');
  }
};

