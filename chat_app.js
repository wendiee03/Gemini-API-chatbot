const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "AIzaSyCfkUJtZjeYQoUxPnlkKxK3eIy5H58SuUQ";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    while (true) {
      const input = await new Promise(resolve => {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        rl.question('Enter your question: ', answer => {
          rl.close();
          resolve(answer);
        });
      });
  
      const result = await chatSession.sendMessage(input);
      console.log(result.response.text());
    }
  }
  
  run();