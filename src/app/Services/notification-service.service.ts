import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private hubConnection!: signalR.HubConnection;
  private notificationSubject = new Subject<string>();

  constructor() {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.globalUrl + '/notificationHub')
      .build();

    this.hubConnection.start().then(() => {
      console.log('Connection started');
    }).catch(err => console.error('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveNotification', (message: string) => {
      console.log('Notification received in service: ', message);
      this.notificationSubject.next(message);
    });
  }

  public getNotifications(): Observable<string> {
    return this.notificationSubject.asObservable();
  }
}
