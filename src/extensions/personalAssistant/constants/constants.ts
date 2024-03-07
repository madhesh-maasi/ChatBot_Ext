export const OPENAI_API_KEY =
  "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";
export const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
export const GPT_MODELTO_USE = "gpt-3.5-turbo-0613";
// export const GPT_MODELTO_USE = "gpt-4-0613";
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
    description: `Retrieve the list of documents for the client. When the user clicks on a document name, it will open in a new tab in the browser. For example, you can use HTML anchor tags like this: <a href='file's web URL' target='_blank'>Filename</a>. Input from users might include information such as "Yaser's 2021 May Relieving Document", where "Yaser" is the folder name, "2021" is the year, "May" is the month, and "Relieving" is the file name.`,
    parameters: {
      type: "object",
      properties: {
        getFileName: {
          type: "string",
          description: `Retrieve the file names while excluding the term 'document' in the document name. For instance, if the file is named 'John's April 2023 Policy Document', the output should be 'John's April 2023 Policy'.`,
        },
        getFolderName: {
          type: "string",
          description: `The folder name consistently features a person's name, with the possibility of including a customer ID. For instance, the format might be either just the ID (e.g., 10001) or a combination of the ID and the person's name (e.g., 10001-Ramesh).`,
        },
        getYear: {
          type: "string",
          description: `Obtain the year, represented as a four-digit number such as 2021, 2022, or 2023.`,
        },
        getMonth: {
          type: "string",
          description: `Retrieve the months in various formats, encompassing both their full names (e.g., January) and abbreviated forms (e.g., Jan), spanning all twelve months. Additionally, ensure that if the user enters the full name of a month, the abbreviated form is returned (e.g., if "January" is entered, the output should be "Jan"; if "June" is entered, the output should be "Jun").`,
        },
      },
    },
  },
  {
    name: "showFunnyMessage",
    description: `If user's query is not related to work based personal assistance then show a funny message`,
    parameters: {
      type: "object",
      required: ["funnyMessage"],
      properties: {
        funnyMessage: {
          type: "string",
          description: `A funny/sarcastic message to say why user's query is not related to work based personal assistance. Max 20 words.`,
        },
      },
    },
  },
];
