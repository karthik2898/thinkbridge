import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit{
  constructor(private loaderService: LoaderService){}

  isLoading!: boolean;

  ngOnInit(){
    this.loaderService.isLoading.subscribe(
      (val:any)=>{
        this.isLoading= val;
      }
    )
  }
}
