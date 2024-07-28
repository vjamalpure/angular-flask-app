import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.css']
})
export class NewDashboardComponent {
  columnDefs: ColDef[] = [
    { headerName: 'User Name', field: 'userName' },
    {
      headerName: 'DOB',
      field: 'dob',
      editable: true,
      cellEditor: 'datePickerCellEditor'
    },
    {
      headerName: 'Gender',
      field: 'gender',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Male', 'Female', 'Other']
      }
    },
    { headerName: 'Phone Number', field: 'phoneNumber' }
  ];

  rowData = [
    { userName: 'John Doe', dob: '1990-01-01', age: 34, gender: 'Male', phoneNumber: '123-456-7890' },
    { userName: 'Jane Smith', dob: '1985-05-15', age: 39, gender: 'Female', phoneNumber: '098-765-4321' },
    { userName: 'Alice Johnson', dob: '1992-07-30', age: 31, gender: 'Female', phoneNumber: '555-555-5555' }
  ];
}
