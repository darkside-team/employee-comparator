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
    employeePosts: []
  }                                   
};

const domainUri = FetchUtil.getServiceUri("employeePosts");

export class PostTable extends AbstractTable {    

    filter = {
        sort: "name"
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
        const { loadForm } = this.props; 
        const { employeePosts } = _embedded;
        return (            
            <>     
             <Card>
      <CardHeader>
        Роли
      </CardHeader>
        <CardBody>
              <Table >
                <thead>
                    <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Наименование
                    </th>                   
                    </tr>
                </thead>
                <tbody>
                {
                employeePosts.map(function(post, i){
                    return <Post post={post} row={i} key={i} 
                                     loadForm={(h) => {loadForm(h)}} />;
                })
                }                               
                </tbody>
              </Table>
              <HateoasPagination page={page} _links={_links} filter={this.filter} 
                                 loadData={(h) => {this.loadData(h)}} 
                                 loadPage={(p) => {this.loadPage(p)}}/>      

</CardBody>
          </Card>
            </>
        )
    }
}

export class Post extends React.Component {

  constructor(props) {
    super(props);  
  }

  render() {
      const {post, row, loadForm} = this.props 
      const { _links } = post;    
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
    onClick={() => loadForm(_links.self.href)}
  >{post.name}</Badge>
          </td>
          </tr>          
          </>    
      );
  }
}
