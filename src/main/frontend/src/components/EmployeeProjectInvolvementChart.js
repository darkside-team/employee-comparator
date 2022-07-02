import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Table, Card, CardHeader, CardBody} from "reactstrap";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (      
      <text x={x} y={y} style={{"fontSize": 10}} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
}

const initialState = {
  isLoaded: false,   
  data: []
}

export class EmployeeProjectInvolvementChart extends React.Component {

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
        
        const renderCustomizedLabel1 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            
            return (      
                <text x={x} y={y} style={{"fontSize": 10}} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}% в ` + data[index].name} 
                </text>
              );
          }

        return (  
            <>
            <Card>
                <CardHeader>Участие в проектах</CardHeader>
                <CardBody>
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  cx={150}
                  cy={150}
                  labelLine={false}                  
                  label={renderCustomizedLabel1}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"                  
                >
                  {data.map((entry, index) => (                    
                    <Cell key={`cell-${index}`} fill={data[index].color} />
                  ))}
                </Pie>
              </PieChart>
              </CardBody>
              </Card>
            </>          
          );
    }
}