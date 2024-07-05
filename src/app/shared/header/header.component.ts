import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  url:any;
  constructor(private loaderService: LoaderService,private ac: ActivatedRoute, private router: Router){
    console.log(router.url);  
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url= event.url;
        console.log('Current URL:', event.url);
      }
    });
  }

  isLogged!: boolean;

  ngOnInit(){       
    this.loaderService.isLoading.subscribe(
      (val:any)=>{
        this.isLogged= val;
      }
    )
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }
}
