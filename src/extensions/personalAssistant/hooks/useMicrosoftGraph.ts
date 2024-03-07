import * as React from "react";
import { MSGraphClientV3, MSGraphClientFactory } from "@microsoft/sp-http";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMicrosoftGraph = (
  msGraphClientFactory: MSGraphClientFactory
) => {
  const clientRef = React.useRef<MSGraphClientV3>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getClient = React.useCallback(async (): Promise<any> => {
    if (!msGraphClientFactory) {
      return undefined;
    }
    const client = await msGraphClientFactory.getClient("3");
    clientRef.current = client;
  }, [msGraphClientFactory]);

  const callMicrosoftGraphAPI = React.useCallback(
    async (
      method: "get" | "post" | "patch" | "delete",
      apiUrl: string,
      version: "v1.0" | "beta",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content?: any,
      selectProperties?: string[],
      expandProperties?: string[],
      filter?: string,
      count?: boolean
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any> => {
      if (!clientRef.current) {
        await getClient();
      }

      const query = clientRef.current.api(apiUrl).version(version);
      // eslint-disable-next-line no-unused-expressions
      typeof content === "object" && (content = JSON.stringify(content));
      // eslint-disable-next-line no-unused-expressions
      selectProperties &&
        selectProperties.length > 0 &&
        query.select(selectProperties);
      // eslint-disable-next-line no-unused-expressions
      filter && filter.length > 0 && query.filter(filter);
      // eslint-disable-next-line no-unused-expressions
      expandProperties &&
        expandProperties.length > 0 &&
        query.expand(expandProperties);
      // eslint-disable-next-line no-unused-expressions
      count && query.count(count);

      try {
        return await new Promise((resolve, reject) => {
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any, prefer-const
          let callback = (error: any, response: any, rawResponse?: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          };

          if (method === "post" || method === "patch") {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            query[method](content, callback);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            query[method](callback);
          }
        });
      } catch (error) {
        console.error(`Error calling Microsoft Graph API: ${error.message}`);
        throw error;
      }
    },
    [getClient]
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getMyDetails = async (nameOnly: boolean) => {
    const userDetails = await callMicrosoftGraphAPI("get", "/me", "v1.0");
    if (nameOnly) {
      return {
        displayName: userDetails.displayName,
      };
    } else {
      return userDetails;
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getMyTasks = async (getIncompleteTasksOnly: boolean) => {
    // if getIncompleteTasksOnly is true, then get only incomplete tasks
    if (getIncompleteTasksOnly) {
      console.log("getIncompleteTasksOnly is true");
      // get incomplete tasks
    }

    const myTasks = await callMicrosoftGraphAPI(
      "get",
      "/me/planner/tasks",
      "v1.0",
      null,
      ["title", "startDateTime", "dueDateTime", "percentComplete"],
      [],
      "percentComplete ne 100"
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return myTasks.value.map((task: any) => {
      return {
        title: task.title,
        start: task.startDateTime,
        end: task.dueDateTime,
        percentComplete: task.percentComplete,
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getMyEvents = async (futureEventsOnly: boolean) => {
    // if futureEventsOnly is true, then get only future events
    if (futureEventsOnly) {
      console.log("futureEventsOnly is true");
      // get future events
    }

    const userEvents = await callMicrosoftGraphAPI(
      "get",
      "/me/events",
      "v1.0",
      null,
      ["subject", "start", "end", "attendees", "location"]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return userEvents.value.map((event: any) => {
      return {
        title: event.subject,
        start: event.start.dateTime,
        end: event.end.dateTime,
        attendees: event.attendees,
        location: event.location,
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getMyDocuments = async (
    fileName: string,
    folderName: string,
    year: string,
    month: string
  ) => {
    console.log("fileName :::", fileName);
    console.log("folderName :::", folderName);
    console.log("Year :::", year);
    console.log("Month :::", month);
    // folder name = Client Name, Year = Child, Month = Grand Child
    try {
      const userFolder = await callMicrosoftGraphAPI(
        "get",
        `/sites/27258d92-4609-4fb8-9885-de162bc3a41e/drives/b!ko0lJwlGuE-Yhd4WK8OkHt0qgoHSDi5Lqj_0ZOS1hPN0NloQiLZeRJ1iHTnBgpTT/items/root/children?$filter=folder ne null`,
        "v1.0"
      );
      console.log(userFolder);
      const cTagRegex = /{([a-fA-F0-9-]+)}/;
      const filteredFolders = userFolder.value
        .map((li) => ({ name: li.name, id: cTagRegex.exec(li.cTag)[1] }))
        .filter((val) =>
          val.name.toLowerCase().includes(folderName.toLowerCase())
        );
      console.log(filteredFolders);
      //  Get Year wise folders
      const customerFolders = await callMicrosoftGraphAPI(
        "get",
        `/sites/27258d92-4609-4fb8-9885-de162bc3a41e/drives/b!ko0lJwlGuE-Yhd4WK8OkHt0qgoHSDi5Lqj_0ZOS1hPN0NloQiLZeRJ1iHTnBgpTT/items/${filteredFolders[0].id}/children?$filter=folder ne null`,
        "v1.0"
      );
      console.log(customerFolders);
      const yearFolder = customerFolders.value
        .map((li) => ({
          name: li.name,
          id: cTagRegex.exec(li.cTag)[1],
          webUrl: li.webUrl,
        }))
        .filter((val) => val.name.toLowerCase().includes(year.toLowerCase()));
      console.log("files:", yearFolder);

      // https://graph.microsoft.com/v1.0/sites/27258d92-4609-4fb8-9885-de162bc3a41e/drives/b!ko0lJwlGuE-Yhd4WK8OkHt0qgoHSDi5Lqj_0ZOS1hPN0NloQiLZeRJ1iHTnBgpTT/items/B6FFB591-3244-49BC-B769-E670C1D33451/children
      const yearFiles = await callMicrosoftGraphAPI(
        "get",
        `/sites/27258d92-4609-4fb8-9885-de162bc3a41e/drives/b!ko0lJwlGuE-Yhd4WK8OkHt0qgoHSDi5Lqj_0ZOS1hPN0NloQiLZeRJ1iHTnBgpTT/items/${yearFolder[0].id}/children`,
        "v1.0"
      );
      const files = yearFiles.value.map((li) => ({
        name: li.name,
        id: cTagRegex.exec(li.cTag)[1],
        webUrl: li.webUrl,
      }));
      console.log(files);
      return files ? files : "No files found";
    } catch (error) {
      return "No file found";
    }

    // need to use graph api for the document library
  };

  return { getMyDetails, getMyTasks, getMyEvents, getMyDocuments };
};
