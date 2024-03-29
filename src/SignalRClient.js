import * as signalR from "@microsoft/signalr";
import { HubConnectionState } from "@microsoft/signalr";

export class SignalRClient {
  constructor() {
    const connUrl = `${process.env.API_URL}/games-hub`;
    console.log("Creating new SignalR Connection", connUrl);
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(connUrl)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          console.warn("Reconnecting SignalR");
          return 1000;
        },
      })
      .build();
  }

  async startConnection() {
    await this.connection.start();
  }

  checkStatus() {
    console.warn("Status Check");
  }

  async dispose() {
    await this.connection.close();
  }
}

export const createNewClient = () => {
  return new SignalRClient();
};
