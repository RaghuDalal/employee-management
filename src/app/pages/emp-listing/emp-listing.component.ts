import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../core/app.model';
import { TitleComponent } from '../title/title.component';
import { EmpCardComponent } from '../emp-card/emp-card.component';

@Component({
  selector: 'app-emp-listing',
  standalone: true,
  imports: [TitleComponent, EmpCardComponent],
  templateUrl: './emp-listing.component.html',
  styleUrl: './emp-listing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpListingComponent implements OnInit {

  employees: WritableSignal<Employee[]> = signal([]);

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees.set(this.employeeService.getEmployees());
    
  }

  openAddEmployee(): void {
    this.router.navigate(['/home/add/new']);
  }

  openEditEmployee(empId: string): void {
    this.router.navigate([`/home/edit/${empId}`]);
  }

  handleEmpDelete(isDeleted: boolean){
    if (isDeleted) this.loadEmployees();
  }

}
