package com.example.exammd4employeemanagement.repository;

import com.example.exammd4employeemanagement.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
