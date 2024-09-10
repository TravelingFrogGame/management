import {Button, Drawer, Form, message, Space} from 'antd';
import React, {useMemo, useState} from 'react';
import {
  ProFormSelect, ProFormText,
} from "@ant-design/pro-components";
import {AssetConfigCombo} from "@/services/ant-design-pro/assetApi";
import * as assetApi from "@/services/ant-design-pro/assetApi";
import useModalController from "@/hooks/useModalController";
import useFuncDataProxy from "@/hooks/useFuncDataProxy";
import * as lotteryApi from "@/services/ant-design-pro/lotteryApi";
import {CurrencyUtils} from "@/utils/CurrencyUtils";
import {ProFormDatePicker} from "@ant-design/pro-form/lib";

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback: () => void;
  open: boolean;
  assetList: AssetConfigCombo[];
  initData: T;
}

export function useCollectionManagementModal<T = any>(callback?: () => void) {

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

  const initData = props.initData as HotShopAddType;
  const title = initData ? '编辑' : '新增';
  const [form] = Form.useForm();


  const assetList = useMemo(() => {

    console.log(initData, 'initData===')
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
        value: `${item.id}-${item.assetId}`,
        label: item.name,
        ...item
      }
    })
  }, [_assetList, initData]);

  async function confirm() {
    const fieldsValues = await form.validateFields();

    const assetIdText = fieldsValues.assetId;

    const id = Number(assetIdText.split('-')[0]);
    const assetId = Number(assetIdText.split('-')[1]);

    const asset = assetList.find((item) => {
      return item.assetId === assetId && item.id === id;
    });

    const parameterData = {
      assetId: asset?.assetId,
      assetConfigId: asset?.id!,
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
          label={'藏品名称'}
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
          label={'价格（￥）'}
          rules={[
            {
              required: true,
              message: '价格不能为空',
            },
          ]}
          name="probability"
          placeholder={'请输入价格'}
        />
        <ProFormSelect
          label={'交易货币'}
          rules={[
            {
              required: true,
              message: '交易货币不能为空',
            },
          ]}
          options={CurrencyUtils.currencyList}
          name="buyAssetId"
          placeholder={'请输入内容'}
        />
        <ProFormDatePicker
          label={'首发开始时间'}
          rules={[
            {
              required: true,
              message: '首发开始时间为空',
            },
          ]}
          options={CurrencyUtils.currencyList}
          name="buyAssetId"
          placeholder={'请选择首发开始时间'}
        />
        <ProFormDatePicker
          label={'首发结束时间'}
          rules={[
            {
              required: true,
              message: '首发结束时间不能为空',
            },
          ]}
          options={CurrencyUtils.currencyList}
          name="buyAssetId"
          placeholder={'请选择首发结束时间'}
        />
      </Form>
    </Drawer>
  );
}
