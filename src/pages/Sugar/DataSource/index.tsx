import { PageContainer } from '@ant-design/pro-components';
import { useModel, Link } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { sourceList, addSource, deleteSource, updateSource, tablesBySource, saveTableBySource } from '@/api/source';
import { Button, Form, Input, Modal, Select, Space, Spin, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import styles from './index.less';


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface tableDataType {
  table_alias: string;
  table: string;
  status: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 20 },
};

const SugarDataSource: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);    //  新增及编辑数据源弹窗是否弹出
  const [tableData, setTableData] = useState([]);           //  数据源表格数据
  const [status, setStatus] = useState('add');              //  新增或编辑
  const [editRec, setEditRec] = useState({ source_id: '' });  //  编辑数据
  const [tableModalOpen, setTableModalOpen] = useState(false);    //  新增及编辑数据源弹窗是否弹出
  const [sourceTableList, setSourceTableList] = useState<tableDataType[]>();    //  数据库

  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [tableLoading, setTableLoading] = useState<boolean>(false)


  const [form] = Form.useForm();
  const columns: ColumnsType<DataType> = [
    {
      title: '数据源名称',
      dataIndex: 'base_alias',
      key: 'base_alias',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '地址',
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: '端口',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '数据库',
      dataIndex: 'database',
      key: 'database',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <a onClick={() => onTableManage(_)}>管理表</a>
          <a onClick={() => onEditDataSource(_)}>编辑</a>
          <a onClick={() => onDeleteDataSource(_)}>删除</a>
        </Space>
      ),
    },
  ];

  const tableListColumns: ColumnsType<tableDataType> = [
    {
      title: '别名',
      dataIndex: 'table',
      key: 'table',
      render: (text: any, record: tableDataType) => <Input value={record.table_alias}
                                                           onChange={(v) => onTableInputChange(record, v)} />,
    },
    {
      title: '表名',
      dataIndex: 'table',
      key: 'table',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '操作',
      key: 'status',
      dataIndex: 'status',
      render: (_: any, record: tableDataType) => (
        <Space size='middle'>
          <Switch checked={_+'' === '1'} onChange={(v) => onTableStatus(record, v)}></Switch>
        </Space>
      ),
    },
  ];

  const onTableInputChange = async (rec: tableDataType, v: any) => {
    // console.log('onTableInputChange', v);
    // @ts-ignore
    let newData = sourceTableList.map((item: tableDataType) => {
      if (rec.table === item.table) {
        return { ...item, table_alias: v.target.value };
      } else {
        return { ...item };
      }
    });
    setSourceTableList(newData);
  };

  const onTableStatus = async (rec: tableDataType, v: boolean) => {
    // @ts-ignore
    let newData = sourceTableList.map((item: tableDataType) => {
      if (rec.table === item.table) {
        return { ...item, status: v ? '1' : '0' };
      } else {
        return { ...item };
      }
    });
    setSourceTableList(newData);


  };

  const onTableManage = async (rec: any) => {
    setTableLoading(true)
    setTableModalOpen(true)
    setSourceTableList([])
    setEditRec(rec)
    // @ts-ignore
    let { data, code } = await tablesBySource(rec.source_id);
    setTableLoading(false)
    if (code === 200) {
      setSourceTableList(data.map((item: tableDataType) => ({ ...item, table_alias: item.table_alias || item.table })));
    }
  };

  const onCancelTableManage = (rec: any) => {
    setTableModalOpen(false);
  };

  const onEditDataSource = (rec: any) => {
    // setEditLoading(true)
    setIsModalOpen(true);
    setStatus('edit');
    setEditRec(rec);
    onFill(rec);
  };

  const onDeleteDataSource = async (rec: any) => {
    await deleteSource(rec);
    const { data } = await sourceList();
    setTableData(data);
  };

  const onFinish = async (values: any) => {
    setEditLoading(true)
    if (status === 'add') {
      await addSource(values);
    } else if (status === 'edit') {
      await updateSource({ ...values, source_id: editRec.source_id });
    }
    setEditLoading(false)
    setIsModalOpen(false);
    const { data } = await sourceList();
    setTableData(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = (rec: any) => {
    if (rec) {
      form.setFieldsValue({
        source_id: rec.source_id,
        host: rec.host,
        port: rec.port,
        username: rec.username,
        password: rec.password,
        database: rec.database,
        base_alias: rec.base_alias,
      });
    } else {
      form.setFieldsValue({
        host: '47.106.71.74',
        port: '3306',
        username: 'root',
        password: 'ysyhl9t.A',
        database: 'galaxy',
        base_alias: 'galaxy',
      });
    }
  };

  const onAddDataSource = () => {
    setIsModalOpen(true);
    setStatus('add');
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onReset();
  };

  const onSaveTableList = async () => {
    setTableLoading(true)
    // @ts-ignore
    const { code } = await saveTableBySource({ source_id: editRec.source_id, tables: sourceTableList });
    if (code === 200) setTableModalOpen(false);
    setTableLoading(false)
  };

  const onCancelTableList = () => {
    setTableModalOpen(false);
    setSourceTableList([]);
  };

  useEffect(() => {
    setPageLoading(true)
    sourceList().then(res => {
      setTableData(res.data);
      setPageLoading(false)
    });
  }, []);

  return (
    // <PageContainer ghost>
    <div className={styles.container}>
      <Spin spinning={pageLoading}>
        <Button type={'primary'} onClick={onAddDataSource}>添加数据源</Button>
        <Table rowKey={'source_id'} columns={columns} dataSource={tableData} />
      </Spin>

      <Modal width={1000} title={`${status === 'add' ? '添加' : '编辑'}数据源`} onCancel={handleCancel} open={isModalOpen}
             footer={null}>
        <Spin spinning={editLoading}>
          <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
            <Form.Item name='host' label='地址' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='port' label='端口' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='username' label='用户名' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='密码' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='database' label='数据库' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='base_alias' label='数据库名称' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space size='middle'>
                <Button type='primary' htmlType='submit'>
                  提交
                </Button>
                <Button type='dashed' onClick={() => {
                  setIsModalOpen(false);
                }}>
                  取消
                </Button>
                <Button htmlType='button' onClick={onReset}>
                  重置
                </Button>
                <Button type='dashed' onClick={() => onFill(null)}>
                  填写模版
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal width={1000} title={`表管理`} onCancel={onCancelTableManage} open={tableModalOpen} footer={null}>
        <Spin spinning={tableLoading}>
          <Table size={'small'} rowKey={'table'} columns={tableListColumns} dataSource={sourceTableList} />
          <div>
            <Space align={'center'}>
              <Button type={'primary'} onClick={onSaveTableList}>保存</Button>
              <Button type={'primary'} onClick={onCancelTableList}>取消</Button>
            </Space>
          </div>
        </Spin>
      </Modal>

    </div>
    // </PageContainer>
  );
};

export default SugarDataSource;