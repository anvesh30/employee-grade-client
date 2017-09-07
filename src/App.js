import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import GradeComponent from './gradeComponent.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      grades: []
    }
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

        <select>
          <option></option>
          <option value="allGrades">All Grades</option>
          {this.state.grades.map((grade, index)=>{
            return (
                <GradeComponent grade={grade.grade} key={index}/>
            );
          })}
        </select>
    </div>
   
    );
  }
}

export default App;
