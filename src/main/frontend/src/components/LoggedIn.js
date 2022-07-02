import React from "react";
import { Table, Nav, NavItem, NavLink, Container, Row, Card, CardBody, CardGroup, CardText, CardTitle, CardHeader, Col, Form, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"; 
import { HateoasPagination } from "./HateoasPagination";
import FetchUtil from '../utils/FetchUtil';

const initialState = {
  error: null,
  isLoaded: false,
  _links: null,          
  username: "",
  dropdownOpen: false,
  roles: []                             
};

const serviceUri = FetchUtil.getServiceUri("whoami");

export class LoggedIn extends React.Component {      

    constructor(props) {  
        super(props);    

        this.toggle = this.toggle.bind(this);                
        this.state = initialState; 
    }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    loadData(href) {            
      let headers = FetchUtil.createHeaders(); 
      return fetch(href, {method:'GET', headers: headers})
      .then(res => res.json())    
      .then(
        (result) => {            
          this.setState({
            isLoaded: true,
            username: result.username,
            roles: result.roles            
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

    componentDidMount() {
      this.loadData(serviceUri);     
    }

    render() {
        const { error, isLoaded, username, roles} = this.state;          
        return (            
            <>     
<ButtonDropdown
isOpen={this.state.dropdownOpen} toggle={this.toggle}
>
  <DropdownToggle caret>
  Вы зашли как: {username} 
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem>
    Logout
    </DropdownItem>
  </DropdownMenu>
</ButtonDropdown>
            </>
        )
    }
}
