import React from "react"; 
import FetchUtil from '../utils/FetchUtil';

export default class AbstractSelect extends React.Component {

    loadData(href) {            
        let headers = FetchUtil.createHeaders(); 
        return fetch(href, {method:'GET', headers: headers})
        .then(res => res.json())    
        .then(
            (result) => {            
            this.setState({
                isLoaded: true,
                _embedded: result._embedded          
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