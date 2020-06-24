$(document).ready(
	function() {
		$('#employee').hide();
		$('#about').hide();

		$('#home').show();
	}
);
//
//////////////////////////////////////////////Show & hide function
//
function ShowHome(){
	$('#employee').hide();
	$('#about').hide();
	
	$('#home').show();
};

function ShowEmployee(){
	$('#home').hide();
	$('#about').hide();
	
	$('#employee').show();
	
	RetrieveEmployee();
};

function ShowAbout(){
	$('#home').hide();
	$('#employee').hide();
	
	$('#about').show();
};
//
//////////////////////////////////////////////Employee
//
// Insert data into Employee Update Modal
function InsertDataIntoEmployeeUpdateModal(id){
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Employee/"+id+"/",
			dataType: "json",
		}).then(function(data){
			$('#uId').val(data.id);
			$('#uName').val(data.name);
			$('#uAge').val(data.age);
			$('#uGender').val(data.gender);
			$('#uAddress').val(data.address);
		});
	}
	else 
	{
		alert("ID is null");
	}
};

// Insert Employee Information
function CreateEmployee(){
	var name = document.getElementById("reName").value;
	var age = document.getElementById("reAge").value;
	var gender = document.getElementById("reGender").value;
	var address = document.getElementById("reAddress").value;
	
	if(name != "" && age != "" && gender != "" && address != "")
	{
		var postData = {
			"name": name,
			"age": age,
			"gender": gender,
			"address": address,
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Employee/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				ClearEmployeeRegisterModal();
				$('#showEmployee').click();
			}
		});
	}
	else 
	{
		alert("Please fill out this fields.");
	}
};

// Retrieve Employee Information
function RetrieveEmployee(){
	$('#employeeTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Employee/",
		dataType: "json",
	}).then(function(data){
		for(var i=0; i<data.length; i++){
			var id = data[i].id;
			var name = data[i].name;
			var age = data[i].age;
			var gender = data[i].gender;
			var address = data[i].address;
			document.getElementById("employeeTableBody").insertRow(-1).innerHTML = '<tr><td>'+id+'</td>'+
																			'<td>'+name+'</td>'+
																			'<td>'+age+'</td>'+
																			'<td>'+gender+'</td>'+
																			'<td>'+address+'</td>'+
																			'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#employeeUpdateModal" onclick="InsertDataIntoEmployeeUpdateModal('+id+');">EDIT</button></td></tr>';
		}
	});
};

// Update Employee Information by id
function UpdateEmployee(){
	var id = document.getElementById("uId").value;
	var name = document.getElementById("uName").value;
	var age = document.getElementById("uAge").value;
	var gender = document.getElementById("uGender").value;
	var address = document.getElementById("uAddress").value;
	
	if(id != "" && name != "" && age != "" && gender != "" && address != "")
	{
		var putData = {
			"name": name,
			"age": age,
			"gender": gender,
			"address": address,
		};
		$.ajax({
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Employee/"+id+"/",
			data : JSON.stringify(putData),
			dataType: "json",
			success: function(){
				ClearEmployeeUpdateModal();
				$('#showEmployee').click();
			}
		});
	}
	else 
	{
		alert("Please insert data!");
	}
};

// Delete Employee Information by id
function DeleteEmployee(){
	var id = document.getElementById("uId").value;
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Employee/"+id+"/",
			dataType: "json",
			success: function(){
				ClearEmployeeUpdateModal();
				$('#showEmployee').click();
			}
		});
	}
	else
	{
		alert("Please insert employee ID");
	}
};
//
/////////////////////////////////////////////Clear & Hide Modal Data
//
// Clear employeeRegisterModal data
function ClearEmployeeRegisterModal(){
	document.getElementById("reName").value = "";
	document.getElementById("reAge").value = "";
	document.getElementById("reGender").value = "";
	document.getElementById("reAddress").value = "";
	//
	$('#employeeRegisterModal').modal('hide');
};

// Clear employeeUpdateModal data
function ClearEmployeeUpdateModal(){
	document.getElementById("uId").value = "";
	document.getElementById("uName").value = "";
	document.getElementById("uAge").value = "";
	document.getElementById("uGender").value = "";
	document.getElementById("uAddress").value = "";
	//
	$('#employeeUpdateModal').modal('hide');
};