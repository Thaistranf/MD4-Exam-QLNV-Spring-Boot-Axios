package com.example.exammd4employeemanagement.repository;

import com.example.exammd4employeemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value = "select * from employee order by age ASC", nativeQuery = true)
    Iterable<Employee> sortIncreasing();

    @Query(value = "select * from employee order by age DESC", nativeQuery = true)
    Iterable<Employee> sortDecreasing();

    //Tim kiem theo ten employee dua vao 1 phan trong ten (Containing) va khong phan biet chu hoa / thuong (IgnoreCase)
    Iterable<Employee> findByNameContainingIgnoreCase(String name);
}
