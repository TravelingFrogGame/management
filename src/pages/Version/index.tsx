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
import {Button, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import type { FormValueType } from '../TableList/components/UpdateForm';
import useFuncListDataProxy from "@/hooks/useFuncListDataProxy";
import * as versionApi from '@/services/ant-design-pro/versionApi';
import {ReleaseStatus} from "@/services/ant-design-pro/enum";
import {UploadFileType, useAliOSSUploader} from "@/hooks/useAliOSSUploader";

const VersionList: React.FC = () => {
  const versionData = useFuncListDataProxy(versionApi.versionList, {execution: true});

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.VersionListItem) => {
    const hide = message.loading('正在添加');
    try {
      const {success,msg} = await versionApi.addVersion({...fields})
      hide();
      if (success) {
        message.success('版本添加成功');
        versionData.refresh();
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
      const {success,msg} = await versionApi.update({...fields})
      hide();
      if (success) {
        message.success('更新成功');
        versionData.refresh();
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
  const handleRemove = async (clickRow: API.VersionListItem) => {
    const hide = message.loading('正在删除');
    if (!clickRow) return true;
    console.log(`删除节点 : ${JSON.stringify(clickRow)}`)
    try {
      const {success, msg} = await versionApi.unRelease({id: Number(clickRow.id)})
      hide();
      if (success) {
        message.success('下架成功');
        versionData.refresh();
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
  const [currentRow, setCurrentRow] = useState<API.VersionListItem>();

  const _version = () => {
    return {
      title: '版本号',
      dataIndex: 'version',
    } as ProColumns<API.VersionListItem>
  }

  const _updateContent = () => {
    return {
      title: '更新内容',
      dataIndex: 'updateContent',
      valueType: 'textarea',
    } as ProColumns<API.VersionListItem>
  }

  const _platform = () => {
    return {
      title: '平台',
      dataIndex: 'platform',
      valueType: 'textarea',
    } as ProColumns<API.VersionListItem>
  }

  const _download = () => {
    return {
      title: '热更包',
      dataIndex: 'url',
      // hideInForm: true,
      renderText: () =>
        '下载',
      render: (dom, entity) => {
        return <a href={entity.url}>{dom}</a>
      }
    }as ProColumns<API.VersionListItem>
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

  const _releaseTime = () => {
    return {
      title: '发布时间',
      dataIndex: 'publishTime',
      valueType: 'textarea',
      sorter: true,
    } as ProColumns<API.VersionListItem>
  }

  const _createTime = () => {
    return {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'textarea',
      sorter: true,
    } as ProColumns<API.VersionListItem>
  }

  const _createUser = () => {
    return {
      title: '创建人',
      dataIndex: 'creator',
      valueType: 'textarea',
    } as ProColumns<API.VersionListItem>
  }

  const _tips = () => {
    return {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
    } as ProColumns<API.VersionListItem>
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
    } as ProColumns<API.VersionListItem>
  }

  const columns: ProColumns<API.VersionListItem>[] = [
    _version(),
    _updateContent(),
    _platform(),
    _status(),
    _download(),
    _releaseTime(),
    _createTime(),
    _createUser(),
    _tips(),
    _operations(),
  ];

  const {upload} = useAliOSSUploader();

  return (
    <PageContainer>
      <ProTable<API.VersionListItem, API.PageParams>
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
        dataSource={versionData.data}
        pagination={versionData.pagination}
      />
      <ModalForm
        title={'发布版本'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          console.log(`需要发布的版本 : ${JSON.stringify(value)}`)
          const {url,version} = value;
          const zipUrl = await upload(url[0].name, url[0].originFileObj, UploadFileType.Version, version);
          const newValue = {...value, url: zipUrl};
          let operation;
          let params;
          if (!currentRow) {
            operation = handleAdd;
            params = newValue as API.VersionListItem;
          }else {
            operation = handleUpdate;
            params = {...newValue, id: currentRow.id} as API.VersionListItem;
          }
          const success = await operation(params);
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
        <ProFormText
          label={'版本号'}
          rules={[
            {
              required: true,
              message: '版本号不能为空',
            },
          ]}
          width="md"
          name="version"
          placeholder={'请输入版本号'}
          initialValue={currentRow?.version ?? ''}
        />
        {/*<ProFormText*/}
        {/*  label={'下载地址'}*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      required: true,*/}
        {/*      message: '热更包地址不能为空',*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*  width="md"*/}
        {/*  name="url"*/}
        {/*  placeholder={'请输入热更包下载地址'}*/}
        {/*  initialValue={currentRow?.url ?? ''}*/}
        {/*/>*/}
        <ProFormUploadButton
          label={'热更包'}
          name={'url'}
          rules={[{required: true, message: '热更包不能为空'}]}
          fieldProps={{
            listType: 'picture-card',
            accept: '.ZIP, .zip',
            maxCount: 1,
          }}
          // initialValue={[currentItem?.url]}
        />
        <ProFormSelect
          label={'发布平台'}
          width="md"
          placeholder={'请选择发布平台'}
          rules={[{required: true, message: '发布平台不能为空'}]}
          name={'platform'}
          options={[{label: '苹果',value: 'ios'},{label: '安卓',value: 'android'}]}
          initialValue={currentRow?.platform ?? ''}
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
          label={'更新内容'}
          placeholder={'更新内容'}
          width="md"
          name="updateContent"
          rules={[{required: true,message: '更新内容不能为空'}]}
          initialValue={currentRow?.updateContent ?? ''}
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

export default VersionList;
