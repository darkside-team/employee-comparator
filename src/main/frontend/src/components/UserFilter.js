import React from "react";
import { Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody } from "reactstrap";

const initialState = {
  username: "",
  enabled: ""
};

export class UserFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState; 
  }

  applyFilters() {
    this.props.doFilter({ ...this.props.filter, ...this.state });
  }

  setUsername(value) {
    this.setState({
      username: value
    });
  }

  setEnabled(value) {
    this.setState({
      enabled: value
    });
  }

  clearForm() {
    this.setState(initialState);
  }

  render() {
    return (<>
     <Card>
      <CardHeader>
        Фильтры
      </CardHeader>
      <CardBody>
      <div className="d-flex justify-content-start">        
        <Form className="searchbox">
          <FormGroup>
            <Label for="username">
              Username:
            </Label>
            <Input value={this.state.username} onChange={(e) => { this.setUsername(e.target.value); }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.applyFilters();
                }
              }} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">
              Enabled:
            </Label>
            <Input type="select" value={this.state.enabled} onChange={(e) => { this.setEnabled(e.target.value); }}>
              <option value="">-</option>
              <option value="true">
                Да
              </option>
              <option value="false">
                Нет
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Button block onClick={() => { this.applyFilters(); }}>
              Filter
            </Button>
          </FormGroup>
          <FormGroup>
            <Button block onClick={() => { this.clearForm(); }}>
              Clear
            </Button>
          </FormGroup>
        </Form>
      </div>
      </CardBody> 
      </Card>
    </>);
  }
}
