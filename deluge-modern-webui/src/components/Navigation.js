import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Logo from '../images/deluge-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPause, faPlay, faChevronUp, faChevronDown, faCog } from '@fortawesome/free-solid-svg-icons'

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="white" light expand="md">
                    <NavbarBrand href="#" className="blue font-weight-bold mr-0 mr-md-4"><img className="img-fluid logo" src={Logo} alt="Deluge" />Deluge</NavbarBrand>
                    <div className="d-flex flex-row float-left">
                        <Nav navbar className="flex-row justify-content-start">
                            <div className="d-flex pr-md-3">
                                <NavItem>
                                    <NavLink href="#" className="blue px-2"><FontAwesomeIcon icon={faPlus} /></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#" className="blue px-2"><FontAwesomeIcon icon={faTrash} /></NavLink>
                                </NavItem>
                            </div>
                            <div className="d-flex pr-md-3">
                                <NavItem>
                                    <NavLink href="#" className="px-2"><FontAwesomeIcon icon={faPlay} /></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#" className="px-2"><FontAwesomeIcon icon={faPause} /></NavLink>
                                </NavItem>
                            </div>
                            <NavItem>
                                <NavLink href="#" className="px-2"><FontAwesomeIcon icon={faChevronUp} /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="px-2"><FontAwesomeIcon icon={faChevronDown} /></NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
            </div>
        );
    }
}