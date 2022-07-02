import React from 'react';
import { Nav, NavItem, NavLink, Navbar, Collapse, NavbarText } from "reactstrap"; 
import { NavLink as RRNavLink } from 'react-router-dom';
import { LoggedIn } from './LoggedIn';

export class Navigation extends React.Component {

    isActive(page) {
        return this.props.active === page ? 'active' : 'inactive'; 
    }

    render() {
        return (
            <>
            <Navbar
    color="light"
    expand="md"
    light
  > <Collapse navbar>
            <Nav className="me-auto" pills>
                <NavItem>
                    <NavLink className={ this.isActive('employeeProfile') }  to="/app/employeeProfile" tag={RRNavLink}>
                        Профиль сотрудника
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('employeeComparation') }  to="/app/employeeComparation" tag={RRNavLink}>
                        Сравнение сотрудников
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('employees') }  to="/app/employees" tag={RRNavLink}>
                        Изменение сотрудников
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('projects') }  to="/app/projects" tag={RRNavLink}>
                        Проекты
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('departments') }  to="/app/departments" tag={RRNavLink}>
                        Отделы
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('roles') }  to="/app/roles" tag={RRNavLink}>
                        Роли
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('posts') }  to="/app/posts" tag={RRNavLink}>
                        Должности
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('nominations') }  to="/app/nominations" tag={RRNavLink}>
                        Номинации
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('gratitudes') }  to="/app/gratitudes" tag={RRNavLink}>
                        Благодарности
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('users') }  to="/app/users" tag={RRNavLink}>
                        Пользователи
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={ this.isActive('about') }  to="/app/about" tag={RRNavLink}>
                        Справка
                    </NavLink>
                </NavItem>                              
            </Nav>  
            <NavbarText>
                <LoggedIn />
            </NavbarText>
</Collapse>

            </Navbar>
        </>        
        );
    }
}