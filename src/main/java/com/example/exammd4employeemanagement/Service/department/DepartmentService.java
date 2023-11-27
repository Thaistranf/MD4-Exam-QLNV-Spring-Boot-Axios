package com.example.exammd4employeemanagement.Service.department;

import com.example.exammd4employeemanagement.model.Department;
import com.example.exammd4employeemanagement.repository.DepartmentRepository;
import com.example.exammd4employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartmentService implements IDepartmentService{
    @Autowired
    private DepartmentRepository departmentRepository;
    @Override
    public Iterable<Department> findAll() {
        return departmentRepository.findAll();
    }

    @Override
    public Optional<Department> findById(Long id) {
        return departmentRepository.findById(id);
    }

    @Override
    public Department save(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public void delete(Long id) {
        departmentRepository.deleteById(id);
    }
}
