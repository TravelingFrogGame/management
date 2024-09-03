
import React, {useState} from 'react';
import {Button, Drawer, Space} from "antd";


interface ModalNodeProps {
  closeModal(): () => void;
  open: boolean;
}

export function useAnnouncementModal(callback?: () => void) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }
  return {
    node: (
      <ModalNode open={open} closeModal={closeModal}/>
    ),
    openModal,
  };
}

function ModalNode(props: ModalNodeProps) {
  const {closeModal, open} = props;


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
