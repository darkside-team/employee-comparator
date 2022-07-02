import React from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap"; 

export class HateoasPagination extends React.Component {

    constructor(props) {
      super(props);  
    }
  
    loadNext() {    
      this.props.loadData(this.props._links.next.href); 
    }
  
    loadPrev() {     
      this.props.loadData(this.props._links.prev.href);  
    }
  
    loadLast() {
      this.props.loadData(this.props._links.last.href); 
    }
  
    loadFirst() {
      this.props.loadData(this.props._links.first.href);      
    }
  
    loadSelf() {
      this.props.loadData(this.props._links.self.href);      
    }
  
    loadPage(page) {        
      this.props.loadPage(page);
    }
  
    render() {
      const {page, _links, parent } = this.props;
      return (<>
        {page ?                
                  <Pagination>
                  {_links.first ? 
                  <PaginationItem>
                    <PaginationLink
                      first
                      href="#"
                      onClick={() => this.loadFirst()}
                    />                
                  </PaginationItem>
                  : null}
                   {_links.prev ? 
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      previous
                      onClick={() => this.loadPrev()}
                    />
                  </PaginationItem>
                  :null}  
                  {(() => {  
                  const pages = [];           
                  for (var i = 0; i <  page.totalPages; i++) {
                    const pageNum = i; 
                    pages.push(
                    <PaginationItem active={page.number === i ? true : false} key={i}>
                      <PaginationLink href="#" onClick={() => this.loadPage(pageNum)}>
                        {i+1}
                      </PaginationLink>
                  </PaginationItem>)               
                  }
                  return pages; 
                  })()}                
                  {_links.next ? 
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      next
                      onClick={() => this.loadNext()}
                    />
                  </PaginationItem>
                  : null} 
                  {_links.last ? 
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      last
                      onClick={() => this.loadLast()}
                    />
                  </PaginationItem>
                  : null}
                </Pagination>
              :null}      
        </>)
    }
  }
  