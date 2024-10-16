import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button, message, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useLotteryManagementModal} from "./components/LotteryManagementModal";
import * as lotteryApi from "@/services/ant-design-pro/lotteryApi";
import {LotteryType} from "@/services/ant-design-pro/lotteryApi";

const Invite: React.FC = () => {
  const DataProxy = useFuncListDataProxy<LotteryType>(lotteryApi.list, {
    execution: true,
    queryParameters: {}
  });

  function refresh() {
    DataProxy.refresh();
  }

  const LotteryManagementModal = useLotteryManagementModal(refresh);

  async function open(item: LotteryType) {
    LotteryManagementModal.openModal(item);
  }

  async function remove(item: LotteryType) {
    const removeResult = await lotteryApi.remove({id: item.id});
    if (removeResult.error) {
      message.error('删除失败');
      return;
    }
    message.success('删除成功');
    refresh();
  }

  const columns: ProColumns<LotteryType>[] = [
    {
      title: '物品名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '分类',
      dataIndex: 'type',
      search: false,
    },
    {
      title: '中奖概率',
      dataIndex: 'probability',
      search: false,
    },
    {
      title: '数量',
      dataIndex: 'amount',
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

  function refresh() {
    DataProxy.refresh();
  }



  return (
    <PageContainer>
      <ProTable<LotteryType, API.PageParams>
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
            LotteryManagementModal.openModal();
          }}>
            <PlusOutlined />
            新增
          </Button>,
        ]}
        dataSource={DataProxy.data} />
      {LotteryManagementModal.node}
    </PageContainer>
  );
};

export default Invite;
