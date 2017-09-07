import React, { Component } from 'react';

const GradeComponent = (props) => {
    return (
        <option value={props.grade}>{props.grade}</option>
    );
}

export default GradeComponent;