import { Component, OnInit } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    monthYearSelected: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker-cell-editor',
  templateUrl: './date-picker-cell-editor.component.html',
  styleUrls: ['./date-picker-cell-editor.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ]
})
export class DatePickerCellEditorComponent implements OnInit {
  private params!: ICellEditorParams;
  dateControl = new FormControl();
  placeholder: string = 'Select date'; // Define the placeholder property

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.dateControl.setValue(params.value ? new Date(params.value) : null);
    this.placeholder = params.colDef.headerName || 'Select date'; // Initialize the placeholder
  }

  getValue(): any {
    return this.dateControl.value ? this.dateControl.value.toISOString().split('T')[0] : null;
  }

  onDateChange(event: any): void {
    this.params.stopEditing();
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }
}
