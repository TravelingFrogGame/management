import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button, Image, message, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import * as hotShopListApi from "@/services/ant-design-pro/hotShopListApi";
import {HotShopAddType} from "@/services/ant-design-pro/hotShopListApi";
import {useCollectionManagementModal} from "@/pages/CollectionManagement/components/CollectionManagementModal";

const Invite: React.FC = () => {
  const DataProxy = useFuncListDataProxy<HotShopAddType>(hotShopListApi.list, {
    execution: true,
    queryParameters: {}
  });
  function refresh() {
    DataProxy.refresh();
  }

  const LotteryManagementModal = useCollectionManagementModal(refresh);

  async function open(item: HotShopAddType) {
    LotteryManagementModal.openModal(item);
  }

  async function remove(item: HotShopAddType) {
    const removeResult = await hotShopListApi.remove({id: item.id});
    if (removeResult.error) {
      message.error('删除失败');
      return;
    }
    message.success('删除成功');
    refresh();
  }

  const columns: ProColumns<HotShopAddType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '等级',
      dataIndex: 'level',
      search: false,
    },
    {
      title: '图片',
      dataIndex: 'image',
      search: false,
      render(_, item) {
        return <Image src={item.detailsUrl} height={30}/>
      }
    },
    {
      title: '价格（¥）',
      dataIndex: 'price',
      search: false,
    },
    {
      title: '首发开发时间',
      dataIndex: 'startTime',
      search: false,
    },
    {

      title: '首发结束时间',
      dataIndex: 'endTime',
      search: false,
    },
    {

      title: '限售',
      dataIndex: 'maxSupply',
      search: false,
    },
    {

      title: '库存',
      dataIndex: 'maxSupply2',
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

  function refresh() {
    DataProxy.refresh();
  }



  return (
    <PageContainer>
      <ProTable<HotShopAddType, API.PageParams>
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
