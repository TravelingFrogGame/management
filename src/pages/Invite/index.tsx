import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { useAnnouncementModal } from '@/pages/Announcement/components/AnnouncementModal';
import * as inviteApi from '@/services/ant-design-pro/inviteApi';
import { InviteType } from '@/services/ant-design-pro/inviteApi';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button, Col, Row, Space, Statistic, StatisticProps} from "antd";
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const Invite: React.FC = () => {
  const bannerData = useFuncListDataProxy<InviteType>(inviteApi.list, {
    execution: true,
    queryParameters: {
      userNo: 'mtw2d1qb'
    }
  });

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<InviteType>[] = [
    {
      title: '新用户名称',
      dataIndex: 'userName',
      search: false,

    },
    {
      title: '新用户ID',
      dataIndex: 'userNo',
      search: true,
    },
    {
      title: '总消费（CNY）',
      dataIndex: 'consumeTotal',
      search: false,
    },
    {
      title: '注册时间',
      dataIndex: 'userRegisterTime',
      search: false,

    },
    {
      title: '邀请人',
      dataIndex: 'inviterName',
      search: false,

    },
    {
      title: '邀请人ID',
      dataIndex: 'inviterNo',
      search: false,

    },
    {
      title: '层级',
      dataIndex: 'level',
      search: false,

    }
  ];

  function refresh() {
    bannerData.refresh();
  }

  const InviteModal = useAnnouncementModal();

  function exportCVS() {

  }

  return (
    <PageContainer
      content={
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="邀请好友" value={112893} formatter={formatter} />
          </Col>
          <Col span={6}>
            <Statistic title="好友累计消费" value={112893} precision={2} formatter={formatter} />
          </Col>
        </Row>
      }
    >
      <ProTable<InviteType, API.PageParams>
        search={{
          // filterType: 'light', // 使用轻量筛选
        }}
        options={{
          density: false,
          setting: false,
          reloadIcon: <div onClick={refresh}>刷新</div>,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={exportCVS}>
            导出
          </Button>,
        ]}
        actionRef={actionRef}
        rowKey="key"
        columns={columns}
        dataSource={bannerData.data} />
      {InviteModal.node}
    </PageContainer>
  );
};

export default Invite;
