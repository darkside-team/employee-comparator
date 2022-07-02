import React from "react";
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import AbstractForm from "./AbstractForm";

const initialState = {
  isLoaded: false,
  username: "",
  firstName: "", 
  lastName: "", 
  password: "{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW", 
  roles: []
}

const domainUri = FetchUtil.getServiceUri("users");

export class UserForm extends AbstractForm {

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
        const {username, firstName, lastName, password, roles} = this.state; 

        return (<>
        <Card>
      <CardHeader>
   Детали
      </CardHeader>     
        <CardBody style={{ "textAlign":"left" }}>
          <Form>
          <FormGroup>
            <Label for="username">
              Username:
            </Label>
            <Input value={username || ""} onChange={(e) => { this.setState({username: e.target.value}); }}/>
            <Label for="firstName">
              firstName:
            </Label>
            <Input value={firstName || ""} onChange={(e) => { this.setState({firstName: e.target.value}); }}/>
            <Label for="lastName">
            lastName:
            </Label>
            <Input value={lastName || ""} onChange={(e) => { this.setState({lastName: e.target.value}); }} />            
            <br/>
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
       <ListGroup>
        <ListGroupItem>
                  <RoleList roles={roles} />
        </ListGroupItem>
      </ListGroup>
            </CardBody>
          </Card>
        </>);
    }
}


class RoleList extends React.Component {

    render() {
        const {roles} = this.props;  
        return (<List type="unstyled">
        <li>  
            Роли:       
          <ul>
          {
  roles.map(function(role, i){
        return    <li key={i} >
                   {role.roleName}
                  </li>;
                })
            }
          </ul>
        </li>
          </List>)
    }
  
}
