import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { useAnnouncementModal } from '@/pages/Announcement/components/AnnouncementModal';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button} from "antd";
import * as assetApi from '@/services/ant-design-pro/assetApi'
import {AssetType} from "@/services/ant-design-pro/assetApi";
import {useAssetModal} from "@/pages/AssetManagement/components/AnnouncementModal";


const Invite: React.FC = () => {
  const bannerData = useFuncListDataProxy<AssetType>(assetApi.list, {
    execution: true,
    queryParameters: {
      // phone: '18924090401'
    }
  });

  const actionRef = useRef<ActionType>();

  const AssetModal = useAssetModal();

  function refresh() {
    bannerData.refresh();
  }

  const InviteModal = useAnnouncementModal();

  const columns: ProColumns<AssetType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '图片',
      dataIndex: 'image',
      search: false,
    },
    {
      title: '是否NFT',
      dataIndex: 'hasConfig',
      search: false,
      valueEnum: {
        'true': {
          text: '是',
          status: 'Success',
        },
        'false': {
          text: '否',
          status: 'Error',
        }
      },
    },
    {
      title: '最大等级',
      dataIndex: 'maxLevel',
      search: false,


    },
    {
      title: '操作',
      search: false,
      render(_, item) {
        return <Button type={'link'} onClick={() => {InviteModal.openModal(item)}}>查看配置</Button>
      }
    },
  ];



  function exportCVS() {

  }

  return (
    <PageContainer
    >
      {AssetModal.node}
      <ProTable<AssetType, API.PageParams>
        pagination={bannerData.pagination}
        search={false}
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
