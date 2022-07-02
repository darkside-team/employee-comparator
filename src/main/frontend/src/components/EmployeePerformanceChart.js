import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Table, Card, CardHeader, CardBody} from "reactstrap";
  
const initialState = {
    isLoaded: false,   
    data: []
}

export class EmployeePerformanceChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    applyData(data) {
        this.setState({
            data: data
        })
    }

    componentDidMount() {        
    }

    render() {
        const { data } = this.state; 
        return (
            <>
            <Card>
                <CardHeader>Производительнось за 12 месяцев</CardHeader>
            <CardBody>
            <LineChart width={300} height={100} data={data}>                
            <Tooltip />          
              <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
            </CardBody>
            </Card>
            </>
          );
      }
}