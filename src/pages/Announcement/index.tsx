import React, {useRef} from 'react';
import * as announcementApi from '@/services/ant-design-pro/announcementApi';
import {AnnouncementType} from "@/services/ant-design-pro/announcementApi";
import useFuncListDataProxy from "@/hooks/useFuncListDataProxy";
import {
  ActionType,
  PageContainer, ProColumns,
  ProTable
} from "@ant-design/pro-components";
import {Button, Drawer, Input, message, Popconfirm, Popover} from "antd";
import {useAnnouncementModal} from "@/pages/Announcement/components/AnnouncementModal";

const Announcement: React.FC = () => {
  const bannerData = useFuncListDataProxy<AnnouncementType>(announcementApi.list, {
    execution: true
  });

  async function confirmDelete(item: AnnouncementType) {
    const apiResult = await announcementApi.close({id: item.id});
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
      title: "标题",
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {

            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "内容",
      dataIndex: 'content',
    },
    {
      title: "状态",
      dataIndex: 'status',
    },
    {
      title: "发布时间",
      dataIndex: 'publishTime',
      sorter: (a, b) => a.publishTime - b.publishTime,
    },
    {
      title: "创建时间",
      dataIndex: 'createTime',
    },
    {
      title: "创建人",
      dataIndex: 'create',
    },
    {
      title: "备注",
      dataIndex: 'remark',
    },
    {
      title: "操作",
      dataIndex: 'op',
      render(d_, item) {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={'确认删除吗'}
              onConfirm={() => {confirmDelete(item)}}
            >
              <Button type={'link'} danger>删除</Button>
            </Popconfirm>
            <Button type={'link'}>编辑</Button>
          </>
        )
      }
    },
  ];

  function refresh() {
    bannerData.refresh();
  }

  const AnnouncementModal = useAnnouncementModal();

  return (
    <PageContainer>
      <ProTable<AnnouncementType, API.PageParams>
        search={false}
        options={{
          setting:false,
          reloadIcon: <div onClick={refresh}>刷新</div>,
        }}
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={AnnouncementModal.openModal}
          >
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
