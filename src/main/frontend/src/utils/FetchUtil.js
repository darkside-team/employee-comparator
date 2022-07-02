const createReactClass = require('create-react-class');

const FetchUtil = createReactClass({
  statics: {
    prepareHeaders: function(headers) {
      if (process.env.REACT_APP_PROFILE === 'dev') {        
        headers.set('Authorization', 'Basic ' + btoa(process.env.REACT_APP_USERNAME+":"+process.env.REACT_APP_PASSWORD));
      }

      return headers; 
    },

    createHeaders: function() {
      let headers = this.prepareHeaders(new Headers());
      return headers; 
    },

    getServiceUri: function(uri) {
      const serviceUri = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : ""
      return serviceUri + "/" + uri;
    },

    filterObjectToString: function(filter) {
      let filterStr = '';       
      Object.entries(filter).map((item) => {        

        const param = item[0]; 
        const value = item[1]; 

        if (value) {
          filterStr += "&" + param + "=" + value; 
        }         
      })
      return filterStr.replace(/&/, '?');
    }  
  },
  render() {
    return <></>
  },
});

export default FetchUtil;