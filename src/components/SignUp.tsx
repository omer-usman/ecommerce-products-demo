import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../redux/userSlice';
import './SignUp.css'; // Import the CSS file

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    dispatch(signUp(values));
    message.success('Account created successfully');
    navigate('/signin');
  };

  return (
    <div className="signup-container">
      <div className="signup-title">Sign Up</div>
      <Form form={form} onFinish={onFinish} className="signup-form">
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]} className="signup-form-item">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} className="signup-form-item">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item className="signup-form-item">
          <Button type="primary" htmlType="submit" className="signup-button">
            Sign Up
          </Button>
        </Form.Item>
        <div className="signup-links">
          <Button type="link" onClick={() => navigate('/signin')}>Sign In</Button>
          <Button type="link" onClick={() => navigate('/forgot-password')}>Forgot Password</Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;