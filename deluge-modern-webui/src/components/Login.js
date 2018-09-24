import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
         Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        this.props.loginHandler(this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Modal isOpen={true} className={this.props.className}>
                    <Form onSubmit={this.onSubmit} >
                        <ModalHeader>Login</ModalHeader>
                        <ModalBody>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    {!this.props.error && 
                                        <Input type="password" name="password" id="password" placeholder="enter password"
                                                value={this.state.password}
                                                onChange={e => this.setState({ password: e.target.value })}
                                        />
                                    }
                                    {this.props.error &&
                                        <div>
                                            <Input type="password" name="password" id="password" placeholder="enter password"
                                                    value={this.state.password}
                                                    onChange={e => this.setState({ password: e.target.value })}
                                                    invalid
                                            />
                                            <FormFeedback>Invalid password</FormFeedback>
                                        </div>
                                    }
                                </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary">Login</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}