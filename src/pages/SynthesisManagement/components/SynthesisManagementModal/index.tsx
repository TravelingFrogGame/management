import {Button, Drawer, Form, message, Space} from 'antd';
import React, {useMemo, useState} from 'react';
import {
  ProFormSelect, ProFormText, ProFormUploadButton,
} from "@ant-design/pro-components";
import {AssetConfigCombo} from "@/services/ant-design-pro/assetApi";
import * as assetApi from "@/services/ant-design-pro/assetApi";
import useModalController from "@/hooks/useModalController";
import useFuncDataProxy from "@/hooks/useFuncDataProxy";
import * as synthesisListApi from "@/services/ant-design-pro/synthesisListApi";
import {SynthesisType} from "@/services/ant-design-pro/synthesisListApi";
import {UploadFile} from "antd/lib";
import {DataUtils} from "@/utils/DataUtils";
import {CurrencyUtils} from "@/utils/CurrencyUtils";

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback: () => void;
  open: boolean;
  assetList: AssetConfigCombo[];
  initData: T;
}

export function useSynthesisManagementModal<T = any>(callback?: () => void) {

  const {open, openModal, closeModal, data} = useModalController<T>();


  const AssetData = useFuncDataProxy<AssetConfigCombo[]>(assetApi.assetConfigComboBox, {
    queryParameters: {
      assetId: 0,
      type: 1
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

  const initData = props.initData as SynthesisType;
  const title = initData ? '编辑' : '新增';
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[] | undefined>(() => {
    if (DataUtils.isUndefined(initData)) {
      return [];
    }
    return [{uid: '-1', name: 't.png', status: 'done', url: initData.detailsUrl}]
  });

  const assetList = useMemo(() => {
    return [
      {
        value: initData.shopId,
        label: initData.name,
      }
    ]
  }, [_assetList, initData]);


  async function confirmUpdate() {
    const fieldsValues = await form.validateFields();

    const parameterData = {
      shopId: initData.shopId,
      originPrice: fieldsValues.originPrice,
      costPriceType: fieldsValues?.costPriceType,
    }

    const marketApiResult = await  synthesisListApi.update(parameterData);
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
          <Button type="primary" onClick={confirmUpdate}>
            确定
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        initialValues={ initData && {
          assetConfigId: initData.shopId,
          originPrice: initData.originPrice,
          costPriceType: initData.costPriceType,
        }}
      >
        <ProFormSelect
          label={'物品名称'}
          disabled={!!initData}
          showSearch
          rules={[
            {
              required: true,
              message: '物品名称不能为空',
            },
          ]}
          options={assetList}
          name="assetConfigId"
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
          options={assetList}
          name="originPrice"
          placeholder={'请输入价格'}
        />
        <ProFormSelect
          label={'交易货币'}
          showSearch
          rules={[
            {
              required: true,
              message: '交易货币不能为空',
            },
          ]}
          options={CurrencyUtils.shopCurrencyList}
          name="costPriceType"
          placeholder={'请输入内容'}
        />
      </Form>
    </Drawer>
  );
}
