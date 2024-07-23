import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import * as XLSX from 'xlsx';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'username', 'phone_number', 'gender', 'modified_by', 'modified_on', 'actions'];
  users: any[] = [];  // Ensure users is defined as an array
  selectedUserId: number | null = null;
  selection = new SelectionModel<any>(true, []);  // Add this line for selection
  selectedUserIds: number[] = [];  // Track selected user IDs

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.selection.clear();  // Clear selection on data reload
    });
  }

  deleteUser() {
    if (this.selectedUserIds.length > 0) {
      this.selectedUserIds.forEach(id => {
        this.userService.deleteUser(id).subscribe(data => {
          console.log(data);
          this.reloadData();
          this.selectedUserIds = [];  // Reset after deletion
        });
      });
    }
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Add') {
        this.addUser(result.data);
      } else if (result && result.event === 'Update') {
        this.updateUser(result.data);
      }
    });
  }

  addUser(row_obj:any) {
    const newUser = {
      username: row_obj.username,
      password: row_obj.password,
      phone_number: row_obj.phone_number,
      gender: row_obj.gender
    };

    this.userService.addUser(newUser).subscribe(data => {
      this.reloadData();
    });
  }

  updateUser(row_obj:any) {
    this.userService.updateUser(row_obj.id, row_obj).subscribe(data => {
      this.reloadData();
    });
  }

  exportSelectedData() {
    const selectedUsers = this.selection.selected;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedUsers);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'SelectedUsersData.xlsx');
  }

  // Add this method to select a user
  selectUser(id: number) {
    this.selectedUserId = id;
  }

  // Add these methods for selection
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.users.forEach(row => this.selection.select(row));
    this.updateSelectedUserIds();  // Update selected user IDs
  }

  toggleSelection(element: any) {
    this.selection.toggle(element);
    this.updateSelectedUserIds();
  }

  updateSelectedUserIds() {
    this.selectedUserIds = this.selection.selected.map(user => user.id);
  }
}
