import {Button, Drawer, Form, message, Space} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ProFormSelect, ProFormText, ProFormUploadButton,
} from "@ant-design/pro-components";
import {AssetConfigCombo} from "@/services/ant-design-pro/assetApi";
import * as assetApi from "@/services/ant-design-pro/assetApi";
import useModalController from "@/hooks/useModalController";
import useFuncDataProxy from "@/hooks/useFuncDataProxy";
import {CurrencyUtils} from "@/utils/CurrencyUtils";
import {ProFormDatePicker} from "@ant-design/pro-form/lib";
import {HotShopAddType} from "@/services/ant-design-pro/hotShopListApi";
import * as hotShopListApi from "@/services/ant-design-pro/hotShopListApi";
import {DataUtils} from "@/utils/DataUtils";
import {UploadFile} from "antd/lib";
import {UploadFileType, useAliOSSUploader} from "@/hooks/useAliOSSUploader";
import dayjs, {Dayjs} from "dayjs";
export const AllFormat = 'YYYY/MM/DD HH:mm:ss';

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
      type: 2
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

  const {upload} = useAliOSSUploader();

  const initData = props.initData as HotShopAddType;
  const title = initData ? '编辑' : '新增';
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[] | undefined>(() => {
    if (DataUtils.isUndefined(initData)) {
      return [];
    }
    return [{uid: '-1', name: 't.png', status: 'done', url: initData.detailsUrl}]
  });

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

    const assetIdText = fieldsValues.assetId;

    const assetConfigId = Number(assetIdText.split('-')[0]);
    const assetId = Number(assetIdText.split('-')[1]);

    const asset = assetList.find((item) => {
      return item.assetId === assetId && item.assetConfigId === assetConfigId;
    });

    const imageUrl = await upload(fieldsValues.detail[0].name, fieldsValues.detail[0].originFileObj, UploadFileType.Assets);

    const parameterData = {
      assetId: asset?.assetId,
      assetConfigId: asset?.assetConfigId!,
      price: Number(fieldsValues.price),
      maxSupply: Number(fieldsValues.maxSupply),
      startTime: fieldsValues.startTime.format(AllFormat),
      endTime: fieldsValues.endTime.format(AllFormat),
      detail: imageUrl,
    }
    const apiResult = await hotShopListApi.add(parameterData);

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

    const imageUrl = fieldsValues.detail[0].originFileObj ?  await upload(fieldsValues.detail[0].name, fieldsValues.detail[0].originFileObj, UploadFileType.Assets) : fieldsValues.detail[0].url;

    const parameterData = {
      id: initData.id,
      price: Number(fieldsValues.price),
      maxSupply: Number(fieldsValues.maxSupply),
      maxSupply2: Number(fieldsValues.maxSupply2),
      startTime: fieldsValues.startTime.format(AllFormat),
      endTime: fieldsValues.endTime.format(AllFormat),
      detailsUrl: imageUrl,
    }
    const marketApiResult = await hotShopListApi.update(parameterData);

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
            price: initData.price,
            startTime: dayjs(initData.startTime),
            endTime: dayjs(initData.endTime),
            // endTime: initData.endTime,
            maxSupply: initData.maxSupply,
            maxSupply2: initData.maxSupply2,
            detail: fileList ? fileList : [0],
          }
        }
      >
        <ProFormSelect
          label={'藏品名称'}
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
          label={'价格（￥）'}
          rules={[
            {
              required: true,
              message: '价格不能为空',
            },
          ]}
          name="price"
          placeholder={'请输入价格'}
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
          name="startTime"
          showTime
          placeholder={'请选择首发开始时间'}
        />
        <ProFormDatePicker
          showTime
          label={'首发结束时间'}
          rules={[
            {
              required: true,
              message: '首发结束时间不能为空',
            },
          ]}
          options={CurrencyUtils.currencyList}
          name="endTime"
          placeholder={'请选择首发结束时间'}
        />
        <ProFormText
          label={'限售'}
          rules={[
            {
              required: true,
              message: '限售不能为空',
            },
          ]}
          name="maxSupply"
          placeholder={'请输入限售'}
        />
        {
          initData && (
            <ProFormText
              label={'库存'}
              rules={[
                {
                  required: true,
                  message: '库存不能为空',
                },
              ]}
              name="maxSupply2"
              placeholder={'请输入库存'}
            />
          )
        }
        <ProFormUploadButton
          label={'选择图片'}
          name={'detail'}
          rules={[{required: true, message: '图片不能为空'}]}
          fieldProps={{
            listType: 'picture-card',
            accept: '.png, .jpg, .jpeg',
            maxCount: 1,
            fileList,
          }}
          onChange={(info) => {
            setFileList(info.fileList.map(obj => {
              return {
                ...obj,
                status: 'done'
              }
            }));
          }}
        />
      </Form>
    </Drawer>
  );
}
