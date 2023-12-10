package com.example.exammd4employeemanagement.Service.employee;

import com.example.exammd4employeemanagement.Service.IGeneralService;
import com.example.exammd4employeemanagement.model.Employee;

public interface IEmployeeService extends IGeneralService<Employee> {
    Iterable<Employee> sortIncreasing();
    Iterable<Employee> sortDecreasing();

    Iterable<Employee> search(String name);
}
