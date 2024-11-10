import { Injectable } from '@angular/core';
import { Employee } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private storageKey = 'empManagement-data';

  constructor() { }

  getEmployees(): Employee[] {
    const employees = localStorage.getItem(this.storageKey);
    return employees ? JSON.parse(employees) : [];
  }

  // Save employee data to localStorage
  saveEmployees(employees: Employee[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  // Add new employee
  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    this.saveEmployees(employees);
  }

  // Update existing employee data
  updateEmployee(updatedEmployee: Employee): void {
    const employees = this.getEmployees();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      this.saveEmployees(employees);
    }
  }

  // Delete an employee
  deleteEmployee(id: number): void {
    let employees = this.getEmployees();
    employees = employees.filter(emp => emp.id !== id);
    this.saveEmployees(employees);
  }

  // Search employees by name or email
  searchEmployees(searchTerm: string): Employee[] {
    if (searchTerm) {
      const employees = this.getEmployees();
      const matchingEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.error("res", matchingEmployees);
      
      return matchingEmployees;
    } else return [];
  }

  // Filter employees by name or email
  filterEmployees(filterTerm: string): Employee[] {
    const employees = this.getEmployees();
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }
}
