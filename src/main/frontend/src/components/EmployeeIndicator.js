import React from "react";
import { Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, List, Badge, Container, Row, Col, Table, Card, CardHeader, CardBody, CardTitle, CardGroup, CardText} from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import IndicatorMap from '../utils/IndicatorMap'; 

const initialState = {
  isLoaded: false,   
  indicator: {}
}

export class EmployeeIndicator extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    componentDidMount() {        
    }

    applyData(data) {    
      this.setState({
        indicator: data
      })
    }

    loadData(href) {      
      console.info("load main indicator: " + href); 
      let headers = FetchUtil.createHeaders(); 
      return fetch(href, {method:'GET', headers: headers})
      .then(res => res.json())    
      .then(
        (result) => {            
          this.setState({
            isLoaded: true,
            indicator: result
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
  
    render() {    
        const { indicator } = this.state;
        const { performanceCurrValue, performancePrevValue, 
          performanceGrowth, qualityCurrValue, qualityPrevValue, 
          qualityGrowth, efficiencyCurrValue, efficiencyGrowth, 
          avgTaskCount, avgTaskComplexity, trainingDayCount, 
          umkIndicator1, umkIndicator2, umkIndicator3, umkIndicator4,
          umkIndicator5, umkIndicator6, umkIndicator7, umkIndicator8, 
          umkIndicator9          
        
        } = indicator; 

        return (
            <>       
            <Card>
            <CardHeader>
              Основные показатели
            </CardHeader>
            <CardBody>
            <CardGroup> 
              <Container>
                <Row>
                  <Col>
                  <Card>
                            <CardTitle style={{fontWeight: 8, fontSize: 12}}>Производительнось</CardTitle>
                            <CardText>
                            {performanceCurrValue}%<br/>
                            {
                             performanceGrowth < 0 &&
                                <Badge color="danger">{performanceGrowth}%</Badge>                           
                            }
                            {
                             performanceGrowth > 0 &&
                                <Badge color="success">+{performanceGrowth}%</Badge>                  
                            }
                            {
                             performanceGrowth == 0 &&
                                <Badge color="info">+{performanceGrowth}%</Badge>                  
                            }
                            </CardText>
                            </Card>
                  </Col>
                  <Col>
                  <Card>
                            <CardTitle style={{fontWeight: 8, fontSize: 12}}>Качество</CardTitle>                            
                            <CardText>
                            {qualityCurrValue}%<br/> 
                            {
                             qualityGrowth < 0 &&
                                <Badge color="danger">{qualityGrowth}%</Badge>                           
                            }
                            {
                             qualityGrowth > 0 &&
                                <Badge color="success">+{qualityGrowth}%</Badge>                  
                            }
                            {
                             qualityGrowth == 0 &&
                                <Badge color="info">+{qualityGrowth}%</Badge>                  
                            }
                            </CardText>
                            </Card>
                  </Col>
                  <Col>
                  <Card>
                            <CardTitle style={{fontWeight: 8, fontSize: 12}}>Эффективность</CardTitle>
                            <CardText>
                            {efficiencyCurrValue}%<br/>
                            {
                             efficiencyGrowth < 0 &&
                                <Badge color="danger">{efficiencyGrowth}%</Badge>                           
                            }
                            {
                             efficiencyGrowth > 0 &&
                                <Badge color="success">+{efficiencyGrowth}%</Badge>                  
                            }
                            {
                             efficiencyGrowth == 0 &&
                                <Badge color="info">+{efficiencyGrowth}%</Badge>                  
                            }
                            </CardText>
                            </Card>
                  </Col>
                </Row>
              </Container>     
            </CardGroup>
            <br/>                           
            </CardBody>
          </Card>
          <br/>
          <Card>
            <CardHeader>Индикаторы</CardHeader>
            <CardBody>
            <Table borderless style={{ "padding": 0, "margin": 0, "textAlign":"left"}}>
                            <tbody style={{ "textAlign":"left"}}>
                              <tr>
                                <td>Среднее кол-во задач за период </td>
                                <td>{avgTaskCount}</td>
                              </tr>
                              <tr>
                                <td>Средняя сложность задач за период </td>
                                <td>{avgTaskComplexity}</td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator1')} </td>
                                <td><UmkIndicator value={umkIndicator1} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator2')} </td>
                                <td><UmkIndicator value={umkIndicator2} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator3')} </td>
                                <td><UmkIndicator value={umkIndicator3} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator4')} </td>
                                <td><UmkIndicator value={umkIndicator4} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator5')} </td>
                                <td><UmkIndicator value={umkIndicator5} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator6')} </td>
                                <td><UmkIndicator value={umkIndicator6} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator7')} </td>
                                <td><UmkIndicator value={umkIndicator7} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator8')} </td>
                                <td><UmkIndicator value={umkIndicator8} /></td>
                              </tr>
                              <tr>
                              <td>{IndicatorMap.getIndicatorName('umkIndicator9')} </td>
                                <td><UmkIndicator value={umkIndicator9} /></td>
                              </tr>

                            </tbody>
                      </Table> 
            </CardBody>
          </Card>
            </>
        );
    }
}   


export class UmkIndicator extends React.Component {

  constructor(props) {
    super(props);  
  }

  render() {

    const {value } = this.props;


    let textValue = 'Начальный';
    if (value === 2) {
      textValue = 'Средний';
    } 
    if(value === 3) {
      textValue = 'Продвинутый';
    }

    return (
    <>
    <div>{textValue}</div>
    </>);
  }

}
