import useFuncListDataProxy from '@/hooks/useFuncListDataProxy';
import { InviteType } from '@/services/ant-design-pro/inviteApi';
import * as robotApi from '@/services/ant-design-pro/robotApi';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';
import {Button, Flex, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {RobotType} from "@/services/ant-design-pro/robotApi";
import {useCreateRobotModal} from "@/pages/RobotManagement/components/CreateRobotModal";
import {useUpgradeFrogModal} from "@/pages/RobotManagement/components/UpgradeFrogModal";
import {useTravelModal} from "@/pages/RobotManagement/components/TravelModal";
import {useProductModal} from "@/pages/RobotManagement/components/ProductModal";
import {useFirstPurchaseModal} from "@/pages/RobotManagement/components/FirstPurchaseModal";

const RobotManagement: React.FC = () => {
  const MarketProxy = useFuncListDataProxy<RobotType>(robotApi.list, {execution: true});

  function refresh() {
    MarketProxy.refresh();
  }

  const CreateRobotModal = useCreateRobotModal<RobotType>(refresh);
  const UpgradeFrogModal = useUpgradeFrogModal<RobotType>(refresh);
  const TravelModal = useTravelModal<RobotType>(refresh);
  const ProductModal = useProductModal<RobotType>(refresh);
  const FirstPurchaseModal = useFirstPurchaseModal<RobotType>(refresh);

  async function createRobot() {
    CreateRobotModal.openModal();
  }

  function upgradeFrog(item: RobotType) {
    UpgradeFrogModal.openModal(item);
  }
  function travel() {
    TravelModal.openModal();
  }
  function product() {
    ProductModal.openModal();
  }
  function firstPurchase() {
    FirstPurchaseModal.openModal();
  }

  const columns: ProColumns<RobotType>[] = [
    {
      title: '机器人账号',
      dataIndex: 'account',
      search: false,
    },
    // {
    //   title: '密码',
    //   dataIndex: 'sellType',
    //   search: false,
    // },
    {
      title: '昵称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '青蛙数',
      dataIndex: 'frog',
      search: false,
    },
    {
      title: '旅行状态',
      search: false,
      dataIndex: 'travel',
    },
    // {
    //   title: '庭院',
    //   search: false,
    //   dataIndex: 'production',
    // },
    {
      title: '生产状态',
      search: false,
      dataIndex: 'production',
    },
    {
      title: '三叶草',
      search: false,
      dataIndex: "coin",
    },
    {
      title: '种子',
      search: false,
      dataIndex: "seed"
    },
    {
      title: '注册时间',
      search: false,
      dataIndex: "createTime",
    },
    {
      title: '创建人',
      search: false,
      dataIndex: "creatorName",
    },
    // {
    //   title: '操作',
    //   search: false,
    //   dataIndex: "op",
    //   render(_, item) {
    //     return (
    //       <Flex>
    //         <Button type="primary" key="primary" size={'small'} onClick={() => {
    //           upgradeFrog(item);
    //         }}>
    //           升级青蛙
    //         </Button>
    //         <Button key="primary" size={'small'} onClick={() => {
    //           CreateRobotModal.openModal();
    //         }}>
    //           升级庭院
    //         </Button>
    //       </Flex>
    //
    //     )
    //   }
    // }
  ];


  return (
    <PageContainer>
      {CreateRobotModal.node}
      {UpgradeFrogModal.node}
      {TravelModal.node}
      {ProductModal.node}
      {FirstPurchaseModal.node}
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
          // <Button type="primary" key="primary" onClick={firstPurchase}>
          //   首发购买
          // </Button>,
          <Button type="primary" key="primary" onClick={product}>
            去生产
          </Button>,
          <Button type="primary" key="primary" onClick={travel}>
            去旅行
          </Button>,
          <Button type="primary" key="primary" onClick={createRobot}>
            <PlusOutlined />
            新增机器人
          </Button>,
        ]}
        dataSource={MarketProxy.data} />
    </PageContainer>
  );
};

export default RobotManagement;


