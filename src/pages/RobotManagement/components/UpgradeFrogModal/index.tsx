import {Button, Drawer, Form, message, Space} from 'antd';
import React from 'react';
import {
  ProFormDigit, ProFormSelect, ProFormText,
} from "@ant-design/pro-components";
import useModalController from "@/hooks/useModalController";
import * as robotApi from '@/services/ant-design-pro/robotApi';

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback?: () => void;
  open: boolean;
}

const lvList = [
  {
    value: '1',
    label: 'Lv1',
  },
  {
    value: '2',
    label: 'Lv2',
  },
  {
    value: '3',
    label: 'Lv3',
  }
]

export function useUpgradeFrogModal<T = any>(callback?: () => void) {

  const {open, openModal, closeModal} = useModalController<T>();

  return {
    node: open && <ModalNode<T> callback={callback} open={open} closeModal={closeModal}/>,
    openModal,
  };
}

function ModalNode<T = any>(props: ModalNodeProps<T>) {
  const { closeModal, open, assetList: _assetList, callback} = props;

  const [form] = Form.useForm();

  async function confirm() {
    const fieldsValues = await form.validateFields();
    const createResult = await robotApi.create(fieldsValues);
    if (createResult.error) {
      message.error(createResult.msg);
      return;
    }
    message.success('创建成功');
    closeModal();
    callback && callback();
  }

  return (
    <Drawer
      title={'升级青蛙'}
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
        <ProFormSelect
          showSearch
          label={'将青蛙升级到'}
          rules={[
            {
              required: true,
              message: '不能为空',
            },
          ]}
          options={lvList}
          name="sellAssetId"
          placeholder={'请输入标题'}
        />
        <div style={{paddingLeft: '20px', fontSize: '12px'}}>
          提示：该帐号下所有低于Lv2的都将升级到Lv2
        </div>
      </Form>
    </Drawer>
  );
}


