import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import GradeComponent from './gradeComponent.js';

var jexcel=require('json2excel');

class App extends Component {
  constructor(){
    super();
    this.state = {
      grades: [],
      currentGrade: ''
    }
    this.updateCurrentDate = this.updateCurrentDate.bind(this);
    this.getEmployeesById = this.getEmployeesById.bind(this);
  }

  getEmployeesById(){
    let url = '';
    if(this.state.currentGrade === 'allGrades'){
      url = 'http://localhost:4000/api/employees';
    }
    else{
      url = 'http://localhost:4000/api/grades/' + this.state.currentGrade + '/employees';
    }
    let employees = [];
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

        <button onClick={this.getEmployeesById}>Submit</button>
    </div>
   
    );
  }
}

export default App;
