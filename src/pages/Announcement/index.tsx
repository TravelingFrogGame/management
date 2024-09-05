import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import {useAnnouncementModal} from '@/pages/Announcement/components/AnnouncementModal';
import * as announcementApi from '@/services/ant-design-pro/announcementApi';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import {AnnouncementType} from '@/services/ant-design-pro/announcementApi';
import {PlusOutlined} from "@ant-design/icons";
import {ReleaseStatus} from "@/services/ant-design-pro/enum";

const Announcement: React.FC = () => {
  const bannerData = useFuncListDataProxy<AnnouncementType>(announcementApi.list, {
    execution: true,
  });


  function refresh() {
    bannerData.refresh();
  }

  async function confirmDelete(item: AnnouncementType) {
    const apiResult = await announcementApi.close({ id: item.id });
    if (apiResult.success) {
      message.success('下架成功');
      bannerData.refresh();
      return;
    }
    message.error('下架失败');
  }

  const actionRef = useRef<ActionType>();

  const updateIfNeed = (success: boolean) => {
    if (success) {
      refresh();
      actionRef.current?.reload();
    }
  }

  const AnnouncementModal = useAnnouncementModal(updateIfNeed);

  const columns: ProColumns<AnnouncementType>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (dom, entity) => {
        return <a onClick={() => {
        }}>{dom}</a>;
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
        if (item.status === ReleaseStatus.Removed) {
          return null;
        }
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={'确认下架吗'}
              onConfirm={() => {
                confirmDelete(item);
              }}
            >
              <Button type={'link'} size={'small'} danger>
                下架
              </Button>
            </Popconfirm>
            <Button size={'small'} type={'link'} onClick={() => {
              AnnouncementModal.openModal(item);
            }}>编辑</Button>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<AnnouncementType, API.PageParams>
        search={false}
        options={{
          setting: false,
          density: false,
          reloadIcon: <div onClick={refresh}>刷新</div>,
        }}
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => {
            AnnouncementModal.openModal();
          }}>
            <PlusOutlined />
            新增公告
          </Button>,
        ]}
        columns={columns}
        dataSource={bannerData.data}
      />
      {AnnouncementModal.node}
    </PageContainer>
  );
};

export default Announcement;
