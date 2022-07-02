import React from "react";
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Table, Card, CardHeader, CardBody} from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import talentImg from '../pics/premium-icon-talent-4412950.png'

const initialState = {
  isLoaded: false, 
  employeeGratitudes: []
}

export class EmployeeGratitude extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    componentDidMount() {        
    }

    applyData(data) {    
      this.setState({
        isLoaded: true,
        employeeGratitudes: data        
      })
    }

    handleError(error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  
    render() {    
        const { employeeGratitudes } = this.state    
        return (
            <>       
            <Card style={{ "textAlign":"left" }}>
            <CardHeader>
            <img src={talentImg} width={24} height={24} />Благодарности ({employeeGratitudes.length})
            </CardHeader>
            <CardBody>
            <Table >
                <tbody>
                {
                employeeGratitudes.map(function(gratitude, i){                
                    return <tr key={i}><td>{gratitude.receiptDate}</td><td>{gratitude.name}</td></tr>;
                })
                }   
                </tbody>                
             </Table>
            </CardBody>
          </Card>
            </>
        );
    }   
}