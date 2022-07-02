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
    users: []   
  }                                
};

const domainUri = FetchUtil.getServiceUri("users");

export class UserTable extends AbstractTable {    
  
    filter = {
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
        const { loadDetail } = this.props; 
        const { users } = _embedded; 
        
        return (            
            <>     
             <Card>
      <CardHeader>
        Пользователи
      </CardHeader>
        <CardBody>
              <Table >
                <thead>
                    <tr>
                    <th>
                        #
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Username
                    </th>
                    </tr>
                </thead>
                <tbody>
                {
                users.map(function(user, i){
                    return <User user={user} row={i} key={i} 
                                 loadDetail={(h) => loadDetail(h)}/>;
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

export class User extends React.Component {

  constructor(props) {
    super(props);  
  }

  render() {
      const {user, row, loadDetail} = this.props 
      const { _links } = user;    
      return (  
        <>
          <tr>
          <th scope="row">
              {row}
          </th>
          <td>
              {user.firstName}
          </td>
          <td>
              {user.lastName}
          </td>
          <td>
          <Badge
    color="primary"
    href="#"
    onClick={() => loadDetail(_links.self.href)}
  >{user.username}</Badge>
              
          </td>
          </tr>          
          </>    
      );
  }
}
