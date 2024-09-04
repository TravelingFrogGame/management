import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { useAnnouncementModal } from '@/pages/Announcement/components/AnnouncementModal';
import * as announcementApi from '@/services/ant-design-pro/announcementApi';
import { AnnouncementType } from '@/services/ant-design-pro/announcementApi';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef } from 'react';

const Invite: React.FC = () => {
  const bannerData = useFuncListDataProxy<AnnouncementType>(announcementApi.list, {
    execution: true,
  });

  async function confirmDelete(item: AnnouncementType) {
    const apiResult = await announcementApi.close({ id: item.id });
    if (apiResult.success) {
      message.success('删除成功');
      bannerData.refresh();
      return;
    }
    message.error('删除失败');
  }

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<AnnouncementType>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (dom, entity) => {
        return <a onClick={() => {}}>{dom}</a>;
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '状态',
      dataIndex: 'status',
      // 1=发布, 2=预发布,3=下架
      valueEnum: {
        1: {
          text: '发布成功',
          status: 'Success',
        },
        2: {
          text: '预发布',
          status: 'Processing',
        },
        3: {
          text: '下架',
          status: 'Error',
        },
      },
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      sorter: (a, b) => a.publishTime - b.publishTime,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '创建人',
      dataIndex: 'create',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'op',
      render(d_, item) {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={'确认删除吗'}
              onConfirm={() => {
                confirmDelete(item);
              }}
            >
              <Button type={'link'} size={'small'} danger>
                删除
              </Button>
            </Popconfirm>
            <Button size={'small'} type={'link'}>编辑</Button>
          </>
        );
      },
    },
  ];

  function refresh() {
    bannerData.refresh();
  }

  const InviteModal = useAnnouncementModal();

  return (
    <PageContainer>
      <ProTable<AnnouncementType, API.PageParams>
        search={false}
        options={{
          setting: false,
          reloadIcon: <div onClick={refresh}>刷新</div>,
        }}
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={InviteModal.openModal}>
            新增
          </Button>,
        ]}
        columns={columns}
        dataSource={bannerData.data}
      />
      {InviteModal.node}
    </PageContainer>
  );
};

export default Invite;
