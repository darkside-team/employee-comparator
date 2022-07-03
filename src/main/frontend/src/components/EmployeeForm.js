import React from "react"; 
import { Form, FormGroup, Label, Input, Button, Alert, ListGroup, ListGroupItem, List, Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import FetchUtil from '../utils/FetchUtil';
import AbstractForm from "./AbstractForm";
import AbstractSelect from "./AbstractSelect";
import IndicatorMap from '../utils/IndicatorMap'; 

const initialState = {
  isLoaded: false,
  firstName: "", 
  lastName: "", 
  internalLogin: "", 
  discordLogin: "", 
  enabled: true,
  indicators: {
    performanceCurrValue: 1,
    qualityCurrValue: 1,
    efficiencyCurrValue: 1,
    performancePrevValue: 1,
    qualityPrevValue: 1,
    efficiencyPrevValue: 1,
    avgTaskCount: 0,
    avgTaskComplexity: 0,
    umkIndicator1: 1,
    umkIndicator2: 1,
    umkIndicator3: 1,
    umkIndicator4: 1,
    umkIndicator5: 1,
    umkIndicator6: 1,
    umkIndicator7: 1,
    umkIndicator8: 1,
    umkIndicator9: 1
  },
  dataSaved: false,
  error: {
    hasError: false
  },
  _links: {
    department: {
      href: ""
    }
  }             
};

const domainUri = FetchUtil.getServiceUri("employees");  
const departmentDomainUri = FetchUtil.getServiceUri("departments");
const roleDomainUri = FetchUtil.getServiceUri("employeeRoles");  

export class EmployeeForm extends AbstractForm {

    constructor(props) {
        super(props);
        this.state = initialState; 
    }

    getDomainUri() {
      return domainUri;
    }

    getInitialState() {
      return initialState;  
    }

    componentDidMount() {
    }

    deleteData() {

    }

    render() {    
        const {firstName, lastName, internalLogin, discordLogin, enabled, indicators, _links, error, dataSaved} = this.state;         
        console.info('state: ', this.state); 
        
        return (<>
        <Card>
      <CardHeader>
   Детали
      </CardHeader>     
        <CardBody style={{ "textAlign":"left" }}>
         
          <Form>
          <FormGroup>           
            <Label for="firstName">
              firstName:
            </Label>
            <Input value={firstName || ""} onChange={(e) => { this.setState({firstName: e.target.value}); }}/>
            <Label for="lastName">
            lastName:
            </Label>
            <Input value={lastName || ""} onChange={(e) => { this.setState({lastName: e.target.value}); }} />                        
            <Label for="employeeDepartment">
            Отдел:
            </Label>
            <DeartmentSelectBox onChange={(href) => this.setState({department: href})}/>
            <Label for="employeeDepartment">
            Роль:
            </Label>
            <RoleSelectBox onChange={(href) => this.setState({role: href})}/>
            <Label for="internalLogin">
            Внутренний логин:
            </Label>
            <Input value={internalLogin} onChange={(e) => { this.setState({internalLogin: e.target.value}); }} />                      
            <Label for="discordLogin">
            Discord логин:
            </Label>
            <Input value={discordLogin} onChange={(e) => { this.setState({discordLogin: e.target.value}); }} />    
            
            <Label for="performanceCurrValue">
            {IndicatorMap.getIndicatorName('performanceCurrValue')}:
            </Label>
            <Input value={indicators.performanceCurrValue} onChange={(e) => { 
                this.state.indicators.performanceCurrValue = e.target.value;
                this.setState(this.state.indicators); }}/>
            <Label for="qualityCurrValue">
            {IndicatorMap.getIndicatorName('qualityCurrValue')}:
            </Label>
            <Input value={indicators.qualityCurrValue} onChange={(e) => { 
               this.state.indicators.qualityCurrValue = e.target.value;
               this.setState(this.state.indicators); }}/>
            <Label for="efficiencyCurrValue">
            {IndicatorMap.getIndicatorName('efficiencyCurrValue')}:
            </Label>
            <Input value={indicators.efficiencyCurrValue} onChange={(e) => { 
              this.state.indicators.efficiencyCurrValue = e.target.value;
              this.setState(this.state.indicators); }}/>

            <Label for="performancePrevValue">
            {IndicatorMap.getIndicatorName('performancePrevValue')}:
            </Label>
            <Input value={indicators.performancePrevValue} onChange={(e) => { 
                this.state.indicators.performancePrevValue = e.target.value;
                this.setState(this.state.indicators); }}/>
            <Label for="qualityPrevValue">
            {IndicatorMap.getIndicatorName('qualityPrevValue')}:
            </Label>
            <Input value={indicators.qualityPrevValue} onChange={(e) => { 
               this.state.indicators.qualityPrevValue = e.target.value;
               this.setState(this.state.indicators); }}/>
            <Label for="efficiencyPrevValue">
            {IndicatorMap.getIndicatorName('efficiencyPrevValue')}:
            </Label>
            <Input value={indicators.efficiencyPrevValue} onChange={(e) => { 
              this.state.indicators.efficiencyPrevValue = e.target.value;
              this.setState(this.state.indicators); }}/>
           
            <Label for="avgTaskCount">
            {IndicatorMap.getIndicatorName('avgTaskCount')}:
            </Label>
            <Input value={indicators.avgTaskCount} onChange={(e) => { 
              this.state.indicators.avgTaskCount = e.target.value;
              this.setState(this.state.indicators); }}/>
           
            <Label for="avgTaskComplexity">
            {IndicatorMap.getIndicatorName('avgTaskComplexity')}:
            </Label>
            <Input value={indicators.avgTaskComplexity} onChange={(e) => { 
              this.state.indicators.avgTaskComplexity = e.target.value;
              this.setState(this.state.indicators); }}/>
          
            <Label for="umkIndicator1">
            {IndicatorMap.getIndicatorName('umkIndicator1')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator1} onChange={(e) => { 
              this.state.indicators.umkIndicator1 = e.target.value;
              this.setState(this.state.indicators); }}/>
          
            <Label for="umkIndicator2">
            {IndicatorMap.getIndicatorName('umkIndicator2')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator2} onChange={(e) => { 
              this.state.indicators.umkIndicator2 = e.target.value;
              this.setState(this.state.indicators); }}/>
          
            <Label for="umkIndicator3">
            {IndicatorMap.getIndicatorName('umkIndicator3')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator3} onChange={(e) => { 
              this.state.indicators.umkIndicator3 = e.target.value;
              this.setState(this.state.indicators); }}/>
          
            <Label for="umkIndicator4">
            {IndicatorMap.getIndicatorName('umkIndicator4')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator4} onChange={(e) => { 
              this.state.indicators.umkIndicator4 = e.target.value;
              this.setState(this.state.indicators); }}/>
          
            <Label for="umkIndicator5">
            {IndicatorMap.getIndicatorName('umkIndicator5')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator5} onChange={(e) => { 
              this.state.indicators.umkIndicator5 = e.target.value;
              this.setState(this.state.indicators); }}/>
          
            <Label for="umkIndicator6">
            {IndicatorMap.getIndicatorName('umkIndicator6')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator6} onChange={(e) => { 
              this.state.indicators.umkIndicator6 = e.target.value;
              this.setState(this.state.indicators); }}/>
          
            <Label for="umkIndicator7">
            {IndicatorMap.getIndicatorName('umkIndicator7')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator7} onChange={(e) => { 
              this.state.indicators.umkIndicator7 = e.target.value;
              this.setState(this.state.indicators); }}/>

            <Label for="umkIndicator8">
            {IndicatorMap.getIndicatorName('umkIndicator8')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator8} onChange={(e) => { 
              this.state.indicators.umkIndicator8 = e.target.value;
              this.setState(this.state.indicators); }}/>

          
            <Label for="umkIndicator9">
            {IndicatorMap.getIndicatorName('umkIndicator9')}:
            </Label>
            <UmkIndicatorSelectBox value={indicators.umkIndicator9} onChange={(e) => { 
              this.state.indicators.umkIndicator9 = e.target.value;
              this.setState(this.state.indicators); }}/>
                       
          
          <br/> 
            <div>
            {error.response &&
            <Alert color="danger">{JSON.stringify(error)}</Alert>
            }
            {dataSaved &&
            <Alert color="success">Данные успешно сохранены</Alert>
            }
            </div>
            <div>
            <Button onClick={() => { this.patchData() }} color="primary" outline>
              Сохранить
            </Button>&nbsp;
            <Button onClick={() => { this.postData() }} color="success" outline>
              Добавить
            </Button>&nbsp;
            <Button onClick={() => { this.deleteData() }} color="danger" outline>
              Удалить
            </Button>&nbsp;
            <Button onClick={() => { this.clearForm() }} color="info" outline>
              Очистить
            </Button>
            </div>                          
          </FormGroup>
          </Form>             
        </CardBody>
        </Card>
        </>);
    }
    
    deleteData() {
      this._patchData({enabled: false}); 
    } 
}

class UmkIndicatorSelectBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {onChange, value} = this.props;  
    return(<>
     <Input type="select" value={value} onChange={onChange}>
                  <option key="1" value="1">Начальный</option>
                  <option key="2" value="2">Средний</option>
                  <option key="3" value="3">Продвинутый</option>
            </Input>
    </>)
  }
}

class DeartmentSelectBox extends AbstractSelect {

  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        enabled: "",
        _embedded: {
          departments: []     
        }
    }
  }

  componentDidMount() {
    this.loadData(departmentDomainUri);
  }

  render() {
    const {_embedded} = this.state;
    const {departments} = _embedded;
    const {onChange} = this.props;  

    return (<>
        <Input type="select" onChange={(e) => { onChange(e.target.value); }}>
              <option value="" hidden >-</option>
          {
              departments.map(function(department, i){
                return <option key={i} value={department._links.self.href}>{department.name}</option>;
              })
          }   
          </Input>
    </>)
  }
}

class RoleSelectBox extends AbstractSelect {

  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        enabled: "",
        _embedded: {
          employeeRoles: []     
        }
    }
  }

  componentDidMount() {
    this.loadData(roleDomainUri);
  }

  render() {
    const {_embedded} = this.state;
    const {employeeRoles} = _embedded;
    const {onChange} = this.props;  

    return (<>
        <Input type="select" onChange={(e) => { onChange(e.target.value); }}>
              <option value="" hidden >-</option>
          {
              employeeRoles.map(function(role, i){
                return <option key={i} value={role._links.self.href}>{role.name}</option>;
              })
          }   
          </Input>
    </>)
  }
}

