import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const users = useSelector((state: RootState) => state.user.users);

  const onFinish = (values: { username: string }) => {
    const user = users.find((u) => u.username === values.username);
    if (user) {
      message.success(`Your password is: ${user.password}`);
    } else {
      message.error('Username not found');
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Retrieve Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;