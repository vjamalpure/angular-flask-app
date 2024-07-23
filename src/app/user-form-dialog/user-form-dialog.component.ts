import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent {
  action: string;
  local_data: any;
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;

    this.userForm = this.fb.group({
      id: [this.local_data.id],
      username: [this.local_data.username, Validators.required],
      phone_number: [this.local_data.phone_number, Validators.required],
      gender: [this.local_data.gender, Validators.required]
    });

    if (this.action === 'Add') {
      this.userForm.addControl('password', this.fb.control('', Validators.required));
    }
  }

  doAction() {
    if (this.userForm.valid) {
      this.dialogRef.close({ event: this.action, data: this.userForm.value });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
