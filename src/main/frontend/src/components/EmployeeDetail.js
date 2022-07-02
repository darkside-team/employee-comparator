import React from "react";
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Table, Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import wader from '../d2vyhc4-f871665e-ddb0-45a5-8d30-f38d352df1e4.png';

const initialState = {
  isLoaded: false,   
  employee: {               
  }
}

export class EmployeeDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    componentDidMount() {        
    }

    applyData(data) {    
      this.setState({
        employee: data
      })
    }

    loadData(href) {      
      console.info("load employee detail: " + href); 
      let headers = FetchUtil.createHeaders(); 
      return fetch(href.replace(/{\?projection}/, "?projection=plain"), {method:'GET', headers: headers})
      .then(res => res.json())    
      .then(
        (result) => {            
          this.setState({
            isLoaded: true,
            employee: result
          });
        },
        (error) => this.handleError(error)
      )
    }

    handleError(error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  
    render() {    
        const { employee } = this.state;
        return (
            <>          
            <Card>
            <CardHeader>
              Сотрудник
            </CardHeader>
            <CardBody>
              <CardTitle>
              <img src={wader} className="photo" width={200} height={200} />
              <div>{employee.firstName} {employee.lastName}</div>
              </CardTitle>            
            <Table >
                <tbody>
                <tr>
                    <td>Роль</td>
                    <td>{employee.role}</td>
                </tr>
                <tr>
                    <td>Должность</td>
                    <td>{employee.post}</td>
                </tr>
                <tr>
                    <td>Отдел</td>
                    <td>{employee.department}</td>
                </tr>
                </tbody>                
             </Table>
            </CardBody>
          </Card>                                                    
            </>
        );
    }   
}