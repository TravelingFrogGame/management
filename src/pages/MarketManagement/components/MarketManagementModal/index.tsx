import {Button, Drawer, Form, message, Space} from 'antd';
import React, {useMemo} from 'react';
import {
  ProFormSelect,
} from "@ant-design/pro-components";
import {AssetConfigCombo} from "@/services/ant-design-pro/assetApi";
import * as assetApi from "@/services/ant-design-pro/assetApi";
import * as marketApi from "@/services/ant-design-pro/marketApi";
import useFuncDataProxy from "@/hooks/useFuncDataProxy";
import useModalController from "@/hooks/useModalController";
import {MarketType} from "@/services/ant-design-pro/marketApi";

interface ModalNodeProps<T> {
  closeModal: () => void;
  callback?: () => void;
  open: boolean;
  assetList: AssetConfigCombo[];
  data?: T | undefined;
}

const currencyList = [
  {
    value: 2,
    label: '三叶草',
  },
  {
    value: 3,
    label: '种子',
  }
];

export function useMarketManagementModal<T = any>(callback?: () => void) {

  const {open, openModal, closeModal, data} = useModalController<T>();

  const AssetData = useFuncDataProxy<AssetConfigCombo[]>(assetApi.assetConfigComboBox, {
    queryParameters: {
      assetId: 0,
      type: 3
    }
  });

  const openNode = useMemo(() => {
    return open && AssetData.init;
  }, [open, AssetData.init])

  return {
    node: openNode && <ModalNode<T> callback={callback} open={open} assetList={AssetData.data!} closeModal={closeModal} data={data}/>,
    openModal,
  };
}

function ModalNode<T = any>(props: ModalNodeProps<T>) {
  const { closeModal, open, assetList: _assetList } = props;

  const initData = props.data as MarketType;

  const [form] = Form.useForm();

  const assetList = useMemo(() => {
    return _assetList.map((item) => {
      return {
        // value: item.id,
        value: `${item.assetConfigId}-${item.assetId}`,
        label: item.name,
        ...item,
      }
    })
  }, [_assetList]);

  async function confirm() {
    const fieldsValues = await form.validateFields();

    const keyId = fieldsValues.sellAssetId;

    const id = Number(keyId.split('-')[0]);
    const assetId = Number(keyId.split('-')[1]);

    const asset = assetList.find((item) => {
      return item.assetConfigId === id && item.assetId === assetId;
    })

    const parameterData = {
      sellAssetId: asset?.assetId,
      sellAssetConfigId: asset?.assetConfigId!,
      buyAssetId: fieldsValues.buyAssetId,
      id: initData ? initData.id : 0,
    }

    const marketApiResult = await (initData ? marketApi.update : marketApi.add)(parameterData);
    if (marketApiResult.error) {
      message.error(marketApiResult.msg);
      return;
    }
    props.callback && props.callback();
    message.success('操作成功');
    closeModal();
  }

  const title = initData ? '编辑' : '新增';

  return (
    <Drawer
      title={title}
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
        initialValues={initData && {
          ...initData,
          sellAssetId: `${initData.sellAssetConfigId}-${initData.sellAssetId}`
        }}
        onFinish={async (value) => {}}
      >
        <ProFormSelect
          showSearch
          label={'物品名称'}
          disabled={!!initData}
          rules={[
            {
              required: true,
              message: '物品名称不能为空',
            },
          ]}
          options={assetList}
          name="sellAssetId"
          placeholder={'请输入标题'}
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
          options={currencyList}
          name="buyAssetId"
          placeholder={'请输入内容'}
        />
      </Form>
    </Drawer>
  );
}


