import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Table, Card, CardHeader, CardBody} from "reactstrap";
  
const initialState = {
    isLoaded: false,   
    data: []
}

/*
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
*/

export class EmployeeWorkingDayChart extends React.Component {

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
        const {data} = this.state; 
        return (
            <Card>
            <CardHeader>Обучение / Отсутсвие/ Переработки (в днях)</CardHeader>
            <CardBody>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="unavailability" stackId="a" fill="#8884d8" />
              <Bar dataKey="vacation" stackId="a" fill="#82ca9d" />
              <Bar dataKey="training" stackId="a" fill="#ffc658" />
            </BarChart>
          </CardBody>
          </Card>
        );
      }
}