import {Button, Drawer, Form, message, Space} from 'antd';
import React from 'react';
import {
  ProFormText, ProFormCheckbox, ProFormTextArea
} from "@ant-design/pro-components";
import * as userInfoApi from "@/services/ant-design-pro/userInfoApi";
import useModalController from "@/hooks/useModalController";
import {UserInfo} from "@/services/ant-design-pro/userInfoApi";
import {roleList} from '@/../config/routes';
import {CryptoUtils} from "@/utils/CryptoUtils";

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback?: () => void;
  open: boolean;
  data?: T | undefined;
}

const menus = roleList.map((value, index, array) => {
  return {
    value: value.path.split("/")[1],
    label: value.name,
  }
});

export function useAccountManagementModal<T = any>(callback?: () => void) {
  const {open, openModal, closeModal, data} = useModalController<T>();

  return {
    node: open && <ModalNode<T> open={open} closeModal={closeModal} data={data}  callback={callback}/>,
    openModal,
  };
}

function ModalNode<T>(props: ModalNodeProps<T>) {
  const { closeModal, open, assetList: _assetList } = props;
  const initData = props.data as UserInfo;
  const [form] = Form.useForm();

  const title = initData ? '编辑' : '新增';

  async function confirm() {
    const fieldsValues = await form.validateFields();
    const parameterData = {
      ...fieldsValues,
      password: CryptoUtils.md5Encode(fieldsValues.password),
      menu: fieldsValues.menu.join(',')
    }
    const marketApiResult = await userInfoApi.create(parameterData);
    if (marketApiResult.error) {
      message.error(marketApiResult.msg);
      return;
    }
    props.callback && props.callback();
    message.success('操作成功');
    closeModal();
  }

  async function confirmUpdate() {
    const fieldsValues = await form.validateFields();
    const parameterData = {
      gmId: initData.gmId,
      menu: fieldsValues.menu.join(','),
      remark: fieldsValues.remark,
      name: fieldsValues.name,
      ...fieldsValues.password && { password : CryptoUtils.md5Encode(fieldsValues.password) },
    }
    const marketApiResult = await  userInfoApi.update(parameterData);

    if (marketApiResult.error) {
      message.error('操作失败');
      return;
    }
    props.callback && props.callback();
    message.success('操作成功');
    closeModal();
  }

  return (
    <Drawer
      title={title}
      width={500}
      open={open}
      onClose={closeModal}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button type="primary" onClick={initData ? confirmUpdate : confirm}>
            确定
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        initialValues={ initData && {
          account: initData.account,
          name: initData.name,
          menu: (initData.menu || '').split(","),
          remark: initData.remark,
        }}
      >

        {
          !initData && <ProFormText
            label={'账号'}
            rules={[
              {
                required: true,
                message: '账号不能为空',
              },
            ]}
            name="account"
            placeholder={'请输入账号'}
          />
        }
        <ProFormText
          label={'密码'}
          rules={[
            {
              required: !initData,
              message: '密码不能为空',
            },
          ]}
          name="password"
          placeholder={'请输入密码'}
        />

        <ProFormText
          label={'昵称'}
          rules={[
            {
              required: true,
              message: '昵称不能为空',
            },
          ]}
          name="name"
          placeholder={'请输入昵称'}
        />
        <ProFormCheckbox.Group
          label="菜单"
          name="menu"
          options={menus}
        />

        <ProFormTextArea
          label={'备注'}
          name="remark"
          placeholder={'请输入备注'}
        />
      </Form>
    </Drawer>
  );
}
