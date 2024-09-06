import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProFormDateTimePicker,
  ProFormSelect, ProFormUploadButton,
} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import {Button, Image, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import type { FormValueType } from '../TableList/components/UpdateForm';
import useFuncListDataProxy from "@/hooks/useFuncListDataProxy";
import {ReleaseStatus} from "@/services/ant-design-pro/enum";
import {bannerAdd, bannerClose, BannerItem, bannerList, bannerUpdate} from "@/services/ant-design-pro/bannerApi";
import {UploadFileType, useAliOSSUploader} from "@/hooks/useAliOSSUploader";
import {DataUtils} from "@/utils/DataUtils";
import dayjs from "dayjs";

const Banner: React.FC = () => {
  const bannerData = useFuncListDataProxy(bannerList, {execution: true});

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: BannerItem) => {
    const hide = message.loading('正在添加');
    try {
      const {success,msg} = await bannerAdd({...fields})
      hide();
      if (success) {
        message.success('版本添加成功');
        bannerData.refresh();
      }else {
        message.error(`版本添加失败，请重试: ${msg}`);
      }
      return success;
    } catch (error) {
      hide();
      message.error('版本添加失败，请重试');
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
      const {success,msg} = await bannerUpdate({...fields})
      hide();
      if (success) {
        message.success('更新成功');
        bannerData.refresh();
      }else {
        message.error(`更新失败，请重试: ${msg}`);
      }
      return success;
    } catch (error) {
      hide();
      message.error('更新失败');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param clickRow
   */
  const handleRemove = async (clickRow: BannerItem) => {
    const hide = message.loading('正在删除');
    if (!clickRow) return true;
    console.log(`删除节点 : ${JSON.stringify(clickRow)}`)
    try {
      const {success, msg} = await bannerClose({id: Number(clickRow.id)})
      hide();
      if (success) {
        message.success('下架成功');
        bannerData.refresh();
      }else {
        message.error(`下架失败，请重试: ${msg}`);
      }
    } catch (error) {
      hide();
      message.error('下架失败');
    }
  };

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<BannerItem>();

  const _version = () => {
    return {
      title: '图片',
      dataIndex: 'image',
      render: (dom, entity, index, action, schema) => {
        return <Image src={entity.image}/>
      }
    } as ProColumns<BannerItem>
  }

  const _download = () => {
    return {
      title: '跳转URL',
      dataIndex: 'url',
      // hideInForm: true,
      renderText: (val) =>
        `${val}`,
      render: (dom, entity) => {
        return <a href={entity.url}>{dom}</a>
      }
    }as ProColumns<BannerItem>
  }

  const _status = () => {
    return {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '默认',
          status: 'Default',
        },
        2: {
          text: '预发布',
          status: 'Processing',
        },
        1: {
          text: '发布成功',
          status: 'Success',
        },
        3: {
          text: '已下架',
          status: 'Error',
        },
      },
    }
  }

  const _createTime = () => {
    return {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'textarea',
      sorter: true,
    } as ProColumns<BannerItem>
  }

  const _createUser = () => {
    return {
      title: '创建人',
      dataIndex: 'creator',
      valueType: 'textarea',
    } as ProColumns<BannerItem>
  }

  const _tips = () => {
    return {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
    } as ProColumns<BannerItem>
  }

  const _operations = () => {
    return {
      title:'操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const EditNode = (<a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            console.log(`当前点击的item : ${record?.publishTime}`)

            handleModalOpen(true);
          }}
        >
          编辑
        </a>);
        const UnReleaseNode = <Popconfirm
          placement="topLeft"
          title={'确认下架吗'}
          onConfirm={() => {
            handleRemove(record);
          }}
        >
          <Button type={'link'} size={'small'} danger>
            下架
          </Button>
        </Popconfirm>;

        let operations = [EditNode, UnReleaseNode];
        if (record.status === ReleaseStatus.Removed) {
          operations = [];
        }
        return operations;
      },
    } as ProColumns<BannerItem>
  }

  const columns: ProColumns<BannerItem>[] = [
    _version(),
    _status(),
    _download(),
    _createTime(),
    _createUser(),
    _tips(),
    _operations(),
  ];

  const {upload} = useAliOSSUploader();

  return (
    <PageContainer>
      <ProTable<BannerItem, API.PageParams>
        // headerTitle={'版本管理'}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        optionsRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(undefined);
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        // request={versionList}
        columns={columns}
        dataSource={bannerData.data}
        pagination={bannerData.pagination}
      />
      <ModalForm
        title={'发布版本'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        // initialValues={currentRow}
        onFinish={async (value) => {
          const hide = message.loading('处理中。。。');

          const {image} = value;
          const imageUrl = await upload(image[0].name, image[0].originFileObj, UploadFileType.Banner);
          const newValue = {...value, image: imageUrl};

          let operation;
          let params;
          if (!currentRow) {
            operation = handleAdd;
            params = newValue as BannerItem;
          }else {
            operation = handleUpdate;
            params = {...newValue, id: currentRow.id} as BannerItem;
          }
          const success = await operation(params);
          hide();
          if (success) {
            setCurrentRow(undefined);
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        modalProps={{destroyOnClose: true}}
      >
        <ProFormUploadButton
          label={'选择图片'}
          name={'image'}
          rules={[{required: true, message: '图片不能为空'}]}
          fieldProps={{
            listType: 'picture-card',
            accept: '.png, .jpg, .jpeg',
            maxCount: 1,
          }}
          valuePropName={'image'}
          getValueFromEvent={e => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.image;
          }}
          // initialValue={[currentItem?.url]}
        />
        <ProFormDateTimePicker
          label={'发布时间'}
          width={'md'}
          placeholder={'请选择发布时间'}
          name={'publishTime'}
          rules={[{required: true, message: '发布时间不能为空'}]}
          fieldProps={{format: 'YY/MM/DD hh:mm:ss'}}
          initialValue={dayjs('2024/09/03 19:34:42')}
        />
        <ProFormText
          label={'跳转路由'}
          width="md"
          name="url"
          placeholder={'请输入热更包下载地址'}
          initialValue={currentRow?.url ?? ''}
        />
        <ProFormTextArea
          label={'备注'}
          placeholder={'备注(非必填)'}
          width="md"
          name="remark"
          initialValue={currentRow?.remark ?? ''}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Banner;
