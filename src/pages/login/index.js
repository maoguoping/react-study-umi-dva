import React, { useState, useEffect } from 'react';
import ReactSVG from 'react-svg';
import {Redirect} from 'react-router-dom';
import { Form } from 'antd';
import './style.scss';
import loginSvg from '../../assets/animate/link.svg'
import LoginBox from '../../components/module/loginBox';
import router from 'umi/router';
import { connect } from 'dva';
const WrapedLoginBox = Form.create({ name: 'normal_login' })(LoginBox);
function Login (props) {
    // const userInfo = props.userInfo;
    const { dispatch, auth } = props;
    const {from} = props.location.state || {from: {pathname: '/managerCenter/deviceList'}};
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    function loginIn(data) {
        let {username, password} = data;
        dispatch({
            type: 'auth/setUserInfo',
            payload: {
                username
            },
          });
        router.push('/managerCenter/deviceList');
    }
    if (redirectToReferrer) {
        return <Redirect to={from}></Redirect>
    } else {
        return (
            <div className="login-page">
                <div className="login-center-area">
                    <div className="login-svg">
                        <img src={loginSvg}/>
                    </div>
                    <WrapedLoginBox loginIn={loginIn}></WrapedLoginBox>
                </div>
            </div>
        )
    }
}
export default connect(({ auth }) => ({
    auth
  }))(Login);