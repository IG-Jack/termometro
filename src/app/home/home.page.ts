import { Component,OnInit } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { Database, object, ref } from '@angular/fire/database';

interface Config {
  minTemp: number;
  maxTemp: number;
  unit: 'Celcius' | 'Fahrenheit';
}

interface Units {
  [key: string]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  config: Config | undefined;
  units: Units | undefined;

  temperaturaActual: number| undefined;// Valor inicial del termómetro

  constructor(private database: Database) {
    this.config = {
      minTemp: -20,
      maxTemp: 50,
      unit: 'Celcius'
    };

    this.units = {
      Celcius: '°C',
      Fahrenheit: '°F'
    };
  }

  ngOnInit():void {
    const routeBaño = ref(this.database, "casa/Baño");
    object(routeBaño).subscribe(attributes => {
      this.temperaturaActual = attributes.snapshot.val();
    });

    const tempValueInputs = document.querySelectorAll<HTMLInputElement>("input[type='text']");
    
  }
}
