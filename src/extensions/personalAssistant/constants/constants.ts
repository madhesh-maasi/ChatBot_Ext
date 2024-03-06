export const OPENAI_API_KEY =
  "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";
export const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
// export const GPT_MODELTO_USE = "gpt-3.5-turbo-0613";
// export const GPT_MODELTO_USE = "gpt-4-0613";
export const GPT_MODELTO_USE = "gpt-3.5-turbo-0125";
export const BOT_AVATAR_URL =
  "https://raw.githubusercontent.com/endore8/i-chatbot/master/assets/icon.png";
export const TRY_LATER_MESSAGE =
  "Sorry, I am unable to process your query at the moment. Please try again later.";
export const SYSTEM_MESSAGE = `
You are a personal assistant. 
Answer should be embedded in html tags surrounded in <span></span>. 
Use <b> or <i> tags to highlight the answer where needed. 
Use <ul> and <li> tags for lists. 
For events and tasks note that today is ${new Date()}.`;
export const CHAT_TEXT_PLACEHOLDER: string = "Enter your query here...";
export const FUNCTIONS = [
  {
    name: "getMyDetails",
    description: "Get the details of the current user",
    parameters: {
      type: "object",
      properties: {
        getNameOnly: {
          type: "boolean",
          description: "Get user's name only",
        },
      },
      required: ["getNameOnly"],
    },
  },
  {
    name: "getMyEvents",
    description: "Get the events in a calendar of the current user",
    parameters: {
      type: "object",
      properties: {
        getFutureEventsOnly: {
          type: "boolean",
          description: "Get future events only",
        },
      },
      required: ["getFutureEventsOnly"],
    },
  },
  {
    name: "getMyTasks",
    description: "Get the tasks from the Microsoft planner of the current user",
    parameters: {
      type: "object",
      properties: {
        getIncompleteTasksOnly: {
          type: "boolean",
          description: "Get incomplete only",
        },
      },
      required: ["getIncompleteTasksOnly"],
    },
  },
  {
    name: "getMyDocumentManagement",
    description:
      "Get the documents from the Sharepoint Document Library of the current user",
    parameters: {
      type: "object",
      properties: {
        getFileName: {
          type: "string",
          description: "Get file name",
        },
        // "getFolderName": {
        //     "type": "string",
        //     "description": "Get folder name like the main folder name basically from and some times it would be like some customer name, Ex (Need finance report from Management)"
        // },
        getPeriod: {
          type: "string",
          description:
            "Get the period like date, time, months, years, minutes, second. ex (Need last 10 days douments, Need last six months report)",
        },
        getCustomerName: {
          type: "string",
          description:
            "Get the person name like (abdul, yashar, madhesh) from the user input,if the user entered the customer name ask for customer id like Please provide Customer ID for better search.",
        },
      },
    },
  },
  {
    name: "showFunnyMessage",
    description:
      "If user's query is not related to work based personal assistance then show a funny message",
    parameters: {
      type: "object",
      required: ["funnyMessage"],
      properties: {
        funnyMessage: {
          type: "string",
          description:
            "A funny/sarcastic message to say why user's query is not related to work based personal assistance. Max 20 words.",
        },
      },
    },
  },
];
