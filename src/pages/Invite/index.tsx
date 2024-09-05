import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { useAnnouncementModal } from '@/pages/Announcement/components/AnnouncementModal';
import * as inviteApi from '@/services/ant-design-pro/inviteApi';
import { InviteType } from '@/services/ant-design-pro/inviteApi';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button, Col, Row, Space, Statistic, StatisticProps, Input} from "antd";
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const Invite: React.FC = () => {
  const bannerData = useFuncListDataProxy<InviteType>(inviteApi.list, {
    execution: true,
    queryParameters: {
      // phone: '18924090401'
    }
  });
  // 18924090401


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
      formItemProps: {
        label: '手机号'
      }
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

  async function exportCVS() {
    const queryParameters = bannerData.getQueryParameters();
    if (queryParameters.phone) {
      window.open(`/gm/invite/csv?phone=${queryParameters.phone}&pageSize=${queryParameters.pageSize}&page=${queryParameters.page}`)
    }

  }

  return (
    <PageContainer
      content={
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="邀请好友" value={bannerData.info.amount!} formatter={formatter} />
          </Col>
          <Col span={6}>
            <Statistic title="好友累计消费" value={bannerData.info.consumeTotal!} precision={2} formatter={formatter} />
          </Col>
        </Row>
      }
    >
      <ProTable<InviteType, API.PageParams>
        onSubmit={(e) => {
          const phone = e.userNo;
          bannerData.changeQueryParameters({
            phone
          });
          bannerData.refresh();
          console.log(e)
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
