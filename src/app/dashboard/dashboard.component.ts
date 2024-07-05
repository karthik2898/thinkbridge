import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../shared/services/apiservice.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RecordDialogComponent } from '../record-dialog/record-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  desc: string;
  location: string;
  mobile: string;
  picture: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) innerPaginator!: MatPaginator;
  constructor(public dialog: MatDialog ,private apiServie: ApiserviceService
  ){}

  displayedColumns: string[] = ['Name', 'Description', 'location', 'Mobile No.','picture','action'];
  dataSource:any;

  ngOnInit(): void {
    this.getData(null);
  }

  getData(event:any){
    console.log('event paginatpr',event)
    this.apiServie.getRecords().subscribe(
      (val:any)=>{
        console.log(val);
        this.dataSource = val;
        this.dataSource.paginator = this.innerPaginator;
      }
    )
  }


  add(){
    const dialogRef=this.dialog.open(RecordDialogComponent,{
      //  height: '40%',
        width: '60%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getData(null);
    });
   
    // this.apiServie.addRecord()
  }

  modify(row:any){
    console.log(row)
    const dialogRef = this.dialog.open(RecordDialogComponent,{
      //  height: '40%',
        width: '60%',
        data: row
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getData(null);
    });
  }

  selection = new SelectionModel<PeriodicElement>(true, []);

  delete(row:any){{
    console.log(row.id)
    this.apiServie.deleteRecord(row.id).subscribe(
      (val:any)=>{
        console.log(val);
        this.getData(null);
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }}

}
