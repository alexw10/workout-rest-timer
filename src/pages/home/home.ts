import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Vibration } from '@ionic-native/vibration';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  times = [
    { seconds: 30, translated: '30 Seconds' },
    { seconds: 45, translated: '45 Seconds' },
    { seconds: 60, translated: '1 Minute' },
    { seconds: 75, translated: '1 Minute 15 Seconds' },
    { seconds: 90, translated: '1 Minute 30 Seconds' },
    { seconds: 105, translated: '1 Minute 45 Seconds' },
    { seconds: 120, translated: '2 Minutes' }
  ];

  constructor(
    public navCtrl: NavController,
    private vibration: Vibration,
    private localNotifications: LocalNotifications
  ) {}

  seconds = 0;
  subscription;

  startTimer(seconds: number) {
    let timer = Observable.timer(0, 1000);

    this.subscription = timer.subscribe(t => {
      this.seconds = t;

      if (this.seconds === seconds) {
        this.vibration.vibrate([2000, 1000, 2000]);

        this.localNotifications.schedule({
          id: 1,
          text: 'Workout Rest Timer Completed',
          sound: null
        });

        this.unsubscribe();
      }
    });
  }

  reset() {
    this.unsubscribe();
    this.seconds = 0;
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }
}
