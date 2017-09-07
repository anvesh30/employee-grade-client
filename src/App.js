import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  
  componentDidMount(){

       var grades=[];
       $.ajax({
            url: 'http://localhost:4000/api/grades',
            error: function (e) {
                console.dir(e);
            },
            success: function (data) {
              console.log(grades);
                grades = data;
            },
            async:false
            
        });
  }
  render() {
    return (

      
     <div>
       <a href="#">ALL GRADES</a>

        <select>
          <option></option>
        <option value="E1">E1</option>
        <option value="E2">E2</option>
        <option value="E3">E3</option>
        <option value="E4">E4</option>
        <option value="E5">E5</option>
        </select>
    </div>
   
    );
  }
}

export default App;
