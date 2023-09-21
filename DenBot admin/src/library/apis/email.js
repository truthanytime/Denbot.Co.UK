
export const sendEmailToZapier = async (data, messages) => {

  const body = data;
  const zapierUrl = body?.zapierUrl;

  body?.zapierUrl && delete body.zapierUrl;

  console.log('Messages for email:', messages);
  console.log('Email Data: ', body);

  if (zapierUrl) {
    const chatHistoryEmailTemplate = generateChatHistoryEmailTemplate(messages);
    try {
      await fetch(zapierUrl, {
        method: 'POST',
        body: JSON.stringify({ ...body, messages: chatHistoryEmailTemplate })
      });
    } catch (error) {
      return { message: 'Message sending error.', code: 500 }
    }
    console.log(chatHistoryEmailTemplate); // Use the generated template to send the email  
  } else {
    return { message: 'Your ZapierUrl is missing.', code: 400 }
  }
  return { message: 'Successfully sent the email.', code: 200 }

}

function generateChatHistoryEmailTemplate(history) {
  // Opening HTML tags and CSS styling
  let emailTemplate = `
      <html>
        <head>
          <style>
            /* Add CSS styles here for the email template */
          </style>
        </head>
        <body>
          <h2>Chat History</h2>
          <ul>`;

  // Loop through the chat history and add messages to the email template
  history.forEach((message) => {
    const { avatar, content, createdAt, type, self } = message;

    // Format the message based on the type (text, image, etc.)
    let formattedMessage = '';
    if (type === 'text') {
      formattedMessage = `<li><strong>${self ? 'User' : 'Bot'}:</strong> ${content}</li>`;
    } else if (type === 'image') {
      formattedMessage = `<li><strong>${self ? 'User' : 'Bot'}:</strong> <img src="${content}" alt="Image" /></li>`;
    }

    emailTemplate += formattedMessage;
  });

  // Closing HTML tags
  emailTemplate += `
          </ul>
        </body>
      </html>`;

  return emailTemplate;
}

