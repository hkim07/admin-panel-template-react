import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import { 
  Menu, 
  Grid, 
  Segment,
  Button,
  Form,
  Header,
  Input,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AgencyOfficeBanner from '../components/AgencyOfficeBanner';
import ForgotPasswordModal from './ForgotPasswordModal';
import { showToastMessage } from '../actions/AuthAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      email: '',
      password: '',
      forgotPasswordModal: {
        isModalVisible: false,
        mobile: '',
        otp: '',
        otpSent: false
      }
    };
  }

  onEmailChange(email) {
    this.setState({
      email
    });
  }

  onPasswordChange(password) {
    this.setState({
      password
    });
  }

  onLoginClick() {
    console.log(this.state);
    this.props.showToast({
      type: 'warn',
      message: 'Test'
    });
  }

  onForgotPasswordClick() {
    const forgotPasswordModal = 
        Object.assign({}, this.state.forgotPasswordModal);
    forgotPasswordModal.isModalVisible = true;

    this.setState({
      forgotPasswordModal
    });
  }

  onForgotPasswordModalClose() {
    const forgotPasswordModal = 
        Object.assign({}, this.state.forgotPasswordModal);
    forgotPasswordModal.isModalVisible = false;
    
    this.setState({
      forgotPasswordModal
    });
  }

  onForgotPasswordModalMobileChange(mobile) {
    const forgotPasswordModal = 
        Object.assign({}, this.state.forgotPasswordModal);
    forgotPasswordModal.mobile = mobile;
    
    this.setState({
      forgotPasswordModal
    });
  }

  onForgotPasswordModalOtpChange(otp) {
    const forgotPasswordModal = 
        Object.assign({}, this.state.forgotPasswordModal);
    forgotPasswordModal.otp = otp;
    
    this.setState({
      forgotPasswordModal
    });
  }

  onSendOrVerifyOtpClick() {
    if (this.state.forgotPasswordModal.otpSent) {
      // verify otp
    } else {
      // send otp
    }
  }

  render() {
    return (
      <div>
        <Menu id="menu">
          <div id="menuLogo">
            <img src="static/images/logo.png" />
          </div>
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/signup">Signup</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/help">Help</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid stackable columns={2} padded>
          <AgencyOfficeBanner />
          <Grid.Column>
            <Segment basic padded>
              <Header as="h2" textAlign="center">
                Please Login
              </Header>
              <Segment padded>
                <Form>
                  <Form.Field>
                    <label>Email</label>
                    <Input
                      icon="at"
                      iconPosition="left"
                      type="email"
                      defaultValue={this.state.email}
                      onChange={
                        (event) => {
                          this.onEmailChange(event.target.value);
                        }
                      }
                      placeholder="Registered Email" />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <Input
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      defaultValue={this.state.password}
                      onChange={
                        (event) => {
                          this.onPasswordChange(event.target.value);
                        }
                      }
                      placeholder="Your Password" />
                  </Form.Field>
                  <Button primary fluid 
                    type="submit" onClick={this.onLoginClick}
                  >
                    <Icon name="sign-in" />
                    Login
                  </Button>
                  <Header as="h5" textAlign="center">
                    <Link to="#" onClick={this.onForgotPasswordClick}>
                      Forgot Password?
                    </Link>
                  </Header>
                  <Header as="h4" textAlign="center">
                    Don&apos;t have an account?
                    &nbsp;&nbsp;
                    <Link to="/signup">Signup</Link>
                  </Header>
                </Form>
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid>

        <ForgotPasswordModal
          onSendOrVerifyOtpClick={this.onSendOrVerifyOtpClick}
          modalData={this.state.forgotPasswordModal}
          onModalClose={this.onForgotPasswordModalClose}
          onMobileChange={this.onForgotPasswordModalMobileChange}
          onOtpChange={this.onForgotPasswordModalOtpChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (/*state*/) => ({
});

const mapDispatchToProps = (dispatch) => ({
  showToast: (payload) => {
    dispatch(showToastMessage(payload));
  }
});

Login.propTypes = {
  showToast: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
