package com.example.exammd4employeemanagement.repository;

import com.example.exammd4employeemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
