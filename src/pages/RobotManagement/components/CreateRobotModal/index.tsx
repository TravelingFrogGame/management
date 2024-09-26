import {Button, Drawer, Form, message, Space} from 'antd';
import React from 'react';
import {
  ProFormDigit,
} from "@ant-design/pro-components";
import useModalController from "@/hooks/useModalController";
import * as robotApi from '@/services/ant-design-pro/robotApi';

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback?: () => void;
  open: boolean;
}

export function useCreateRobotModal<T = any>(callback?: () => void) {

  const {open, openModal, closeModal} = useModalController<T>();

  return {
    node: open && <ModalNode<T> callback={callback} open={open} closeModal={closeModal}/>,
    openModal,
  };
}

function ModalNode<T = any>(props: ModalNodeProps<T>) {
  const { closeModal, open, assetList: _assetList } = props;

  const [form] = Form.useForm();

  async function confirm() {
    const fieldsValues = await form.validateFields();

    const createResult = await robotApi.create(fieldsValues);

    if (createResult.error) {
      message.error(createResult.msg);
      return;
    }
    message.success('创建成功');
  }

  return (
    <Drawer
      title={'新增机器人'}
      width={500}
      open={open}
      onClose={closeModal}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button type="primary" onClick={confirm}>
            确定
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        onFinish={async (value) => {}}
      >
        <ProFormDigit
          min={1}
          label={'机器人数量'}
          rules={[
            {
              required: true,
              message: '机器人数量不能为空',
            },
          ]}
          name="amount"
          placeholder={'请输入机器人数量'}
          initialValue={1}
        />
      </Form>
    </Drawer>
  );
}


