
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {
  newTableData = []
  obj={product_code: '', order_source_type: '', price_group: '', discount_class_code: '', price_level_code: '',
  price_group_desc: '', additional_discount_mult: ''}
  constructor() { }
  


  generateExcel(excelData:any) {

    //Title, Headers & Datas
    const excelTitle = excelData.excelTitle;
    const statusHeader = excelData.statusHeader;
    const requestorHeader = excelData.requestorHeader;
    const tableHeader = excelData.tableHeader;
    const commonCommentsHeader = excelData.commonCommentsHeader
    // const approveCommentsHeader = excelData.approveCommentsHeader;
    // const rejectCommentsHeader = excelData.rejectCommentsHeader;
    const statusValue = excelData.statusValue;
    const requestorValue = excelData.requestorValue;
    const tableData = excelData.tableData;
    const commentsData = excelData.commentsData;
    // const approveCommentsData = excelData.approveCommentsData;
    // const rejectCommentsData = excelData.rejectCommentsData;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(excelTitle);


    //Add Row and formatting
    worksheet.mergeCells('A1', 'G2');
    let titleRow = worksheet.getCell('A1');
    
    titleRow.value = "MatrixName: "+excelTitle;
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      // underline: 'single',
      bold: true,
      color: { argb: 'C62828' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.mergeCells('A3', 'A3');
    let statusTitleRow = worksheet.getCell('A3');

    statusTitleRow.value = statusHeader;
    statusTitleRow.font = {
      bold: true
    }
    statusTitleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' },
      bgColor: { argb: '' }
    }
    statusTitleRow.alignment = { vertical: 'middle', horizontal: 'right' }

    worksheet.mergeCells('B3', 'G3');
    let statusTitleValue = worksheet.getCell('B3');
    statusTitleValue.value = statusValue;
    statusTitleValue.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' },
      bgColor: { argb: '' }
    }
    // statusTitleValue.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.mergeCells('A4', 'A4');
    let requestorTitleRow = worksheet.getCell('A4');
    requestorTitleRow.value = requestorHeader;
    requestorTitleRow.font = {
      bold: true
    }
    requestorTitleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' },
      bgColor: { argb: '' }
    }
    requestorTitleRow.alignment = { vertical: 'middle', horizontal: 'right' }

    worksheet.mergeCells('B4', 'G4');
    let requestorTitleValue = worksheet.getCell('B4');
    requestorTitleValue.value = requestorValue;
    requestorTitleValue.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' },
      bgColor: { argb: '' }
    }
    requestorTitleValue.alignment = { vertical: 'middle', horizontal: 'left' }

    let headerRow = worksheet.addRow(tableHeader);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'C62828' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })

    // Adding Data with Conditional Formatting
    
    
    // tableData.forEach(d => {
      for(let i=0;i<tableData.length;i++){
        this.obj={product_code: '', order_source_type: '', price_group: '', discount_class_code: '', price_level_code: '',
        price_group_desc: '', additional_discount_mult: ''};
      
        this.obj.product_code = tableData[i].product_code;
        this.obj.order_source_type = tableData[i].order_source_type;
        this.obj.price_group = tableData[i].price_group;
        this.obj.discount_class_code = tableData[i].discount_class_code;
        this.obj.price_level_code = tableData[i].price_level_code;
        this.obj.price_group_desc = tableData[i].price_group_desc;
        this.obj.additional_discount_mult = tableData[i].additional_discount_mult;

        // this.newTableData.push(this.obj)
        
      }
    // });
    this.newTableData.forEach(d => {
      var values = Object.keys(d).map(function (key) { return d[key]; });
      let row = worksheet.addRow(values);
      let status = row.getCell(1)
      if (status.value == null) {
        status.value = 'Null'
      }
    }
    );

    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 25;
    worksheet.getColumn(7).width = 25;
    worksheet.addRow([]);

    if (commentsData.length > 0) {
      let rejectrow = worksheet.addRow(commonCommentsHeader);
      rejectrow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'C62828' },
          bgColor: { argb: '' }
        }
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFF' },
          size: 12
        }
      })

      commentsData.forEach((d:any) => {
        var values = Object.keys(d).map(function (key) { return d[key]; });
        let row = worksheet.addRow(values);
      });
      worksheet.getColumn(1).width = 20;
      worksheet.getColumn(2).width = 30;
      worksheet.getColumn(3).width = 30;
    }
    this.newTableData=[];

    // if(approveCommentsData.length > 0) {
    // //newly added below
    // let approverow = worksheet.addRow(approveCommentsHeader);
    // approverow.eachCell((cell, number) => {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: 'C62828' },
    //     bgColor: { argb: '' }
    //   }
    //   cell.font = {
    //     bold: true,
    //     color: { argb: 'FFFFFF' },
    //     size: 12
    //   }
    // })

    // Adding Data with Conditional Formatting
    // approveCommentsData.forEach(d => {
    //   var values = Object.keys(d).map(function (key) { return d[key]; });
    //   let row = worksheet.addRow(values);
    //     // let approverComment = row.getCell(1);
    //     // let commentedBy = row.getCell(2)
    //     // let commentedOn = row.getCell(3)
    //     // if (approverComment.value == undefined) {
    //     //     approverComment.value = 'N/A'
    //     // }
    //     // if (commentedBy.value == undefined) {
    //     //   commentedBy.value = 'N/A'
    //     // }
    //     // if (commentedOn.value == undefined) {
    //     //   commentedOn.value = 'N/A'
    //     // }
    //   });
    //     worksheet.getColumn(1).width = 25;
    //     worksheet.getColumn(2).width = 25;
    //     worksheet.getColumn(3).width = 20;
    //     worksheet.addRow([]);
    // }

    // if(rejectCommentsData.length > 0) {
    // let rejectrow = worksheet.addRow(rejectCommentsHeader);
    // rejectrow.eachCell((cell, number) => {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: 'C62828' },
    //     bgColor: { argb: '' }
    //   }
    //   cell.font = {
    //     bold: true,
    //     color: { argb: 'FFFFFF' },
    //     size: 12
    //   }
    // })

    //   rejectCommentsData.forEach(d => {
    //   var values = Object.keys(d).map(function (key) { return d[key]; });
    //   let row = worksheet.addRow(values);
    //   });
    //   worksheet.getColumn(1).width = 25;
    //   worksheet.getColumn(2).width = 25;
    //   worksheet.getColumn(3).width = 20;
    // }

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, excelTitle +  '.xlsx');
    })
  }
}