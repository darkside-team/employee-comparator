import React from "react";
import { Table, Nav, NavItem, NavLink, Container, Row, Card, CardBody, CardGroup, CardText, CardTitle, CardHeader, Col, Badge} from "reactstrap"; 
import { HateoasPagination } from "./HateoasPagination";
import FetchUtil from '../utils/FetchUtil';
import AbstractTable from "./AbstractTable";

const initialState = {
    error: null,
    isLoaded: false,
    _links: null,
    page: null,
    _embedded: {
        employees: []   
    }                                       
  };

const domainUri = FetchUtil.getServiceUri("employees");

export class EmployeeTable extends AbstractTable {    

    filter = {
        sort: "firstName,lastName",
        enabled: true,
        projection: "plain"
    };

    constructor(props) {          
        super(props);     
        if(this.props.filter) {
            this.filter = this.props.filter; 
        }          
        this.state = initialState; 
    }

    getDomainUri() {
        return domainUri; 
    }

    getFilter() {
        return this.filter;
    }

    setFilter(filter) {
        this.filter = filter;
    }  
  
    componentDidMount() {
      this.filterData(this.filter); 
    }
    
    render() {
        const { error, isLoaded, _embedded, page, _links} = this.state;      
        const { loadForm,apllyEmployeeToReportForm } = this.props; 
        const { employees } = _embedded;
        
        return (            
            <>     
             <Card>
      <CardHeader>
        Сотрудники
      </CardHeader>
        <CardBody>
              <Table >
                <thead>
                    <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Имя
                    </th>
                    <th>
                        фамилия
                    </th>
                    <th>
                        Отдел
                    </th>
                    </tr>
                </thead>
                <tbody>
                {
                employees.map(function(employee, i){
                    return <Employee employee={employee} row={i} key={i} 
                                     loadForm={(h) => loadForm(h)} 
                                     apllyEmployeeToReportForm={(h) => apllyEmployeeToReportForm(h)} />;
                })
                }                               
                </tbody>
              </Table>
              <HateoasPagination page={page} _links={_links} filter={this.filter} 
                                 loadData={(h) => {this.loadData(h)}} 
                                 loadPage={(p) => {this.loadPage(p)}} />      

</CardBody>
          </Card>
            </>
        )
    }
}

export class Employee extends React.Component {

  constructor(props) {
    super(props);  
  }

  render() {
      const {employee, row, loadForm, apllyEmployeeToReportForm} = this.props 
      const { _links } = employee;    
      return (  
        <>
          <tr>
          <th scope="row">
              {row}
          </th>
          <td>
          <Badge
    color="primary"
    href="#"
    onClick={() => {
        loadForm(_links.self.href);
        apllyEmployeeToReportForm(employee);
    }}
  >{employee.firstName}</Badge>
          </td>
          <td>
              {employee.lastName}
          </td>
          <td>
              {employee.department}
          </td>
          </tr>          
          </>    
      );
  }
}
