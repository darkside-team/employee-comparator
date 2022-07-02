import React from "react"; 
import FetchUtil from '../utils/FetchUtil';

export default class AbstractForm extends React.Component {

    constructor(props) {
        super(props);        
    }

    dataUri = "";

    getDomainUri() {}

    getInitialState() {}


    loadData(href) {
     this._loadData(href); 
    }

    _loadData(href) {
      this.clearForm();
      this.dataUri = href; 
      let headers = FetchUtil.createHeaders();       
      return fetch(href, {method:'GET', headers: headers})
      .then(res => res.json())    
      .then(
        (result) => this.setState({...{isLoaded: true}, ...result}),
        (error) => this.handleError(error)        
      )
    }

    postData() {      
      this._postData(this.state);
    }

    _postData(data) {
      let headers = FetchUtil.prepareHeaders(new Headers({ 'Content-Type': 'application/json' }));
      const request = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      };
      fetch(this.getDomainUri(), request)
          .then(async response => {
            if (!response.ok) {
              let err = new Error('Http error: ' + response.status);
              err.response = await response.json();
              err.status = response.status;
              throw err;
            }
            
            return response.json()
          })
          .then(data => {
            this.handleSuccess();
            this.props.reloadTable();
          },
          (error) => {
            console.info('error occur: ', error);
            this.handleError(error);
          }
          );      
    }

    patchData() {
      this._patchData(this.state);
    }

    _patchData(data) {
      if (this.dataUri) {
        let headers = FetchUtil.prepareHeaders(new Headers({ 'Content-Type': 'application/json' }));
        const request = {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify(data) 
        };
        fetch(this.dataUri, request)
            .then(async response => {
              if (!response.ok) {
                let err = new Error('Http error: ' + response.status);
                err.response = await response.json();
                err.status = response.status;
                throw err;
              } 
              response.json()
            })
            .then(data => {
              this.handleSuccess();
              this.props.reloadTable();
            },
            (error) => this.handleError(error)
            );
      }
    }

    deleteData() {
      const href = this.state._links.self.href; 
      this._deleteData(href);
    }

    _deleteData(href) {
      let headers = FetchUtil.prepareHeaders(new Headers({ 'Content-Type': 'application/json' }));     
      return fetch(href, {method:'DELETE', headers: headers})
      .then(res => console.info('delete succeess'))    
      .then(
        (result) => {
          this.clearForm();  
          this.props.reloadTable();       
        },
        (error) => {
          this.handleError(error)
        }
      )
    }

    handleError(error)  {
      console.info('handle error: ', error);
      this.setState({
        isLoaded: true,
        error: error
      });
    }

    clearForm() {
      console.info('clear form'); 
      this.setState(this.getInitialState()); 
    }


    handleSuccess() {
      console.info('data saved OK', {...this.getInitialState(), ...{dataSaved: true}})

      this.setState({...this.getInitialState(), ...{dataSaved: true}});
    }

}