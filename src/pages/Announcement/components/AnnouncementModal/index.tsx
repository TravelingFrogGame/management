import {Button, Drawer, Form, Space} from 'antd';
import React, {useState} from 'react';
import {ProFormDateTimePicker, ProFormText, ProFormTextArea, ProFormUploadButton} from "@ant-design/pro-components";
import {UploadFileType, useAliOSSUploader} from "@/hooks/useAliOSSUploader";
import {RcFile} from "antd/lib/upload";

interface ModalNodeProps {
  closeModal: () => void;
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
    node: <ModalNode open={open} closeModal={closeModal} />,
    openModal,
  };
}

function ModalNode(props: ModalNodeProps) {
  const { closeModal, open } = props;
  const [form] = Form.useForm();
  const {upload} = useAliOSSUploader();
  const _handleRequest = async (info: any) => {
    console.log(`handle request : ${info}`)
  }
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
      <Form
        form={form}
        onFinish={async (value) => {
          console.log(`finish : ${JSON.stringify(value)}`);
        }}
      >
        <ProFormText
          label={'标题'}
          rules={[
            {
              required: true,
              message: '标题不能为空',
            },
          ]}
          width="md"
          name="title"
          placeholder={'请输入标题'}
          // initialValue={currentRow?.version ?? ''}
        />
        <ProFormText
          label={'内容'}
          rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}
          width="md"
          name="content"
          placeholder={'请输入内容'}
          // initialValue={currentRow?.url ?? ''}
        />
        <ProFormText
          label={'图片地址'}
          rules={[
            {
              required: true,
              message: '图片地址不能为空',
            },
          ]}
          width="md"
          name="url"
          placeholder={'请输入图片地址'}
          // initialValue={currentRow?.url ?? ''}
        />
        <ProFormUploadButton
          label={'选择图片'}
          name={'fileUrl'}
          fieldProps={{
            // method: 'POST',
            // name: 'file',
            listType: 'picture-card',
            accept: '.png, .jpg, .jpeg',
            maxCount: 1,
            progress: {
              strokeColor: {
                '0%': 'red',
                '100%': 'blue'
              },
              size: 3
            },
            customRequest: _handleRequest,
            action: (file: RcFile) => {
              console.log(`file : ${JSON.stringify(file)}`)
            }
          }}
          onChange={(e) => {
            upload(e.file.name, e.file.originFileObj, UploadFileType.Version)
          }}
        />
        <ProFormDateTimePicker
          label={'发布时间'}
          width={'md'}
          placeholder={'请选择发布时间'}
          name={'publishTime'}
          rules={[{required: true, message: '发布时间不能为空'}]}
          fieldProps={{format: 'YY/MM/DD hh:mm:ss'}}
          // initialValue={currentRow?.publishTime ?? currentRow?.createTime}
        />
        <ProFormTextArea
          label={'备注'}
          placeholder={'备注(非必填)'}
          width="md"
          name="remark"
          // initialValue={currentRow?.remark ?? ''}
        />
      </Form>
    </Drawer>
  );
}
