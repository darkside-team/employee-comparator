import React from "react";
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Col, Table, Card, CardHeader, CardBody, CardTitle, CardGroup, CardText} from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import IndicatorMap from '../utils/IndicatorMap'; 

const initialState = {
  isLoaded: false,  
  employeeA: {
    indicators: {}
  },
  indicatorA: {},
  employeeB: {
    indicators: {}
  },
  indicatorB: {}
}

export class EmployeeIndicatorComparator extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    componentDidMount() {   
    }

    applyIndicatorA(data) {
      this.setState({
        indicatorA: data
      })
    }

    applyIndicatorB(data) {
      this.setState({
        indicatorB: data
      })
    }

    applyEmployeeA(data) {
      this.setState({
        employeeA: data
      })
    }

    applyEmployeeB(data) {
      this.setState({
        employeeB: data
      })
    }

    handleError(error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  
    render() {    
        const { employeeA, employeeB } = this.state; 

        console.info(">>> employeeA: ", employeeA ); 
        console.info(">>> employeeB: ", employeeB ); 

        const indicatorA = employeeA.indicators;
        const indicatorB = employeeB.indicators;

        return (
            <>       
            <Card>
            <CardHeader>
              Сравнение характеристик сотрудников 
            </CardHeader>
            <CardBody>
            <CardGroup> 
              <Container>
                <Row>
                  <Col>
                  <Card>
                  <Table >
                  <thead>
                    <tr>
                    <th>
                        Характеристики
                    </th>
                    <th>
                        {employeeA.firstName} {employeeA.lastName}
                    </th>
                    <th>
                        {employeeB.firstName} {employeeB.lastName}
                    </th>
                    </tr>
                   </thead>
                    <tbody style={{ "textAlign":"left"}}>
                      <tr>
                        <td>Роль </td>
                        <td>{employeeA.role}</td>
                        <td>{employeeB.role}</td>
                      </tr>
                      <tr>
                        <td>Должность </td>
                        <td>{employeeA.post}</td>
                        <td>{employeeB.post}</td>
                      </tr>
                      <tr>
                        <td>Отдел </td>
                        <td>{employeeA.department}</td>
                        <td>{employeeB.department}</td>
                      </tr>
                      </tbody>
                      </Table>
                  <br/>

                  <Table >
                  <thead>
                    <tr>
                    <th>
                        Индикаторы
                    </th>
                    <th>
                        {employeeA.firstName} {employeeA.lastName}
                    </th>
                    <th>
                        {employeeB.firstName} {employeeB.lastName}
                    </th>
                    </tr>
                   </thead>
                    <tbody style={{ "textAlign":"left"}}>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('performanceCurrValue')}</td>
                        <td>
                          <IndicatorComparator indicatorA={indicatorA.performanceCurrValue} indicatorB={indicatorB.performanceCurrValue} sign="%"/>
                          
                          </td>
                        <td>
                          <IndicatorComparator indicatorA={indicatorB.performanceCurrValue} indicatorB={indicatorA.performanceCurrValue} sign="%"/>
                          
                          </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('qualityCurrValue')} </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorA.qualityCurrValue} indicatorB={indicatorB.qualityCurrValue} sign="%" />
                            
                        </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorB.qualityCurrValue} indicatorB={indicatorA.qualityCurrValue} sign="%"/>
                          
                          </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('efficiencyCurrValue')} </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorA.efficiencyCurrValue} indicatorB={indicatorB.efficiencyCurrValue} sign="%"/>
                          
                        
                          </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorB.efficiencyCurrValue} indicatorB={indicatorA.efficiencyCurrValue} sign="%"/>
                           
                          </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('avgTaskCount')} </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorA.avgTaskCount} indicatorB={indicatorB.avgTaskCount}/>
                        </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorB.avgTaskCount} indicatorB={indicatorA.avgTaskCount}/>
                          </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('avgTaskComplexity')} </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorA.avgTaskComplexity} indicatorB={indicatorB.avgTaskComplexity}/>
                   </td>
                        <td>
                        <IndicatorComparator indicatorA={indicatorB.avgTaskComplexity} indicatorB={indicatorA.avgTaskComplexity}/>
                   </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator1')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator1} indicatorB={indicatorB.umkIndicator1}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator1} indicatorB={indicatorA.umkIndicator1}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator2')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator2} indicatorB={indicatorB.umkIndicator2}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator2} indicatorB={indicatorA.umkIndicator2}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator3')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator3} indicatorB={indicatorB.umkIndicator3}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator3} indicatorB={indicatorA.umkIndicator3}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator4')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator4} indicatorB={indicatorB.umkIndicator4}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator4} indicatorB={indicatorA.umkIndicator4}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator5')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator5} indicatorB={indicatorB.umkIndicator5}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator5} indicatorB={indicatorA.umkIndicator5}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator6')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator6} indicatorB={indicatorB.umkIndicator6}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator6} indicatorB={indicatorA.umkIndicator6}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator7')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator7} indicatorB={indicatorB.umkIndicator7}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator7} indicatorB={indicatorA.umkIndicator7}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator8')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator8} indicatorB={indicatorB.umkIndicator8}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator8} indicatorB={indicatorA.umkIndicator8}/>
                        </td>
                      </tr>
                      <tr>
                        <td>{IndicatorMap.getIndicatorName('umkIndicator9')} </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorA.umkIndicator9} indicatorB={indicatorB.umkIndicator9}/>
                        </td>
                        <td>
                        <UmkIndicatorComparator indicatorA={indicatorB.umkIndicator9} indicatorB={indicatorA.umkIndicator9}/>
                        </td>
                      </tr>
                    
                    </tbody>
                  </Table> 
                  </Card>
                  </Col>
                </Row>
              </Container>     
            </CardGroup>                            
            </CardBody>
          </Card>
            </>
        );
    }
}   

export class UmkIndicatorComparator extends React.Component {

  constructor(props) {
    super(props);  
  }

  render() {

    const {indicatorA, indicatorB} = this.props;


    let textValue = 'Начальный';
    if (indicatorA === 2) {
      textValue = 'Средний';
    } 
    if(indicatorA === 3) {
      textValue = 'Продвинутый';
    }

    return (
    <>
    {
      indicatorA < indicatorB &&
        <Badge color="danger">
          {textValue}
        </Badge>                           
    }
    {
      indicatorA > indicatorB  > 0 &&
        <Badge color="success">{textValue}</Badge>                  
    }
    {
    indicatorA === indicatorB  &&
        <Badge color="info">{textValue}</Badge>                  
    }
    </>);
  }

}

export class IndicatorComparator extends React.Component {

  constructor(props) {
    super(props);  
  }

  render() {

    const {indicatorA, indicatorB, sign} = this.props;
    return (
    <>
    {
      indicatorA < indicatorB &&
        <Badge color="danger">{indicatorA}{sign}</Badge>                           
    }
    {
      indicatorA > indicatorB  > 0 &&
        <Badge color="success">{indicatorA}{sign}</Badge>                  
    }
    {
    indicatorA === indicatorB  &&
        <Badge color="info">{indicatorA}{sign}</Badge>                  
    }
    </>);
  }
}