import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/app.model';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from '../title/title.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-emp-form',
  standalone: true,
  imports: [FormsModule, TitleComponent, NgFor, NgClass],
  templateUrl: './emp-form.component.html',
  styleUrl: './emp-form.component.css'
})
export class EmpFormComponent implements OnInit {

  images = [
    "assets/images/customer1.png",
    "assets/images/customer2.png",
  ];

  employee: Employee = {
    id: 0,
    name: '',
    companyName: '',
    email: '',
    contactNo: null,
    designation: 'Software Developer',
    avatar: ''
  };
  isEditMode = false;
  isValid = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    const empId = this.route.snapshot.paramMap.get('empId');
    if (empId) {
      this.isEditMode = true;
      const existingEmployee = this.employeeService.getEmployees().find(emp => emp.id === Number(empId));
      if (existingEmployee) {
        this.employee = { ...existingEmployee };
      }
    }
    
  }

  saveEmployee(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee);
    } else {
      this.employee.id = this.generate6DigitId();
      this.employeeService.addEmployee(this.employee);
    }
    this.router.navigate(['/home']);
  }

  generate6DigitId(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  goBack(){
    this.router.navigate(['/home/employees']);
  }

  selectAvatar(path: string) {
    this.employee.avatar = path;
    this.onFieldsChange(path);
  }

  isFormValid(): boolean {
    return (
      this.employee.name.trim() !== '' &&
      this.employee.companyName.trim() !== '' &&
      this.employee.email.trim() !== '' &&
      !!this.employee.contactNo &&
      this.employee.designation.trim() !== '' &&
      this.employee.avatar.trim() !== ''
    );
  }

  onFieldsChange(event: any) {
    const isValid: boolean = this.isFormValid();
    this.isValid.set(isValid);
  }

}
