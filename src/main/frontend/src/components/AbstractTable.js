import React from "react"; 
import FetchUtil from '../utils/FetchUtil';

export default class AbstractTable extends React.Component {

    getDomainUri() {}

    getFilter() {
        return {};
    }

    setFilter(filter) {}

    reloadData() {
        this.filterData(this.filter); 
      }
  
      filterData(filter) {
        this.setFilter({...this.getFilter(), ...{page: 0}}); 
        this.loadData(this.getDomainUri() + FetchUtil.filterObjectToString(filter))
      }
  
      loadPage(page) {
        this.filterData({...this.getFilter(), ...{page: page}});
      }
    
      loadData(href) {           
        let headers = FetchUtil.createHeaders(); 
        return fetch(href, {method:'GET', headers: headers})
        .then(res => res.json())    
        .then(
          (result) => {            
            this.setState({
              isLoaded: true,
              _embedded: result._embedded,
              _links: result._links,
              page: result.page            
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
}