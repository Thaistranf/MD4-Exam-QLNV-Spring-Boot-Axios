package com.example.exammd4employeemanagement.controller;

import com.example.exammd4employeemanagement.Service.employee.IEmployeeService;
import com.example.exammd4employeemanagement.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("employees")
@CrossOrigin("*")
public class APIEmployeeController {
    @Autowired
    private IEmployeeService employeeService;

    @GetMapping
    public ResponseEntity<Iterable<Employee>> showList(){
        List<Employee> employees = (List<Employee>) employeeService.findAll();
        if (employees.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id){
        Optional<Employee> employeeOptional = employeeService.findById(id);
        if (!employeeOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employeeOptional.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Employee> save(@RequestBody Employee employee){
        return new ResponseEntity<>(employeeService.save(employee), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee employee){
        Optional<Employee> employeeOptional = employeeService.findById(id);
        if (employeeOptional.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        //Thiet lap id cho doi tuong employee bang id lay tu bang CSDL
        //Neu doi tuong employee ko co id, ham save se hieu la "them moi" thay vi "cap nhat"
        employee.setId(employeeOptional.get().getId());
        return new ResponseEntity<>(employeeService.save(employee), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Employee> delete(@PathVariable Long id){
        employeeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
