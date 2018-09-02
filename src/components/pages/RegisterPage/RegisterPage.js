import React from 'react';
import './RegisterPage.css';
// import { withRouter } from 'react-router-dom';
import RoundedButton from '../../atoms/RoundedButton/RoundedButton';
import axios from 'axios';
// import {
//     userProfileSetUserId,
// } from '../../../redux/actions';
// import { connect } from 'react-redux';

import LoginLayout from '../../organisms/LoginLayout/LoginLayout';
import InputTwoFA from '../../atoms/InputTwoFA/InputTwoFA';
import LoginContainer from '../../atoms/LoginContainer/LoginContainer';
import InputFieldLogin from '../../atoms/InputFieldLogin/InputFieldLogin';
import CopyText from '../../atoms/CopyText/CopyText';
import { Row, Col } from 'reactstrap';
class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.submiTwoFAtHandle = this.submiTwoFAtHandle.bind(this);
        this.submitCredentialsHandle = this.submitCredentialsHandle.bind(this);
        this.rotation = this.rotation.bind(this);
        this.state = {
            email: "",
            password: "",
            errors: "",
            emailConfirmationBackend: '',
            accountLoading: false,
            verifyLoading: false
        }
    }

    componentDidMount = () => {
        axios.get('http://173.249.46.156/api/v1/utils/totp')
            .then(response => {
                console.log(response)
                let formatedResponse = {
                    secret: response.data.data.secret,
                    qrCodeImage: response.data.data.imageData
                };
                this.setState(formatedResponse);
                // this.props.registerPageSetFormData(formatedResponse);
            })
            .catch(function (error) {
            });
    };


    submitCredentialsHandle(e) {
        e.preventDefault();
        this.rotation();
        // this.setState({ accountLoading: true });
        // axios.post(process.env.REACT_APP_BACKEND_URL + '/users/login', {
        //     email: this.state.email,
        //     password: this.state.password
        // })
        //     .then(response => {
        //         this.setState({ accountLoading: false });
        //         this.rotation();
        //     })
        //     .catch((error) => {
        //         if (error.response.status === 401) {
        //             this.setState({ accountLoading: false });
        //             this.props.showErrorMessage(error.response.data.error.message);
        //         } else if (error.response.status === 422) {
        //             this.setState({ accountLoading: false });
        //             this.props.showErrorMessage(error.response.data.error.message);

        //         }
        //     });
    }
    submiTwoFAtHandle(e) {
        e.preventDefault();
        this.setState({ verifyLoading: true });
        axios.post(process.env.REACT_APP_BACKEND_URL + '/users/login1', {
            token: e.target.token.value
        })
            .then(response => {
                return axios.get(process.env.REACT_APP_BACKEND_URL + '/users/me')
            })
            .then(response => {
                // this.props.userProfileSetUserId(response.data.data.id);
                this.setState({ verifyLoading: false });
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 422) {
                    this.props.showErrorMessage(error.response.data.error.message);
                }
                this.setState({ verifyLoading: false });
            });
    }


    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }


    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })

    }
    rotation() {
        document.getElementsByClassName('auth-page-container')[0].classList.toggle('flip');
    }

    render() {
        return (
            <LoginLayout>
                <div>
                    <LoginContainer>
                        <form onSubmit={this.submitCredentialsHandle}>
                            <InputFieldLogin type="text" changereduxdata={this.changeEmail} text={"First name"} placeholder="" value={this.props.email} maskChar={null} /> <br />
                            <InputFieldLogin type="text" changereduxdata={this.changeEmail} text={"Last name"} placeholder="" value={this.props.email} maskChar={null} /> <br />
                            <InputFieldLogin type="email" changereduxdata={this.changeEmail} text={"Email"} placeholder="" value={this.props.email} maskChar={null} /> <br />
                            <InputFieldLogin type="password" changereduxdata={this.changePassword} text={"Password"} placeholder="" value={this.props.password} maskChar={null} />
                            <InputFieldLogin type="password" changereduxdata={this.changePassword} text={"Password repeat"} placeholder="" value={this.props.passwordRepeat} maskChar={null} />
                            <br />
                            <RoundedButton
                                loading={this.state.accountLoading}
                                style={{ display: 'block', margin: '0 auto', width: '150px' }}>
                                REGISTER
                            </RoundedButton>
                        </form>
                    </LoginContainer>
                </div>
                <div>
                    <LoginContainer>
                        <form onSubmit={this.submiTwoFAtHandle}>
                            <Row>
                                <Col md="6">
                                    <img class="registerTfaQrImage" alt="" src="data:image/png;base64,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" />
                                </Col>
                                <Col md="6">
                                    <div>If you are unable to scan a QR code, enter this secret code in your two-step auth app instead:</div>
                                    <div style={{ width: '100%', padding: 0 }}>
                                        <CopyText textToCopy={"NFHV4SDNLJEECPSKMU3HWSJPNEQXG6RDGA2W47JZJ4RT4IZSFEUQ"} desc={"Click to copy"} />
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <InputTwoFA errors={this.state.errors} tFaDesc={"Authentication code"} name="token" />
                            <br />
                            <RoundedButton loading={this.state.loading} style={{ display: 'block', margin: '0 auto', width: '150px' }}>{'FINISH'}</RoundedButton>
                        </form>

                    </LoginContainer>
                </div>
            </LoginLayout>
        );
    }
}
export default LoginPage;

// const mapStateToProps = state => {
//     return {
//         userId: state.userProfile.userId,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         userProfileSetUserId: userId => dispatch(userProfileSetUserId(userId))
//     }
// }

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LoginPage));