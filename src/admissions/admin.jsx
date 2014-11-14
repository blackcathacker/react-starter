var React = require('react');

var Students = React.createClass({
	getInitialState : function() {
		return {
			students : [{firstName : "Doug", lastName : "Pace", level : "freshman"}],
			showAdd : false
		};
	},
	showAdd : function() {
		this.setState({showAdd : true});
	},
	addStudent : function(student) {
		var students = this.state.students.concat(student);
		console.log(students);
		this.setState({students : students, showAdd : false});
	},
	removeStudent : function(student) {
		var students = this.state.students.filter(function(curStudent) {
			return curStudent !== student;
		});
		this.setState({students : students});
	},
	render : function() { 
		console.log("rendering");
		
		console.log((this.state.showAdd ? 'visible' : 'hidden'));
		var addStyle = {
			visibility: (this.state.showAdd ? 'visible' : 'hidden')
		}
		
		return <div><div class="well">
						<h1>Student Administration</h1>
							<StudentList students={this.state.students} removeStudent={this.removeStudent}/>
						<div style={{visibility : this.state.showAdd ? 'hidden' : 'visible'}}><AddStudentButton showAdd={this.showAdd}/></div>
						</div>
						<div style={addStyle}><AddStudentSection addStudent={this.addStudent}/></div>
						</div>;
	}
});

var StudentList = React.createClass({
	render : function() {
		var students = this.props.students.map((student) => {
			return <StudentDisplay student={student} removeStudent={this.props.removeStudent}/>;
		});
		return <table><thead><tr><th>First Name</th><th>Last Name</th><th>Level</th><th> </th></tr></thead><tbody>{students}</tbody></table>;
	}
});

var StudentDisplay = React.createClass({
	removeStudent : function() {
		this.props.removeStudent(this.props.student);
	},
	render : function() {
		return <tr>
			<td>{this.props.student.firstName}</td>
			<td>{this.props.student.lastName}</td>
			<td>{this.props.student.level}</td>
			<td><button onClick={this.removeStudent}>Del</button></td>
					</tr>;
	}
});

var AddStudentButton = React.createClass({
	render : function() {
		return <button onClick={this.props.showAdd}>Add New Student</button>;
	}
});

var AddStudentSection = React.createClass({
	getInitialState : function() {
		return {
			student : {firstName : '', lastName : '', level : ''}
		};
	},
	addStudent : function() {
		this.props.addStudent(this.state.student);
		this.setState({student : {firstName : '', lastName : '', level : ''}});
	},
	change : function(field, event) {
		var student = this.state.student;
		student[field] = event.target.value;
		this.setState({student : student});
	},
	render : function() {
		return <div className="well3"><h2>Add Student</h2><form>
			<label>First Name</label><input type="text" ref="firstName" value={this.state.student.firstName} onChange={this.change.bind(this, "firstName")}/>
			<label>Last Name</label><input type="text" ref="lastName" value={this.state.student.lastName} onChange={this.change.bind(this, "lastName")}/>
			<label>Level</label><input type="text" ref="level" value={this.state.student.level} onChange={this.change.bind(this, "level")}/>
			<button onClick={this.addStudent}>Add Student</button>
			</form>
			</div>;
	}
});
module.exports = Students;
