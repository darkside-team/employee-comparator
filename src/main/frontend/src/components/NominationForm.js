import React from "react"; 
import { Form, FormGroup, Label, Input, Button, Alert, ListGroup, ListGroupItem, List, Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import AbstractForm from "./AbstractForm";

const initialState = {
  isLoaded: false,
  name: "",
  dataSaved: false,
  error: {
    hasError: false
  }     
}

const domainUri = FetchUtil.getServiceUri("nominations");

export class NominationForm extends AbstractForm {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    getDomainUri() {
      return domainUri;
    }

    getInitialState() {
      return initialState;  
    }

    componentDidMount() {
    }  

    render() {    
        const {name, _links, error, dataSaved} = this.state;         
      
        
        return (<>
        <Card>
      <CardHeader>
   Детали
      </CardHeader>     
        <CardBody style={{ "textAlign":"left" }}>
          <Form>
          <FormGroup>           
            <Label for="name">
              Наименование:
            </Label>
            <Input value={name || ""} onChange={(e) => { this.setState({name: e.target.value}); }}/>                      
            <br/>
            <div>
            {error.response &&
            <Alert color="danger">{JSON.stringify(error)}</Alert>
            }
            {dataSaved &&
            <Alert color="success">Данные успешно сохранены</Alert>
            }
            </div>
            <div>
            <Button onClick={() => { this.patchData() }} color="primary" outline>
              Сохранить
            </Button>&nbsp;
            <Button onClick={() => { this.postData() }} color="success" outline>
              Добавить
            </Button>&nbsp;
            <Button onClick={() => { this.deleteData() }} color="danger" outline>
              Удалить
            </Button>&nbsp;
            <Button onClick={() => { this.clearForm() }} color="info" outline>
              Очистить
            </Button>
            </div>                          
          </FormGroup>
          </Form>             
        </CardBody>
        </Card>
        </>);
    }    
}

