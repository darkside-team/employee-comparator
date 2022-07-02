import './App.css';
import { useRef, React} from "react"; 
import { Routes, Route, useHistory, useParams } from "react-router-dom";
import { Nav, NavItem, NavLink, Container, Row, Card, CardBody, CardGroup, CardText, CardTitle, CardHeader, Col } from "reactstrap"; 
import { Navigation } from "./components/Navigation";
import { UserTable } from "./components/UserTable"; 
import { UserFilter } from "./components/UserFilter";
import { UserForm } from "./components/UserForm"; 
import { EmployeeList }  from "./components/EmployeeList"; 
import { EmployeeDetail } from "./components/EmployeeDetail"; 
import { EmployeeGratitude } from "./components/EmployeeGratitude";
import { EmployeeNomination } from './components/EmployeeNomination';
import { EmployeeIndicator } from "./components/EmployeeIndicator";
import { EmployeePerformanceChart } from "./components/EmployeePerformanceChart";
import { EmployeeProjectInvolvementChart } from "./components/EmployeeProjectInvolvementChart";
import { EmployeeTable } from "./components/EmployeeTable";
import { EmployeeForm } from "./components/EmployeeForm";
import { ProjectTable } from "./components/ProjectTable"; 
import { ProjectForm } from "./components/ProjectForm"; 
import { DepartmentTable } from "./components/DepartmentTable"; 
import { DepartmentForm } from "./components/DepartmentForm";
import { NominationTable } from './components/NominationTable';
import { NominationForm } from "./components/NominationForm"; 
import { GratitudeTable } from './components/GratitudeTable';
import { GratitudeForm } from "./components/GratitudeForm";
import { EmployeeWorkingDayChart } from "./components/EmployeeWorkingDayChart"; 
import { EmployeeIndicatorComparator } from "./components/EmployeeIndicatorComparator"; 
import { ReportForm } from "./components/ReportForm";
import { RoleTable } from "./components/RoleTable";
import { RoleForm } from "./components/RoleForm";
import { PostTable } from "./components/PostTable";
import { PostForm } from "./components/PostForm";
import dstImg from './pics/dst.png'

function App() {
  return (
    <div className="App">                      
      <div>
      <Routes>        
        <Route path="/" element={<EmployeeProfileView />} />        
        <Route path="/app/users" element={<UsersView />} />        
        <Route path="/app/employees" element={<EmployeeView />} />    
        <Route path="/app/employeeComparation" element={<EmployeeComparationView />} />       
        <Route path="/app/projects" element={<ProjectView />} />        
        <Route path="/app/departments" element={<DepartmentView />} />        
        <Route path="/app/nominations" element={<NominationView />} />    
        <Route path="/app/roles" element={<RoleView />} />     
        <Route path="/app/posts" element={<PostView />} />         
        <Route path="/app/gratitudes" element={<GratitudeView />} />        
        <Route path="/app/employeeProfile" element={<EmployeeProfileView />}/>                        
        <Route path="/app/about" element={<About />} />                        
      </Routes>
      </div>
    </div>
  );
}


function EmployeeComparationView() {
  
  const EmployeeListRef = useRef(null);
  const EmployeeDetailRef = useRef(null);
  const GratitudeRef = useRef(null);
  const EmployeeNominationRef = useRef(null);
  const EmployeeIndicatorRef = useRef(null);
  const EmployeePerformanceChartRef = useRef(null);
  const EmployeeProjectInvolvementChartRef = useRef(null); 
  //const EmployeeWorkingDayChartRef = useRef(null); 

  const EmployeeListRefB = useRef(null);
  const EmployeeDetailRefB = useRef(null);
  const GratitudeRefB = useRef(null);
  const EmployeeNominationRefB = useRef(null);
  const EmployeeIndicatorRefB = useRef(null);
  const EmployeePerformanceChartRefB = useRef(null);
  const EmployeeProjectInvolvementChartRefB = useRef(null); 
  //const EmployeeWorkingDayChartRefB = useRef(null); 

  const EmployeeIndicatorComparatorRef = useRef(null);

  return (    
    <>
    <header></header>
    <nav><Navigation active="employeeComparation"/></nav>
      <main>    
      <Container fluid>
        <Row>
          <Col xl="3">
          <EmployeeList ref={EmployeeListRef} 
              loadDetail={(h) => EmployeeDetailRef.current.applyData(h)} 
              loadGratitude={(h) => GratitudeRef.current.applyData(h)}
              loadNominations={(h) => EmployeeNominationRef.current.applyData(h)}
              applyEmployee = {(h) => EmployeeIndicatorComparatorRef.current.applyEmployeeA(h)}
              applyPerformanceChartData = {(d) => EmployeePerformanceChartRef.current.applyData(d)} 
              applyProjectInvolvementData = {(d) => EmployeeProjectInvolvementChartRef.current.applyData(d)}
              //applyWorkingDaysData = {(d) => EmployeeWorkingDayChartRef.current.applyData(d)}          
              />
          </Col>
          <Col xl="4">
          </Col>
          <Col xl="3">
          <EmployeeList ref={EmployeeListRefB} 
              loadDetail={(h) => EmployeeDetailRefB.current.applyData(h)} 
              loadGratitude={(h) => GratitudeRefB.current.applyData(h)}
              loadNominations={(h) => EmployeeNominationRefB.current.applyData(h)}
              applyEmployee = {(h) => EmployeeIndicatorComparatorRef.current.applyEmployeeB(h)}
              applyPerformanceChartData = {(d) => EmployeePerformanceChartRefB.current.applyData(d)} 
              applyProjectInvolvementData = {(d) => EmployeeProjectInvolvementChartRefB.current.applyData(d)}      
              //applyWorkingDaysData = {(d) => EmployeeWorkingDayChartRefB.current.applyData(d)}          
              />          
          </Col>
        </Row>
        <Row>
        <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col xl="auto">
            <EmployeeDetail ref={EmployeeDetailRef} />
            <br />
            <EmployeePerformanceChart ref={EmployeePerformanceChartRef} />
            <br/>
            <EmployeeProjectInvolvementChart ref={EmployeeProjectInvolvementChartRef} />
            <br/>
            <EmployeeGratitude ref={GratitudeRef} />             
            <br/>
            <EmployeeNomination ref={EmployeeNominationRef} />                     
          </Col>          
          <Col xl="6">
            <EmployeeIndicatorComparator ref={EmployeeIndicatorComparatorRef} />
          </Col>
          <Col xl="auto">                  
            <EmployeeDetail ref={EmployeeDetailRefB} />
            <br />
            <EmployeePerformanceChart ref={EmployeePerformanceChartRefB} />
            <br/>
            <EmployeeProjectInvolvementChart ref={EmployeeProjectInvolvementChartRefB} />
            <br/>
            <EmployeeGratitude ref={GratitudeRefB} />             
            <br/>
            <EmployeeNomination ref={EmployeeNominationRefB} />  
          </Col>
        </Row>
        <Row>
        <Col>&nbsp;</Col>
        </Row>        
        </Container>
        
      </main>      
    <footer></footer>
    </>
  );
}

function GratitudeView() {
  const GratitudeTableRef = useRef(null);
  const GratitudeFormRef = useRef(null); 

  return (
   <>
  <header>   
  </header>
  <nav>
    <Navigation active="gratitudes"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="6">   
          <GratitudeTable ref={GratitudeTableRef}                         
                         loadForm={(h) => GratitudeFormRef.current.loadData(h)}
                     />                  
      </Col>          
      <Col sm="auto" xl="4">    
          <GratitudeForm ref={GratitudeFormRef} 
                       reloadTable={() => GratitudeTableRef.current.reloadData()} />
      </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  
  </>)
}

function NominationView() {
  const NominationTableRef = useRef(null);
  const NominationFormRef = useRef(null); 

  return (
   <>
  <header>   
  </header>
  <nav>
    <Navigation active="nominations"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="6">   
          <NominationTable ref={NominationTableRef}                         
                         loadForm={(h) => NominationFormRef.current.loadData(h)}
                     />                  
      </Col>          
      <Col sm="auto" xl="4">    
          <NominationForm ref={NominationFormRef} 
                       reloadTable={() => NominationTableRef.current.reloadData()} />
      </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  
  </>)
}


function RoleView() {
  const RoleTableRef = useRef(null);
  const RoleFormRef = useRef(null); 

  return (
   <>
  <header>   
  </header>
  <nav>
    <Navigation active="roles"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="6">   
          <RoleTable ref={RoleTableRef}                         
                         loadForm={(h) => RoleFormRef.current.loadData(h)}
                     />                  
      </Col>          
      <Col sm="auto" xl="4">    
          <RoleForm ref={RoleFormRef} 
                       reloadTable={() => RoleTableRef.current.reloadData()} />
      </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  
  </>)
}

function PostView() {
  const PostTableRef = useRef(null);
  const PostFormRef = useRef(null); 

  return (
   <>
  <header>   
  </header>
  <nav>
    <Navigation active="posts"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="6">   
          <PostTable ref={PostTableRef}                         
                         loadForm={(h) => PostFormRef.current.loadData(h)}
                     />                  
      </Col>          
      <Col sm="auto" xl="4">    
          <PostForm ref={PostFormRef} 
                       reloadTable={() => PostTableRef.current.reloadData()} />
      </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  
  </>)
}


function DepartmentView() {
  const DepartmentTableRef = useRef(null);
  const DepartmentFormRef = useRef(null); 

  return (
   <>
  <header>   
  </header>
  <nav>
    <Navigation active="departments"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="6">   
          <DepartmentTable ref={DepartmentTableRef}                         
                         loadForm={(h) => DepartmentFormRef.current.loadData(h)}
                     />                  
      </Col>          
      <Col sm="auto" xl="4">    
          <DepartmentForm ref={DepartmentFormRef} 
                       reloadTable={() => DepartmentTableRef.current.reloadData()} />
      </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  
  </>)
}

function ProjectView() {
  const ProjectTableRef = useRef(null);
  const ProjectFormRef = useRef(null); 

  return (
   <>
  <header>   
  </header>
  <nav>
    <Navigation active="projects"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="6">   
          <ProjectTable ref={ProjectTableRef}                         
                         loadForm={(h) => ProjectFormRef.current.loadData(h)}
                     />                  
      </Col>          
      <Col sm="auto" xl="4">    
          <ProjectForm ref={ProjectFormRef} 
                       reloadTable={() => ProjectTableRef.current.reloadData()} />
      </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  
  </>)
}

function EmployeeView() {
  const EmployeeTableRef = useRef(null);
  const EmployeeFormRef = useRef(null); 
  const ReportFormRef = useRef(null); 
  return (
  <>
  <header>   
  </header>
  <nav>
    <Navigation active="employees"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="6">  
          <ReportForm ref={ReportFormRef}/>
          <br /> 
          <EmployeeTable ref={EmployeeTableRef}                         
                         loadForm={(h) => EmployeeFormRef.current.loadData(h)} 
                         apllyEmployeeToReportForm={(h) => ReportFormRef.current.applyEmployee(h)}
                     />                  
      </Col>          
      <Col sm="auto" xl="4">    
         <EmployeeForm ref={EmployeeFormRef} 
                       reloadTable={() => EmployeeTableRef.current.reloadData()}/>
      </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  </>
  )
}

function UsersView() {
  const initilaFilter = {size:10, sort:"username"};
 
  const userTableRef = useRef(null);
  const userDetailRef = useRef(null); 

  return (
  <>
  <header>   
  </header>
  <nav>
    <Navigation active="users"/>
  </nav>
  <main>
    <div style={{
      width:'100%',      
        padding: 1
      }}>

<Container fluid>
    <Row>                
      <Col sm="auto" xl="2">     
          <UserFilter doFilter={(f) => {userTableRef.current.filterData(f)}} filter={initilaFilter}/>         
      </Col>
      <Col sm="auto" xl="4">   
          <UserTable ref={userTableRef} filter={initilaFilter} 
                     loadDetail={(h) => userDetailRef.current.loadData(h)}/>                  
      </Col>          
      <Col sm="auto" xl="4">    
          <UserForm ref={userDetailRef} 
                      reloadTable={() => userTableRef.current.reloadData()}/>
          </Col>          
      </Row>
  </Container>
  <Container fluid>
  <Row>  
  <Col sm="auto" xl="auto">
  </Col>
  </Row>
</Container>
</div>
  </main>
  <footer></footer>

  </>
  )
}

function EmployeeProfileView() {
  const EmployeeListRef = useRef(null);
  const EmployeeDetailRef = useRef(null);
  const GratitudeRef = useRef(null);
  const EmployeeNominationRef = useRef(null);
  const EmployeeIndicatorRef = useRef(null);
  const EmployeePerformanceChartRef = useRef(null);
  const EmployeeProjectInvolvementChartRef = useRef(null); 
  const EmployeeWorkingDayChartRef = useRef(null); 

  return (    
    <>
    <header></header>
    <nav><Navigation active="employeeProfile"/></nav>
      <main>    
      <Container fluid>
        <Row>
          <Col xl="3">
          <EmployeeList ref={EmployeeListRef} 
              loadDetail={(h) => EmployeeDetailRef.current.applyData(h)} 
              loadGratitude={(h) => GratitudeRef.current.applyData(h)}
              loadNominations={(h) => EmployeeNominationRef.current.applyData(h)}
              loadIndicators = {(h) => EmployeeIndicatorRef.current.applyData(h)}
              applyPerformanceChartData = {(d) => EmployeePerformanceChartRef.current.applyData(d)} 
              applyProjectInvolvementData = {(d) => EmployeeProjectInvolvementChartRef.current.applyData(d)}      
              applyWorkingDaysData = {(d) => EmployeeWorkingDayChartRef.current.applyData(d)}          
              />
          </Col>
          <Col xl="4">
          </Col>
          <Col xl="3">          
          </Col>
        </Row>
        <Row>
        <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col xl="3">
          <EmployeeDetail ref={EmployeeDetailRef} />
          <br/>
          <EmployeeGratitude ref={GratitudeRef} />             
          <br/>
          <EmployeeNomination ref={EmployeeNominationRef} />                     
          </Col>          
          <Col xl="4">
          <EmployeeIndicator ref={EmployeeIndicatorRef} />
             
          </Col>
          <Col xl="auto">     
      
          <EmployeePerformanceChart ref={EmployeePerformanceChartRef} />           
          <br/>  
          <EmployeeProjectInvolvementChart ref={EmployeeProjectInvolvementChartRef} />
          <br/> 
          <EmployeeWorkingDayChart ref={EmployeeWorkingDayChartRef} /> 
          </Col>
        </Row>
        <Row>
        <Col>&nbsp;</Col>
        </Row>        
        </Container>
        
      </main>      
    <footer></footer>
    </>
  );
}

function About() {
  return (
    <>
    <header></header>
    <nav><Navigation active="about"/></nav>  
      <main>      
       <br />
        <h2>
          Справка <a target="_blank" href="https://docs.google.com/document/d/1CB2vi1DGNW66iwH9fYQwewvdndD8qb_cxarLWupCoSI/edit?usp=sharing">Руководство пользователя</a>
        </h2>
        <br />
        <img src={dstImg} width="1200px"/>
      </main>    
      <footer></footer>
    </>
  );
}

export default App;
