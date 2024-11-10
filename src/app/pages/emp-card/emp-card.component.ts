import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Employee } from '../../core/app.model';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { NgIf } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-emp-card',
  standalone: true,
  imports: [ConfirmationModalComponent, NgIf],
  templateUrl: './emp-card.component.html',
  styleUrl: './emp-card.component.css'
})
export class EmpCardComponent {

  employee = input.required<Employee>();
  showActions = input.required<boolean>();
  showConfirmationModal = signal(false);
  @Output() onDelete = new EventEmitter<boolean>();


  constructor(
    private router: Router,
    private employeeService: EmployeeService,
  ) {}


  editEmp(){
    this.router.navigate(['/home/edit/'+ this.employee().id]);
  }

  deleteEmp() {
    this.showConfirmationModal.set(true);
  }

  callback(isConfirmed: boolean) {
    if (isConfirmed) {
      this.employeeService.deleteEmployee(this.employee().id);
      this.onDelete.emit(true);
    }
    this.showConfirmationModal.set(false);
  }

}
