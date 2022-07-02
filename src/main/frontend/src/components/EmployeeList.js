import React from "react";
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row } from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import AbstractSelect from "./AbstractSelect";

const initialState = {
  isLoaded: false,   
  _embedded: {
    employees: []
  },
  loggedInUser: {}         
}; 

const plainEmployeeUri = FetchUtil.getServiceUri("employees?projection=plain&enabled=true&size=100");
const fullEmployeeUri = FetchUtil.getServiceUri("employees?projection=full&enabled=true&size=100");
const whoamiUri = FetchUtil.getServiceUri("whoami");

export class EmployeeList extends AbstractSelect {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    employeeSelected(i) {    
        if (i) {
          const {employees} = this.state._embedded; 
          const plainEmployee = employees[i];
          this.props.loadDetail(plainEmployee); 

          let headers = FetchUtil.createHeaders(); 
          fetch(plainEmployee._links.employee.href.replace(/{\?projection}/, '?projection=full'), {method:'GET', headers: headers}) 
          .then(res => res.json())    
          .then(          
            (employee) => {                
              this.props.loadGratitude(employee.gratitudes); 
              this.props.loadNominations(employee.nominations); 
              if (this.props.loadIndicators) this.props.loadIndicators(employee.indicators)
              this.props.applyPerformanceChartData(employee.performanceByYear); 
              this.props.applyProjectInvolvementData(employee.projectInvolvements); 
              if (this.props.applyWorkingDaysData) this.props.applyWorkingDaysData(employee.workingDays); 
              this.props.applyEmployee(employee);
          
            },
            (error) => this.handleError(error)
          )
        }
    }

    componentDidMount() {               
      let headers = FetchUtil.createHeaders(); 
      return fetch(whoamiUri, {method:'GET', headers: headers})
      .then(res => res.json())    
      .then(
        (result) => {         
          this.setState({
            loggedInUser: result
          })   
          this.loadDataForLoggedInUser(result);
        },
        (error) => {        
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
    }

    loadDataForLoggedInUser(user) {       
      this.loadData(plainEmployeeUri);
    }
  
    render() {    
      const { _embedded, loggedInUser} = this.state;
      const { employees } = _embedded;

      console.info('employee: ', employees); 

      return (            
          <>                                     
          <Input type="select" value={this.state.enabled} onChange={(e) => { this.employeeSelected(e.target.value); }}>
              <option value="" hidden >-</option>
          {
              employees.map(function(employee, i){
                if (loggedInUser.username === employee.internalLogin || loggedInUser.username === employee.discordLogin || loggedInUser.username === 'admin') {
                  return <option key={i} value={i}>{employee.firstName} {employee.lastName}</option>;
                } 
              })
          }   
          </Input>
          </>
      );
    }   
}

