import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import * as shopApi from '@/services/ant-design-pro/shopApi';
import {PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button, message, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useShopManagementModal} from "./components/ShopManagementModal";
import {ShopType} from "@/services/ant-design-pro/shopApi";
import {CurrencyUtils} from "@/utils/CurrencyUtils";

const Invite: React.FC = () => {
  const DataProxy = useFuncListDataProxy<ShopType>(shopApi.shopList, {
    execution: true,
    queryParameters: {
    }
  });

  function refresh() {
    DataProxy.refresh();
  }
  const ShopManagementModal = useShopManagementModal(refresh);

  async function open(item: ShopType) {
    ShopManagementModal.openModal(item);
  }

  async function remove(item: ShopType) {
    const removeResult = await shopApi.remove({id: item.shopId});
    if (removeResult.error) {
      message.error('删除失败');
      return;
    }
    message.success('删除成功');
    refresh();
  }


  const columns: ProColumns<ShopType>[] = [
    {
      title: '物品名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '分类',
      dataIndex: 'typeName',
      search: false,
    },
    {
      title: '价格（¥）',
      dataIndex: 'originPrice',
      search: false,
    },
    {
      title: '交易货币',
      dataIndex: 'costPriceType',
      search: false,
      render(_, item) {
        return CurrencyUtils.getCurrency(item.costPriceType)?.label;
      }
    },
    {
      title: '上架人',
      dataIndex: 'creator',
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
      <ProTable<ShopType, API.PageParams>
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
            ShopManagementModal.openModal();
          }}>
            <PlusOutlined />
            新增
          </Button>,
        ]}
        dataSource={DataProxy.data} />
      {ShopManagementModal.node}
    </PageContainer>
  );
};

export default Invite;
