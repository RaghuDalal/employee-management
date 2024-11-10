import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { NgFor } from '@angular/common';
import { EmpCardComponent } from '../emp-card/emp-card.component';
import { FormControl, FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/app.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TitleComponent, NgFor, EmpCardComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {

  searchControl = new FormControl('');
  searchResults = signal<Employee[]>([]);
  searchStr = signal("");

  constructor(private employeeService: EmployeeService) {}

  searchEmp(event: any) {
    const value: string = event.target.value ? event.target.value : "";
    this.searchStr.set(value);
    if (value) {
      const results: Employee[] = this.employeeService.searchEmployees(value);
      this.searchResults.set(results);      
    } else {
      this.searchResults.set([]);
    }
    console.error("searchResults", this.searchResults());
  }

}
