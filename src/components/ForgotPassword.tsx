import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const users = useSelector((state: RootState) => state.user.users);
  const navigate = useNavigate();

  const onFinish = (values: { username: string }) => {
    const user = users.find((u) => u.username === values.username);
    if (user) {
      message.success(`Your password is: ${user.password}`);
    } else {
      message.error('Username not found');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-title">Forgot Password</div>
      <Form form={form} onFinish={onFinish} className="forgot-password-form">
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]} className="forgot-password-form-item">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item className="forgot-password-form-item">
          <Button type="primary" htmlType="submit" className="forgot-password-button">
            Retrieve Password
          </Button>
        </Form.Item>
        <div className="forgot-password-links">
          <Button type="link" onClick={() => navigate(-1)}>Back</Button>
          <Button type="link" onClick={() => navigate('/signin')}>Sign In</Button>
          <Button type="link" onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;