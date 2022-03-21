import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ChathubService {
  constructor(private notificationService: NotificationService) {}

  hubConnection: any;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44332/CallHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.askServerListener();
        this.askbroadcastListener();
        console.log('Hub Connection Started!');
      })
      .catch((err: any) =>
        console.log('Error while starting connection: ' + err)
      );
  };

  getHubConnection() {
    return this.hubConnection;
  }

  restartHubConnection() {
    let self = this;
    return new Promise((resolve, reject) => {
      if (self.isdisConnected()) {
        self.hubConnection
          .start()
          .then((hub: any) => {
            resolve(hub);
          })
          .catch((err: any) => {
            reject(err);
          });
      }
    });
  }

  async Connect(userId: any) {
    if (this.isConnected()) {
      await this.hubConnection
        .invoke('Connect', userId)
        .catch((err: any) => console.error(err));
    } else {
      this.restartHubConnection().then(() => {
        this.hubConnection.invoke('Connect', userId).cat;
      });
    }
  }

  async SendNotification(model: any) {
    if (this.isConnected()) {
      await this.hubConnection
        .invoke('SendNotification', model)
        .catch((err: any) => console.error(err));
    } else {
      this.restartHubConnection().then(() => {
        this.hubConnection
          .invoke('SendNotification', model)
          .catch((err: any) => console.error(err));
      });
    }
  }

  askServerListener() {
    this.hubConnection.on('askServerResponse', (someText: any) => {
      this.notificationService.success(someText);
    });
  }

  askbroadcastListener() {
    this.hubConnection.on('OnbroadcastNotification', (someText: any) => {
      console.log(someText);
      this.notificationService.success(someText.description);
    });
  }

  isConnected() {
    return (
      this.hubConnection && this.hubConnection.connection.connectionState === 1
    );
  }

  isdisConnected() {
    return (
      this.hubConnection && this.hubConnection.connection.connectionState === 2
    );
  }
}
