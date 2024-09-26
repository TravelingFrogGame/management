import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { InviteType } from '@/services/ant-design-pro/inviteApi';
import * as robotApi from '@/services/ant-design-pro/robotApi';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';
import {Button, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {RobotType} from "@/services/ant-design-pro/robotApi";
import {useCreateRobotModal} from "@/pages/RobotManagement/components/CreateRobotModal";

const RobotManagement: React.FC = () => {
  const MarketProxy = useFuncListDataProxy<RobotType>(robotApi.list, {execution: true});

  function refresh() {
    MarketProxy.refresh();
  }

  const CreateRobotModal = useCreateRobotModal<RobotType>(refresh);

  async function open(item: RobotType) {
    CreateRobotModal.openModal(item);
  }

  async function remove(item: RobotType) {

  }

  const columns: ProColumns<RobotType>[] = [
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
        if (item.id === 1 || item.id === 2) {
          return "-"
        }

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
      {CreateRobotModal.node}
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
            CreateRobotModal.openModal();
          }}>
            <PlusOutlined />
            新增机器人
          </Button>,
        ]}
        dataSource={MarketProxy.data} />
    </PageContainer>
  );
};

export default RobotManagement;
