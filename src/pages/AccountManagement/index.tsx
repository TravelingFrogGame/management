import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import * as userInfoApi from '@/services/ant-design-pro/userInfoApi';
import {PageContainer, ProColumns, ProTable} from '@ant-design/pro-components';
import React from 'react';
import {Button, message, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useAccountManagementModal} from "./components/AccountManagementModal";
import {UserInfo} from "@/services/ant-design-pro/userInfoApi";
import {roleList} from "../../../config/routes";

const menus = roleList.map((value, index, array) => {
  return {
    value: value.path.split("/")[1],
    label: value.name,
  }
});

function getMenuByRoleTypes(ms: string) {
  if (!ms) {
    return [];
  }
  const menuList = ms.split(",");
  return menus.filter((item) => {
    return menuList.includes(item.value)
  }).map((item) => {
    return item.label;
  })
}

const RoleManagement: React.FC = () => {
  const DataProxy = useFuncListDataProxy<UserInfo>(userInfoApi.list, {
    execution: true,
    queryParameters: {}
  });

  function refresh() {
    DataProxy.refresh();
  }

  const ShopManagementModal = useAccountManagementModal(refresh);

  async function open(item: UserInfo) {
    ShopManagementModal.openModal(item);
  }

  async function remove(item: UserInfo) {
    const removeResult = await userInfoApi.remove({gmId: item.gmId});
    if (removeResult.error) {
      message.error(removeResult.msg);
      return;
    }
    message.success('删除成功');
    refresh();
  }

  const columns: ProColumns<UserInfo>[] = [
    {
      title: '账号',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '菜单权限',
      dataIndex: 'menu',
      search: false,
      render(_, item) {

        return getMenuByRoleTypes(item.menu).map((str) => {
          return <div>{str}</div>
        });
      }
    },
    {
      title: '注册时间',
      dataIndex: 'crateTime',
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '操作',
      search: false,
      render(d_, item) {
        return (
          <>
            <Button size={'small'} type={'link'} onClick={() => {
              open(item)
            }}>编辑</Button>

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
            <PlusOutlined/>
            新增
          </Button>,
        ]}
        dataSource={DataProxy.data}/>
      {ShopManagementModal.node}
    </PageContainer>
  );
};

export default RoleManagement;
