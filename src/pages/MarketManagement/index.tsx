import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { InviteType } from '@/services/ant-design-pro/inviteApi';
import * as marketApi from '@/services/ant-design-pro/marketApi';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button, message, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useMarketManagementModal} from "@/pages/MarketManagement/components/MarketManagementModal";
import {MarketType} from "@/services/ant-design-pro/marketApi";

const Invite: React.FC = () => {
  const MarketProxy = useFuncListDataProxy<MarketType>(marketApi.list, {execution: true});

  function refresh() {
    MarketProxy.refresh();
  }

  const MarketManagementModal = useMarketManagementModal<MarketType>(refresh);

  async function open(item: MarketType) {
    MarketManagementModal.openModal(item);
  }

  async function remove(item: MarketType) {
    const removeResult = await marketApi.remove({id: item.id});
    if (removeResult.error) {
      message.error('删除失败');
      return;
    }
    message.success('删除成功');
    refresh();
  }

  const columns: ProColumns<MarketType>[] = [
    {
      title: '物品名称',
      dataIndex: 'sellName',
      search: false,
    },
    {
      title: '分类',
      dataIndex: 'sellType',
      search: false,
    },
    {
      title: '交易货币',
      dataIndex: 'buyName',
      search: false,
    },
    {
      title: '上架人',
      dataIndex: 'creatorName',
      search: false,

    },
    {
      title: '操作',
      search: false,
      render(d_, item) {
        return (
          <>
            <Button size={'small'} type={'link'} onClick={() => {open(item)}}>编辑</Button>

            <Popconfirm
              placement="topLeft"
              title={'确认删除吗'}
              onConfirm={() => {
                remove(item)
              }}
            >
              <Button type={'link'} size={'small'} danger>
                删除
              </Button>
            </Popconfirm>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </>
        );
      }
    }
  ];


  return (
    <PageContainer>
      <ProTable<InviteType, API.PageParams>
        search={false}
        options={{
          density: false,
          setting: false,
          reloadIcon: <div onClick={refresh}>刷新</div>,
        }}
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
        dataSource={MarketProxy.data} />
      {MarketManagementModal.node}
    </PageContainer>
  );
};

export default Invite;
