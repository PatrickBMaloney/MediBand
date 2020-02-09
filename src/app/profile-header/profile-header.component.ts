import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { patient, patient1 } from 'src/app/patient';
import { TextfileConverterService } from '../textfile-converter.service';

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
  providers: [DatePipe],
})

export class ProfileHeaderComponent implements OnInit {
  PATIENT = patient1;
  old_size:any = 0;
  call_function:boolean = false;

  constructor(public textFileConverterService: TextfileConverterService) { 
  }

  getData(): Promise<string> {
    return this.textFileConverterService.getPatientId().toPromise();
  }

  async ngOnInit() {
    var serial_output = await this.getData();
    var serial_output_array = serial_output.toString().trim().split("\n");
    
    var new_size = serial_output_array.length;

    if (new_size > this.old_size) {
      this.call_function = true;
    }
    this.old_size = new_size;
    var last_index = new_size - 1;
    var patient_id = serial_output_array[last_index];

    if (this.call_function){
      // TODO: Call Marwan's API Get Request with patient_id & remove console.log
      console.log(patient_id);
    }
    else {
      console.log("Bracelet was not tapped.")
    }
  }

  getAge(date:string) : string {
    return "";
  }
}