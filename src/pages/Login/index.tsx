import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import styles from './index.less';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { login } from '@/api/user';


const LoginPage: React.FC = () => {
  // const [user, setUser] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (formValues: any) => {
    console.log('onFinish:', formValues);
    setLoading(true);

    login(formValues).then((resp: any) => {
      setLoading(false);
      // this.$router.push(this.$route.query.redirect || '/')
      console.log('resp', resp);
      if(resp.code === 200) {
        history.push('/sugar/home')
      }

    }).catch(() => {
      setLoading(false);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Spin spinning={loading}>
          <Form
            name='basic'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Username'
              name='userName'
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            {/*<Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>*/}
            {/*  <Checkbox>Remember me</Checkbox>*/}
            {/*</Form.Item>*/}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </PageContainer>
  );
};

export default LoginPage;