import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiserviceService } from '../shared/services/apiservice.service';

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit{
  addRecord!: FormGroup;
  selectedPic: string = '';
  selectedMarks:any;
  toast:boolean = false;
  msg:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private apiService: ApiserviceService,public dialogRef: MatDialogRef<any>){}

  ngOnInit(): void {
    console.log('incoming data',this.data)
    this.addRecord = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(10)]],
      mobile: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      picture: ['',[]],
      desc: ['',[Validators.required]],
      location: ['',[Validators.required]]
    })

    if(this.data){
      this.addRecord.controls['name'].setValue(this.data.name);
      this.addRecord.controls['mobile'].setValue(this.data.mobile);
      this.addRecord.controls['desc'].setValue(this.data.desc);
      this.addRecord.controls['location'].setValue(+this.data.location);
      this.addRecord.controls['picture'].setValue(this.data.picture);
    }
  }

onYesClick(): void {
  this.dialogRef.close(false);
}

add(){
  let payload = 
    {
      "name": this.addRecord.get('name')?.value,
      "mobile": this.addRecord.get('mobile')?.value,
      "desc": this.addRecord.get('desc')?.value,
      "location": this.addRecord.get('location')?.value,
      "picture": this.addRecord.get('picture')?.value
    }
  
  let data= JSON.stringify(payload);
  console.log(data)
  if(this.data){
    this.apiService.updateRecord(this.data.id,data).subscribe(
      (val:any)=>{
        console.log(val);
        this.onYesClick();
        this.toast= true;
        this.msg = 'Restaurant Details Updated Successfully!'
      },
      (err)=>{
        console.log(err);
        this.toast= true;
        this.msg = 'Failed to Update Restaurant Details!'
      }
    )
  }else{
    this.apiService.addRecord(data).subscribe(
      (val:any)=>{
        console.log(val);
        this.onYesClick();
        this.toast= true;
        this.msg = 'Restaurant Details Added Successfully!'
      },
      (err)=>{
        console.log(err);
        this.toast= true;
        this.msg = 'Failed to add Restaurant Details!'
      }
    )
  }
}

setOpen(val:any){
  this.toast = val;
}

  onFileSelected(event:any): void {
    const file = event.target.files[0];
    this.addRecord.controls['picture'].setValue(this.selectedPic);
    if (file) {
      // const reader = new FileReader();
      // reader.readAsArrayBuffer(file);
      // reader.onload = () => {
      // const arrayBuffer = event.target?.result as ArrayBuffer;
      // const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
      // console.log('blob',blob)
      // this.addRecord.controls['picture'].setValue(blob);
      this.selectedPic = file.name;
      this.addRecord.controls['picture'].setValue(this.selectedPic);
    };

      
    }

  

}
