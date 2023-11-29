package com.example.exammd4employeemanagement.Service.employee;

import com.example.exammd4employeemanagement.model.Employee;
import com.example.exammd4employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class EmployeeService implements IEmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public Iterable<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public Iterable<Employee> sortIncreasing() {
        return employeeRepository.sortIncreasing();
    }

    @Override
    public Iterable<Employee> sortDecreasing() {
        return employeeRepository.sortDecreasing();
    }
}
