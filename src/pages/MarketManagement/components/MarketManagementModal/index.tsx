import {Button, Drawer, Form, Space} from 'antd';
import React, {useMemo, useState} from 'react';
import {
  ProFormSelect,
} from "@ant-design/pro-components";
import {AssetConfigCombo} from "@/services/ant-design-pro/assetApi";
import * as assetApi from "@/services/ant-design-pro/assetApi";
import useFuncDataProxy from "@/hooks/useFuncDataProxy";

interface ModalNodeProps {
  closeModal(): () => void;
  open: boolean;
  assetList: AssetConfigCombo[];
}

const currencyList = [
  {
    value: 1,
    label: '三叶草',
  },
  {
    value: 2,
    label: '种子',
  }
];

export function useMarketManagementModal(callback?: () => void) {
  const [open, setOpen] = useState(false);

  const AssetData = useFuncDataProxy<AssetConfigCombo[]>(assetApi.assetConfigComboBox, {
    queryParameters: {
      assetId: 0,
      type: 3
    }
  });


  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }

  console.log(AssetData, 'AssetData.data===')

  return {
    node: AssetData.init && <ModalNode open={open} assetList={AssetData.data!} closeModal={closeModal} />,
    openModal,
  };
}

function ModalNode(props: ModalNodeProps) {
  const { closeModal, open, assetList: _assetList } = props;

  const [form] = Form.useForm();


  const assetList = useMemo(() => {
    return _assetList.map((item) => {
      return {
        value: item.id,
        label: item.name,
        ...item,
      }
    })
  }, [_assetList]);

  async function confirm() {
    const fieldsValues = await form.validateFields();

    const parameterData = {
      sellAssetId: fieldsValues.sellAssetId,
      sellAssetConfigId: 3,
      buyAssetId: fieldsValues.buyAssetId,
    }

    console.log(parameterData, 'parameterData===')
  }

  return (
    <Drawer
      title="新增"
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
          label={'物品名称'}
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
