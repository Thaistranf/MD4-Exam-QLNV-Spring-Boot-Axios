package com.example.exammd4employeemanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String employeeCode;
    private String name;
    private Integer age;
    private Integer salary;

    @ManyToOne
    private Department department;
}
