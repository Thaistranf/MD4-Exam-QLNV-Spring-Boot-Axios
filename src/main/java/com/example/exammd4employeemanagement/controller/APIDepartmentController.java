package com.example.exammd4employeemanagement.controller;

import com.example.exammd4employeemanagement.Service.department.IDepartmentService;
import com.example.exammd4employeemanagement.Service.employee.IEmployeeService;
import com.example.exammd4employeemanagement.model.Department;
import com.example.exammd4employeemanagement.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("departments")
@CrossOrigin("*")
public class APIDepartmentController {
    @Autowired
    private IDepartmentService departmentService;

    @GetMapping
    public ResponseEntity<Iterable<Department>> showList(){
        List<Department> departments = (List<Department>) departmentService.findAll();
        if (departments.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }
}
