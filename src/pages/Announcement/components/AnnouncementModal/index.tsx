import {Button, Drawer, Form, message, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {ProFormDateTimePicker, ProFormText, ProFormTextArea, ProFormUploadButton} from "@ant-design/pro-components";
import {UploadFileType, useAliOSSUploader} from "@/hooks/useAliOSSUploader";
import {add, AnnouncementType, update} from "@/services/ant-design-pro/announcementApi";
import {DataUtils} from "@/utils/DataUtils";
import getCommonTime = DataUtils.getCommonTime;
import dayjs from "dayjs";
import CommonTimeFormatter = DataUtils.CommonTimeFormatter;
import {UploadFile} from "antd/lib";

interface ModalNodeProps {
  closeModal(): () => void;
  open: boolean;
  callback?: (successful: boolean) => void;
  currentItem?: AnnouncementType;
}

export function useAnnouncementModal(callback?: (success: boolean) => void) {
  const [open, setOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState<AnnouncementType>();

  function closeModal() {
    setCurrentItem(undefined);
    setOpen(false);
  }
  function openModal(item?: AnnouncementType) {
    setCurrentItem(item);
    setOpen(true);
  }
  return {
    node: <ModalNode open={open} closeModal={closeModal} callback={callback} currentItem={currentItem}/>,
    openModal,
  };
}

function ModalNode(props: ModalNodeProps) {
  const { closeModal, open ,callback,currentItem} = props;
  const [form] = Form.useForm();
  form.resetFields();
  const {upload} = useAliOSSUploader();

  const [fileList, setFileList] = useState<UploadFile[] | undefined>([]);
  useEffect(() => {

    if (!DataUtils.isUndefined(currentItem)) {
      setFileList([{uid: '-1', name: 'test.png', status: 'done', url: currentItem?.url}])
    }

  }, [currentItem]);

  const _close = () => {
    closeModal()?.();
  }

  return (
    <Drawer
      title="新增公告"
      width={500}
      open={open}
      onClose={_close}
      extra={
        <Space>
          <Button onClick={_close}>取消</Button>
          <Button type="primary" onClick={() => {form.submit();}}>
            确定
          </Button>
        </Space>
      }
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={{...currentItem, url: currentItem && [{uid: '-1', name: 'test.png', status: 'done', url: currentItem?.url}]}}
        onFinish={async (value) => {
          const hide = message.loading('处理中。。。');
          const {url} = value;
          console.log(`公告处理数据 : ${JSON.stringify(url)}`);
          let imageUrl = ''
          if (url[0].hasOwnProperty('originFileObj')) {
            imageUrl = await upload(url[0].name, url[0].originFileObj, UploadFileType.Announcement) as string;
          }else {
            imageUrl = url.url;
          }

          const newValue = {...value, url: imageUrl,publishTime: DataUtils.getCommonTime(value.publishTime)};

          let action;
          let params = newValue;
          if (!DataUtils.isUndefined(currentItem)) {
            params = {...newValue, id: currentItem.id};
            action = update;
          }else {
            action = add;
          }

          const {success, msg} = await action(params);
          hide();
          if (success) {
            closeModal();
            message.success('成功');
          }else {
            message.error(`失败: ${msg}`);
          }
          callback?.(success);
          form.resetFields();
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
          initialValue={currentItem?.title ?? ''}
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
        />
        <ProFormUploadButton
          label={'选择图片'}
          name={'url'}
          rules={[{required: true, message: '图片不能为空'}]}
          fieldProps={{
            listType: 'picture-card',
            accept: '.png, .jpg, .jpeg',
            maxCount: 1,
          }}
        />
        <ProFormDateTimePicker
          label={'发布时间'}
          width={'md'}
          placeholder={'请选择发布时间'}
          name={'publishTime'}
          rules={[{required: true, message: '发布时间不能为空'}]}
          fieldProps={{format: CommonTimeFormatter}}
        />
        <ProFormTextArea
          label={'备注'}
          placeholder={'备注(非必填)'}
          width="md"
          name="remark"
        />
      </Form>
    </Drawer>
  );
}
