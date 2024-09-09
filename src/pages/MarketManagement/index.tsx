import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import * as assetApi from '@/services/ant-design-pro/assetApi';
import { InviteType } from '@/services/ant-design-pro/inviteApi';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useMarketManagementModal} from "@/pages/MarketManagement/components/MarketManagementModal";

const Invite: React.FC = () => {
  const DataProxy = useFuncListDataProxy<InviteType>(assetApi.assetConfigComboBox, {
    execution: true,
    queryParameters: {
      assetId: 0,
      type: 3,
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
      search: false,
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
    DataProxy.refresh();
  }

  const MarketManagementModal = useMarketManagementModal();


  return (
    <PageContainer>
      <ProTable<InviteType, API.PageParams>
        search={false}
        options={{
          density: false,
          setting: false,
          reloadIcon: <div onClick={refresh}>刷新</div>,
        }}
        actionRef={actionRef}
        rowKey="key"
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => {
            MarketManagementModal.openModal();
          }}>
            <PlusOutlined />
            新增
          </Button>,
        ]}
        dataSource={DataProxy.data} />
      {MarketManagementModal.node}
    </PageContainer>
  );
};

export default Invite;
