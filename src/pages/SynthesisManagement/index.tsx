import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';
import {Button, Image, message, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import * as synthesisListApi from "@/services/ant-design-pro/synthesisListApi";
import {useSynthesisManagementModal} from "@/pages/SynthesisManagement/components/SynthesisManagementModal";
import {SynthesisType} from "@/services/ant-design-pro/synthesisListApi";

const SynthesisManagement: React.FC = () => {
  const DataProxy = useFuncListDataProxy<SynthesisType>(synthesisListApi.list, {
    execution: true,
    queryParameters: {}
  });

  function refresh() {
    DataProxy.refresh();
  }

  const LotteryManagementModal = useSynthesisManagementModal(refresh);

  async function open(item: SynthesisType) {
    LotteryManagementModal.openModal(item);
  }

  async function remove(item: SynthesisType) {
    const removeResult = await synthesisListApi.remove({id: item.id});
    if (removeResult.error) {
      message.error('删除失败');
      return;
    }
    message.success('删除成功');
    refresh();
  }

  const columns: ProColumns<SynthesisType>[] = [
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
      title: '图片',
      dataIndex: 'image',
      search: false,
      render(_, item) {
        return <Image src={item.image} height={30}/>
      }
    },
    {
      title: '价格',
      dataIndex: 'originPrice',
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
      <ProTable<SynthesisType, API.PageParams>
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

export default SynthesisManagement;


