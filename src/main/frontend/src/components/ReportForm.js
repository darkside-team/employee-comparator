import React from "react"; 
import { Form, FormGroup, Label, Input, Row, Col, Button, Table, Alert, ListGroup, ListGroupItem, List, Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import FetchUtil from '../utils/FetchUtil';

const initialState = {
    startDate: "",
    endDate: "", 
    employeeId: "",
}

const reportUri = "/employees/{employeeId}/report_history?startDate={startDate}&endDate={endDate}";

export class ReportForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    applyEmployee(employee) {
        console.info("apply employee: ", employee); 
        this.setState({
            employeeId: employee.id
        })
    }

    exportClicked() {
        const {startDate, endDate, employeeId} = this.state;
        if (startDate && endDate && employeeId) {
            let uri = reportUri.replace(/{employeeId}/, employeeId).replace(/{startDate}/, startDate).replace(/{endDate}/, endDate);
        
            window.open(uri, "_blank");
        }
    }

    render() {  
       
        return(
            <>
            <Card>
                <CardHeader>Параметры отчета</CardHeader>
                <CardBody>
<Form>
<Row style={{marginTop: 0}}>
    <Col>
    <Label for="startDate">
      Дата с 
    </Label>
    </Col>
    <Col>
    <Input
      id="startDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      onChange={(e) => { this.setState({startDate: e.target.value});}}
    />
   </Col>
   <Col>
   <Label for="endDate">
      Дата по
    </Label>
   </Col>
   <Col>
    <Input
      id="endDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      onChange={(e) => { this.setState({endDate: e.target.value});}}
    />
    </Col>
    <Col>
    <Button onClick={() => this.exportClicked()}
    color="primary">
      Выгрузить
    </Button>
    </Col>
  </Row>
</Form>
                </CardBody>
            </Card>
            </>
        )
    }
}