import React from "react";
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Table, Card, CardHeader, CardBody} from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import medalImg from '../pics/premium-icon-achievements-4412768.png'

const initialState = {
  isLoaded: false,   
  nominations: []
}

export class EmployeeNomination extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    componentDidMount() {        
    }

    applyData(data) {    
      this.setState({
        nominations: data
      })
    }

    handleError(error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  
    render() {    
        const { nominations } = this.state;
        return (
            <>       
            <Card style={{ "textAlign":"left" }}>
            <CardHeader>
            <img src={medalImg} width={24} height={24} />Номинации ({nominations.length})
            </CardHeader>
            <CardBody>
            <Table >
                <tbody>
                {
                nominations.map(function(nomination, i){                
                    return <tr key={i}><td>{nomination.name}</td></tr>;
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