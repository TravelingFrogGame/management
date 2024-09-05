import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import {AssetType} from "@/services/ant-design-pro/assetApi";
import {flushSync} from "react-dom";

interface ModalNodeProps {
  closeModal: () => void;
  open: boolean;
}

export function useAnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [asset, setAsset] = useState<AssetType>();


  function closeModal() {
    setOpen(false);
  }

  function openModal(asset: AssetType) {
    flushSync(async () => {
      setAsset(asset);
      setOpen(true);
    })
  }
  return {
    node: <ModalNode open={open} asset={asset} closeModal={closeModal} />,
    openModal,
  };
}

function ModalNode(props: ModalNodeProps) {
  const { closeModal, open } = props;

  return (
    <Drawer
      title="新增公告"
      width={500}
      open={open}
      onClose={closeModal}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button type="primary" onClick={closeModal}>
            确定
          </Button>
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
