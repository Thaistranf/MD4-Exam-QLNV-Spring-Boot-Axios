home()
function home(){
    axios.get("http://localhost:8081/employees").then(res => {
        let data1 = res.data;
        // console.log(data1)

        axios.get("http://localhost:8081/departments").then(res => {
            let data = res.data;

            //List employee
            let str = `
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">EmployeeCode</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Department</th>
                  <th scope="col" colspan="2">Action</th>
                </tr>
              </thead>
              <tbody>`;
            for (let i = 0; i < data1.length; i++) {
                str += `
                <tr>
                  <td>${data1[i].employeeCode}</td>
                  <td><a href="">${data1[i].name}</a></td>
                  <td>${data1[i].age}</td>
                  <td>${data1[i].salary}</td>
                  <td>${data1[i].department.departName}</td>
                  <td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editEmployeeForm">Update</button></td>
                  <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteMessage">Delete</button></td>
                </tr>`
            }
            str += `
                </tbody>
        </table>`
            // console.log(str)
            document.getElementById("body").innerHTML = str;

            // Form thêm mới employee
            str += `
        <div class="modal fade" tabindex="-1" id="addEmployeeForm" aria-labelledby="addEmployeeFormLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">                
              <!--Modal header-->
              <div class="modal-header">
                <h5 class="modal-title" id="addEmployeeFormLabel">Create employee</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>              
              <!--Modal body-->
              <div class="modal-body">               
                  <div class="form-group">
                    <label for="exampleInput1">Employee Code</label>
                    <input type="text" class="form-control" id="employeeCode" aria-describedby="emailHelp" placeholder="Enter code">            
                  </div>
                  <div class="form-group">
                    <label for="exampleInput1">Name</label>
                    <input type="text" class="form-control" id="employeeName" aria-describedby="emailHelp" placeholder="Enter name">
                  </div>
                  <div class="form-group">
                    <label for="exampleInput1">Age</label>
                    <input type="text" class="form-control" id="age" aria-describedby="emailHelp" placeholder="Enter age">
                  </div>
                  <div class="form-group">
                    <label for="exampleInput1">Salary</label>
                    <input type="text" class="form-control" id="salary" aria-describedby="emailHelp" placeholder="Enter salary">
                  </div>
                  <div class="form-group">
                    <label for="exampleInput1">Department</label>
                    <select class="custom-select" id="department">
                      <option selected>Open this select menu</option>`

            for (let i = 0; i < data.length; i++) {
                str += `
                <option value="${data[i].id}">${data[i].departName}</option>
            `
            }
            str += `
                      </select>
                  </div>
              </div>              
              <!--Modal footer-->
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="saveNewEmployee()">Save</button>
              </div>
            </div>
          </div>
        </div>`
            document.getElementById("body").innerHTML = str;

            //Form edit employee
            str += `
            <div class="modal fade" tabindex="-1" id="editEmployeeForm" aria-labelledby="editEmployeeFormLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">                
                  <!--Modal header-->
                  <div class="modal-header">
                    <h5 class="modal-title" id="editEmployeeFormLabel">Update employee</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>              
                  <!--Modal body-->
                  <div class="modal-body">               
                      <div class="form-group">
                        <label for="exampleInput1">Employee Code</label>
                        <input type="text" class="form-control" id="employeeCode" aria-describedby="emailHelp">            
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Name</label>
                        <input type="text" class="form-control" id="employeeName" aria-describedby="emailHelp">
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Age</label>
                        <input type="text" class="form-control" id="age" aria-describedby="emailHelp">
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Salary</label>
                        <input type="text" class="form-control" id="salary" aria-describedby="emailHelp">
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Department</label>
                        <select class="custom-select">
                          <option selected>Open this select menu</option>`

                for (let i = 0; i < data.length; i++) {
                    str += `
                    <option value="${data[i].id}">${data[i].departName}</option>
                `
                }
                str += `
                          </select>
                      </div>
                  </div>              
                  <!--Modal footer-->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="saveEmployee()">Save</button>
                  </div>
                </div>
              </div>
            </div>`
            document.getElementById("body").innerHTML = str;

            //Hộp thoại cảnh báo trước khi xóa
            str += `
            <div class="modal" tabindex="-1" id="deleteMessage" aria-labelledby="deleteMessageLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <!--Modal header-->
                  <div class="modal-header">
                    <h5 class="modal-title" id="deleteMessageLabel">Confirm Delete</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <!--Modal body-->
                  <div class="modal-body">
                    <p>Are you sure you want to delete this employee?</p>
                  </div>
                  <!--Modal footer-->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>
                    <button type="button" class="btn btn-danger" onclick="deleteEmployee()">Delete</button>
                  </div>
                </div>
              </div>
            </div>`
            document.getElementById("body").innerHTML = str;
        })
    })
}

function saveNewEmployee(){
    axios.post("http://localhost:8081/employees",
        {
            employeeCode: document.getElementById("employeeCode").value,
            name: document.getElementById("employeeName").value,
            age: document.getElementById("age").value,
            salary: document.getElementById("salary").value,
            department: {
                id: document.getElementById("department").value
            }
        }).then(() => {
            reloadPage()
    })
}

function saveEmployee(){
    axios.put()
}

function reloadPage(){
    location.reload()
}