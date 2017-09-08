import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import GradeComponent from './gradeComponent.js';
import Workbook from 'react-excel-workbook';

class App extends Component {
  constructor(){
    super();
    this.state = {
      grades: [],
      employees: [],
      currentGrade: ''
    }
    this.updateCurrentDate = this.updateCurrentDate.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.getEmployeesByGrade = this.getEmployeesByGrade.bind(this);
  }

  getEmployees(){
    let url = '';
    if(this.state.currentGrade === 'allGrades'){
      url = 'http://localhost:4000/api/employees';
    }
    else{
      url = 'http://localhost:4000/api/grades/' + this.state.currentGrade  + '/employees';
    }
    let employees = this.state.employees;
    this.serverRequest = $.ajax({
         url: url,
         error: function (e) {
             console.dir(e);
         },
         success: function (data) {
           console.log(data.employees);
           employees = data.employees;
         },
         async:false
     });
    this.setState((prevState, props) => {
      return {employees: employees};
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.employees != prevState.employees) {
      this.inputElement.click(); 

    }
  }

  updateCurrentDate(e){
    console.log(e.target.value);
    this.setState({currentGrade: e.target.value});
  }

  componentDidMount(){
       let grades = [];
       this.serverRequest = $.ajax({
            url: 'http://localhost:4000/api/grades',
            error: function (e) {
                console.dir(e);
            },
            success: function (data) {
              console.log(data.grades);
              grades = data.grades;
            },
            async:false
        });

        this.setState({grades: grades});      
  }

  getEmployeesByGrade(grade){
    let employees = [];
    for (var i = 0; i < this.state.employees.length; i++){
      if(this.state.employees[i].grade === grade){
        employees.push(this.state.employees[i]);
      }   
    }
     return employees;
  }

  showAllEmployees(){
    return(
        this.state.grades.map((grade, index)=>{
          return (
              <Workbook.Sheet data={this.getEmployeesByGrade(grade.grade)} name={grade.grade}>
                <Workbook.Column label="Name" value="name"/>
                <Workbook.Column label="Email" value="email"/>
              </Workbook.Sheet>
            );
          })
    );
  }

  showEmployeesByGrade(){
    return(
          <Workbook.Sheet data={this.state.employees} name={this.state.currentGrade}>
            <Workbook.Column label="Name" value="name"/>
            <Workbook.Column label="Email" value="email"/>
          </Workbook.Sheet>
    );
  }

  render() {
    return (
      <div>
        <h2>Select Grades</h2>

          <select onChange={this.updateCurrentDate} >
            <option></option>
            <option value="allGrades">All Grades</option>
            {this.state.grades.map((grade, index)=>{
              return (
                  <GradeComponent grade={grade.grade} key={index}/>
              );
            })}
          </select>

          <button onClick={this.getEmployees}>Submit</button>  

          <Workbook filename="example.xlsx"  element={<button className="hide" ref={input => this.inputElement = input} style={{ visibility:'hidden' }}/>}>
            {this.state.currentGrade === "allGrades"? this.showAllEmployees(): this.showEmployeesByGrade()}
          </Workbook>
      </div>
    );
  }
}

export default App;
