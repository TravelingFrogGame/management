import {Button, Drawer, Form, message, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {
  ProFormDigit, ProFormSelect, ProFormText,
} from "@ant-design/pro-components";
import useModalController from "@/hooks/useModalController";
import * as robotApi from '@/services/ant-design-pro/robotApi';
import {useAsyncEffect} from "ahooks";

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback?: () => void;
  open: boolean;
}

export function useFirstPurchaseModal<T = any>(callback?: () => void) {

  const {open, openModal, closeModal} = useModalController<T>();
  const [assetList, setAssetList] = useState();

  useAsyncEffect(async() => {
    const result = await robotApi.hotShopList();
    if (result.error) {
      return;
    }
    setAssetList(result.data.map((item) => {
      return {
        value: item.id,
        label: item.product,
      }
    }));
  }, []);

  return {
    node: open && <ModalNode<T> callback={callback} open={open} closeModal={closeModal} assetList={assetList}/>,
    openModal,
  };
}

function ModalNode<T = any>(props: ModalNodeProps<T>) {
  const { closeModal, open, assetList, callback} = props;

  const [form] = Form.useForm();

  async function confirm() {
    const fieldsValues = await form.validateFields();
    const createResult = await robotApi.buyHotShop(fieldsValues);
    if (createResult.error) {
      message.error(createResult.msg);
      return;
    }
    message.success('购买成功');
    closeModal();
    callback && callback();
  }

  const person = Form.useWatch('person',form);
  const amount = Form.useWatch('amount',form);

  return (
    <Drawer
      title={'首发购买'}
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
          label={'商品'}
          rules={[
            {
              required: true,
              message: '请选择商品',
            },
          ]}
          options={assetList}
          name="id"
          placeholder={'请选择商品'}
        />
        <ProFormText
          label={'购买数量'}
          rules={[
            {
              required: true,
              message: '数量不能为空',
            },
          ]}
          name="amount"
          placeholder={'请输入数量'}
        />
        <ProFormText
          label={'账号数量'}
          rules={[
            {
              required: true,
              message: '账号数量不能为空',
            },
          ]}
          name="person"
          placeholder={'请输入账号数量'}
        />
        <div style={{paddingLeft: '20px', fontSize: '12px'}}>
          提示：选出{person}个账号，每个账号买{amount}个
        </div>
      </Form>
    </Drawer>
  );
}


