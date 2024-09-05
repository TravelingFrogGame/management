import { Button, Drawer, Space } from 'antd';
import React, {useRef, useState} from 'react';
import {AssetType} from "@/services/ant-design-pro/assetApi";
import {flushSync} from "react-dom";
import {ActionType, ProColumns, ProTable} from "@ant-design/pro-components";
import useFuncListDataProxy from "@/hooks/useFuncListDataProxy";
import * as assetApi from '@/services/ant-design-pro/assetApi'
import {getColumnType} from "@/pages/AssetManagement/components/AssetModal/columns";
interface ModalNodeProps {
  closeModal: () => void;
  open: boolean;
  asset?: AssetType;
}

export function useAssetModal(callback?: () => void) {
  const [open, setOpen] = useState(false);
  const [asset, setAsset] = useState<AssetType>();


  function closeModal() {
    setOpen(false);
  }

  function openModal(asset: AssetType) {
    // console.log(asset, 'assetasset')
    flushSync(async () => {
      setAsset(asset);
      setOpen(true);
    })
  }
  return {
    node: open && <ModalNode open={open} asset={asset} closeModal={closeModal} />,
    openModal,
  };
}


function ModalNode(props: ModalNodeProps) {
  const { closeModal, open, asset } = props;


  const configProxyData = useFuncListDataProxy(assetApi.configList, {
    execution: true,
    queryParameters: {
      assetId: asset?.id
    }
  });

  const actionRef = useRef<ActionType>();

  const columns = getColumnType(asset?.id!);

  return (
    <Drawer
      title="配置信息"
      width={1200}
      open={open}
      onClose={closeModal}
      extra={
        <Space>
          <Button onClick={closeModal}>关闭</Button>
        </Space>
      }
    >
      <ProTable<AssetType, API.PageParams>
        pagination={configProxyData.pagination}
        search={false}
        options={{
          density: false,
          setting: false,
          reloadIcon: <div onClick={configProxyData.refresh}>刷新</div>,
        }}
        actionRef={actionRef}
        rowKey="key"
        columns={columns}
        dataSource={configProxyData.data} />
    </Drawer>
  );
}
