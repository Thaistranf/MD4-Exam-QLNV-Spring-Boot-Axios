home()
function home(){
    axios.get("http://localhost:8081/employees").then(res => {
        let data1 = res.data;
        // console.log(data1)

        axios.get("http://localhost:8081/departments").then(res => {
            let data = res.data;

            //List employee
            let str = `
            <div class="row">
                <div class="col-2">
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addEmployeeForm">Add New</button>
                </div>
                <div class="col-7"></div>
                <div class="col-3">
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" id="inputSearch" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="searchData()">Search</button>
                    </form>
                </div>
            </div>
            
            <!--List employee-->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">EmployeeCode</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age
                        <div class="icon-dropdown">
                            <i class="fas fa-caret-down"></i>
                            <div class="icon-dropdown-content">
                                <button class="dropdown-item" type="button" onclick="ascending()">Ascending</button>
                                <button class="dropdown-item" type="button" onclick="decreasing()">Decreasing</button>
                            </div>
                        </div>
                  </th>
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
                  <td><a href="#" onclick="viewEmployee(${data1[i].id})">${data1[i].name}</a></td>
                  <td>${data1[i].age}</td>
                  <td>${data1[i].salary}</td>
                  <td>${data1[i].department.departName}</td>
                  <td><button onclick="employeeData(${data1[i].id})" type="button" class="btn btn-warning" data-toggle="modal" data-target="#editEmployeeForm">Update</button></td>
                  <td><button onclick="messageDelete(${data1[i].id})" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteMessage">Delete</button></td>
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
                <option value="${data[i].id}">${data[i].departName}</option>`
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
                      <input type="hidden" class="form-control" id="employeeIdUp" aria-describedby="emailHelp">                         
                      <div class="form-group">
                        <label for="exampleInput1">Employee Code</label>
                        <input type="text" class="form-control" id="employeeCodeUp" aria-describedby="emailHelp">            
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Name</label>
                        <input type="text" class="form-control" id="employeeNameUp" aria-describedby="emailHelp">
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Age</label>
                        <input type="text" class="form-control" id="ageUp" aria-describedby="emailHelp">
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Salary</label>
                        <input type="text" class="form-control" id="salaryUp" aria-describedby="emailHelp">
                      </div>
                      <div class="form-group">
                        <label for="exampleInput1">Department</label>
                        <select class="custom-select" id="departUpdate">
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
                    <input type="hidden" class="form-control" id="employeeIdDelete" aria-describedby="emailHelp">
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
            // Cú pháp đóng hộp thoại modal sau khi ấn nút save để thêm mới employee
            $("#addEmployeeForm").modal("hide");
            // Gọi lại hàm hiển thị list
            home();
    })
}

// Hàm function này sẽ lấy thông tin employee trả về từ res.data và đưa giá trị vào ô input
function employeeData(id){
    // Đóng tất cả các hộp thoại modal khác trước
    $("#addEmployeeForm").modal("hide");
    $("#deleteMessage").modal("hide");
    // Tìm employee theo id
    axios.get("http://localhost:8081/employees" + '/' + id).then(res => {
        // console.log(res.data)
        // Khi modal đã hiển thị hoàn toàn, sự kiện shown.bs.modal sẽ đc kích hoạt, thông tin đc đẩy vào input
        $('#editEmployeeForm').on('shown.bs.modal', function () {
            document.getElementById('employeeIdUp').value = res.data.id;
        });
        $('#editEmployeeForm').on('shown.bs.modal', function () {
            document.getElementById('employeeCodeUp').value = res.data.employeeCode;
        });
        $('#editEmployeeForm').on('shown.bs.modal', function () {
            document.getElementById('employeeNameUp').value = res.data.name;
        });
        $('#editEmployeeForm').on('shown.bs.modal', function () {
            document.getElementById('ageUp').value = res.data.age;
        });
        $('#editEmployeeForm').on('shown.bs.modal', function () {
            document.getElementById('salaryUp').value = res.data.salary;
        });
        $('#editEmployeeForm').on('shown.bs.modal', function () {
            document.getElementById('departUpdate').value = res.data.department.id;
        });
        // Hiển thị modal
        $('#editEmployeeForm').modal('show');
    })
}

function saveEmployee(){
    let id = document.getElementById("employeeIdUp").value
    axios.put("http://localhost:8081/employees" + '/' + id,
        {
            employeeCode: document.getElementById("employeeCodeUp").value,
            name: document.getElementById("employeeNameUp").value,
            age: document.getElementById("ageUp").value,
            salary: document.getElementById("salaryUp").value,
            department: {
                id: document.getElementById("departUpdate").value
            }
        }).then(() => {
        // Cú pháp đóng hộp thoại modal sau khi ấn nút save để thêm mới employee
        $("#editEmployeeForm").modal("hide");
        // Gọi lại hàm hiển thị list
        home();
    })
}

//Tạo 1 biến "employeeID" để hứng giá trị của id
let employeeID

//Khi click nút Delete ở table -> hàm "messageDelete" đc gọi ra trước -> lúc này biến "employeeID" mới nhận đc giá trị id
function messageDelete(id){
    employeeID = id;
}

//Dùng biến "employeeID" làm id cho hàm "deleteEmployee"
function deleteEmployee(){
    axios.delete("http://localhost:8081/employees" + '/' + employeeID).then(() => {
        // Cú pháp đóng hộp thoại modal sau khi ấn nút save để thêm mới employee
        $("#deleteMessage").modal("hide");
        // Gọi lại hàm hiển thị list
        home();
    })
}

function viewEmployee(id){
    axios.get("http://localhost:8081/employees" + '/' + id).then(res => {
        document.getElementById("body").innerHTML = `
            <h1>Employee Detail</h1>
            <label>Employee Code: </label>
            <label>${res.data.employeeCode}</label><br>
            <label>Name: </label>
            <label>${res.data.name}</label><br>
            <label>Age: </label>
            <label>${res.data.age}</label><br>
            <label>Salary: </label>
            <label>${res.data.salary}</label><br>
            <label>Department: </label>
            <label>${res.data.department.departName}</label><br>
            <a href="http://localhost:63342/Exam-MD4-Employee-Management/src/main/resources/templates/home.html?_ijt=8kl43451pjh9vtn8c09nqs4cgf&_ij_reload=RELOAD_ON_SAVE">Back to list</a>
        `
    })
}

function ascending(){
    axios.get("http://localhost:8081/employees/sortIn").then(res => {
        let data2 = res.data;
        //List employee tăng dần tuổi
        let str = `
            <h1>List of employees by age in increasing order</h1>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">EmployeeCode</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age
                        <div class="icon-dropdown">
                            <i class="fas fa-caret-down"></i>
                            <div class="icon-dropdown-content">
                                <button class="dropdown-item" type="button" onclick="ascending()">Ascending</button>
                                <button class="dropdown-item" type="button" onclick="decreasing()">Decreasing</button>
                            </div>
                        </div>
                  </th>
                  <th scope="col">Salary</th>
                  <th scope="col">Department</th>
                </tr>
              </thead>
              <tbody>`;
        for (let i = 0; i < data2.length; i++) {
            str += `
                <tr>
                  <td>${data2[i].employeeCode}</td>
                  <td><a href="#" onclick="viewEmployee(${data2[i].id})">${data2[i].name}</a></td>
                  <td>${data2[i].age}</td>
                  <td>${data2[i].salary}</td>
                  <td>${data2[i].department.departName}</td>                
                </tr>`
        }
        str += `
                </tbody>
        </table>`
        document.getElementById("body").innerHTML = str;
    })
}

function decreasing(){
    axios.get(`http://localhost:8081/employees/sortDec`).then(res => {
        let data3 = res.data;
        //List employee tăng giảm tuổi
        let str = `
            <h1>List of employees by age descends</h1>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">EmployeeCode</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age
                        <div class="icon-dropdown">
                            <i class="fas fa-caret-down"></i>
                            <div class="icon-dropdown-content">
                                <button class="dropdown-item" type="button" onclick="ascending()">Ascending</button>
                                <button class="dropdown-item" type="button" onclick="decreasing()">Decreasing</button>
                            </div>
                        </div>
                  </th>
                  <th scope="col">Salary</th>
                  <th scope="col">Department</th>
                </tr>
              </thead>
              <tbody>`;
        for (let i = 0; i < data3.length; i++) {
            str += `
                <tr>
                  <td>${data3[i].employeeCode}</td>
                  <td><a href="#" onclick="viewEmployee(${data3[i].id})">${data3[i].name}</a></td>
                  <td>${data3[i].age}</td>
                  <td>${data3[i].salary}</td>
                  <td>${data3[i].department.departName}</td>                
                </tr>`
        }
        str += `
                </tbody>
        </table>`
        document.getElementById("body").innerHTML = str;
    })
}

function searchData(){
    let employeeName = document.getElementById("inputSearch").value
    axios.get("http://localhost:8081/employees/search", {
        name: employeeName
    }).then(res => {
        let listSearchData = res.data
        console.log(listSearchData)

        //List employee
        let str = `
<!--            <div class="row">-->
<!--                <div class="col-2">-->
<!--                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addEmployeeForm">Add New</button>-->
<!--                </div>-->
<!--                <div class="col-7"></div>-->
<!--                <div class="col-3">-->
<!--                    <form class="form-inline my-2 my-lg-0">-->
<!--                        <input class="form-control mr-sm-2" type="search" id="inputSearch" placeholder="Search" aria-label="Search">-->
<!--                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="searchData()">Search</button>-->
<!--                    </form>-->
<!--                </div>-->
<!--            </div>-->
            
            <!--List employee-->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">EmployeeCode</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age
                        <div class="icon-dropdown">
                            <i class="fas fa-caret-down"></i>
                            <div class="icon-dropdown-content">
                                <button class="dropdown-item" type="button" onclick="ascending()">Ascending</button>
                                <button class="dropdown-item" type="button" onclick="decreasing()">Decreasing</button>
                            </div>
                        </div>
                  </th>
                  <th scope="col">Salary</th>
                  <th scope="col">Department</th>
                  <th scope="col" colspan="2">Action</th>
                </tr>
              </thead>
              <tbody>`;
        for (let i = 0; i < listSearchData.length; i++) {
            str += `
                <tr>
                  <td>${listSearchData[i].employeeCode}</td>
                  <td><a href="#" onclick="viewEmployee(${listSearchData[i].id})">${listSearchData[i].name}</a></td>
                  <td>${listSearchData[i].age}</td>
                  <td>${listSearchData[i].salary}</td>
                  <td>${listSearchData[i].department.departName}</td>
                  <td><button onclick="employeeData(${listSearchData[i].id})" type="button" class="btn btn-warning" data-toggle="modal" data-target="#editEmployeeForm">Update</button></td>
                  <td><button onclick="messageDelete(${listSearchData[i].id})" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteMessage">Delete</button></td>
                </tr>`
        }
        str += `
                </tbody>
        </table>`
        // console.log(str)
        document.getElementById("body").innerHTML = str;
    })
}

// function reloadPage(){
//     location.reload()
// }