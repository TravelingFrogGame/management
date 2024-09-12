import {Button, Drawer, Form, message, Space} from 'antd';
import React, {useMemo, useState} from 'react';
import {
  ProFormSelect, ProFormText,
} from "@ant-design/pro-components";
import {AssetConfigCombo} from "@/services/ant-design-pro/assetApi";
import * as assetApi from "@/services/ant-design-pro/assetApi";
import useModalController from "@/hooks/useModalController";
import useFuncDataProxy from "@/hooks/useFuncDataProxy";
import {CurrencyUtils} from "@/utils/CurrencyUtils";
import * as lotteryApi from "@/services/ant-design-pro/lotteryApi";
import {LotteryType} from "@/services/ant-design-pro/lotteryApi";
import * as shopApi from "@/services/ant-design-pro/shopApi";

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback: () => void;
  open: boolean;
  assetList: AssetConfigCombo[];
  initData: T;
}

export function useLotteryManagementModal<T = any>(callback?: () => void) {

  const {open, openModal, closeModal, data} = useModalController<T>();


  const AssetData = useFuncDataProxy<AssetConfigCombo[]>(assetApi.assetConfigComboBox, {
    queryParameters: {
      assetId: 0,
      type: 4
    }
  });

  const openNode = useMemo(() => {
    return open && AssetData.init;
  }, [open, AssetData.init])


  return {
    node: openNode && <ModalNode<T> open={open} assetList={AssetData.data!} closeModal={closeModal} callback={callback!} initData={data!}/>,
    openModal,
  };
}

function ModalNode<T>(props: ModalNodeProps<T>) {
  const { closeModal, open, assetList: _assetList } = props;

  const initData = props.initData as LotteryType;
  const title = initData ? '编辑' : '新增';
  const [form] = Form.useForm();


  const assetList = useMemo(() => {

    if (initData) {
      return [
        {
          value: initData.id,
          label: initData.name,

        }
      ]
    }

    return _assetList.map((item) => {
      return {
        value: `${item.assetConfigId}-${item.assetId}`,
        label: item.name,
        ...item
      }
    })
  }, [_assetList, initData]);

  async function confirm() {
    const fieldsValues = await form.validateFields();

    const keyId = fieldsValues.assetId;

    const assetConfigId = Number(keyId.split('-')[0]);
    const assetId = Number(keyId.split('-')[1]);

    const asset = assetList.find((item) => {
      return item.assetId === assetId && item.assetConfigId === assetConfigId;
    });

    const parameterData = {
      assetId: asset?.assetId,
      assetConfigId: asset?.assetConfigId!,
      probability: fieldsValues.probability,
    }
    const apiResult = await lotteryApi.add(parameterData);
    if (apiResult.error) {
      message.error(apiResult.msg);
      return;
    }
    props.callback && props.callback();
    message.success('操作成功');
    closeModal();
  }

  async function confirmUpdate() {
    const fieldsValues = await form.validateFields();

    const parameterData = {
      id: initData.id,
      probability: fieldsValues.probability,
    }



    const marketApiResult = await  lotteryApi.update(parameterData);
    //
    if (marketApiResult.error) {
      message.error(marketApiResult.msg);
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
        initialValues={
          initData && {
            assetId: initData.id,
            probability: initData.probability.split("/")[0]
          }
        }
      >
        <ProFormSelect
          label={'物品名称'}
          showSearch
          disabled={!!initData}
          rules={[
            {
              required: true,
              message: '物品名称不能为空',
            },
          ]}
          options={assetList}
          name="assetId"
          placeholder={'请输入标题'}
        />
        <ProFormText
          label={'中将概率'}
          rules={[
            {
              required: true,
              message: '中将概率不能为空',
            },
          ]}
          name="probability"
          placeholder={'请输入中将概率'}
        />
      </Form>
    </Drawer>
  );
}
