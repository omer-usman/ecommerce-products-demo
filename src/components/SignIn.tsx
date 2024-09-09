import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, selectLoggedInUser } from '../redux/userSlice';
import { RootState } from '../redux/store';
import './SignIn.css'; // Import the CSS file

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    dispatch(login(values));
    setLoginAttempted(true);
  };

  useEffect(() => {
    if (loginAttempted) {
      if (loggedInUser) {
        message.success('Logged in successfully');
        navigate('/products');
      } else {
        message.error('Invalid username or password');
      }
      setLoginAttempted(false);
    }
  }, [loggedInUser, loginAttempted, navigate]);

  return (
    <div className="signin-container">
      <div className="signin-title">Sign In</div>
      <Form form={form} onFinish={onFinish} className="signin-form">
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]} className="signin-form-item">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} className="signin-form-item">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item className="signin-form-item">
          <Button type="primary" htmlType="submit" className="signin-button">
            Sign In
          </Button>
        </Form.Item>
        <div className="signin-links">
          <Link to="/signup">Create Account</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;