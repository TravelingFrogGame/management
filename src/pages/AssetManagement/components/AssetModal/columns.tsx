import {ProColumns} from "@ant-design/pro-components";
import {AssetType} from "@/services/ant-design-pro/assetApi";
import dayjs from "dayjs";
import {Button} from "antd";

function renderUnknown() {
  return <Button danger type={'link'}>缺失字段</Button>
}

export const postcardColumns = [
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
    title: '掉落地区',
    dataIndex: 'description',
    search: false,
  }
];

export const frogColumns = [
  {
    title: '等级',
    dataIndex: 'level',
    search: false,
  },  {
    title: '算力',
    dataIndex: 'hashPower',
    search: false,
  }, {
    title: '价格（¥）',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  },{
    title: '升级花费（¥）',
    dataIndex: 'levelUpCny',
    search: false,
  },{
    title: '升级花费币种',
    dataIndex: 'levelUpPriceType',
    search: false,
  },{
    title: '体力上限',
    dataIndex: 'maxEnergy',
    search: false,
  },{
    title: '旅行消耗体力',
    dataIndex: 'travelCostEnergy',
    search: false,
  },{
    title: '闲置消耗体力',
    dataIndex: 'formatEffect',
    search: false,
  },{
    title: '特产掉落数量',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  },{
    title: '可否转赠',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  }
];

export const courtyardColumns = [
  {
    title: '等级',
    dataIndex: 'level',
    search: false,
  },  {
    title: '算力',
    dataIndex: 'hashPower',
    search: false,
  }, {
    title: '价格（¥）',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  },{
    title: '升级花费（¥）',
    dataIndex: 'levelUpCny',
    search: false,
  },{
    title: '升级花费币种',
    dataIndex: 'levelUpPriceType',
    search: false,
  },{
    title: '产能上限',
    dataIndex: 'maxEnergy',
    search: false,
  },{
    title: '生产消耗产能',
    dataIndex: 'workCostEnergy',
    search: false,
  },{
    title: '产出三叶草数量',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  },{
    title: '可否转赠',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown
  }
];

export const toolColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '等级',
    dataIndex: 'level',
    search: false,
  },{
    title: '合成消耗工具碎片',
    dataIndex: 'formatEffect',
    search: false,
  },{
    title: '升级消耗工具碎片',
    dataIndex: 'levelUpPrice',
    search: false,
  },{
    title: '描述',
    dataIndex: 'description',
    search: false,
  },{
    title: '可否转赠',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  }
];

export const foodColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '补充体力',
    dataIndex: 'energy',
    search: false,
  },{
    title: '价格（¥）',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  },{
    title: '描述',
    dataIndex: 'description',
    search: false,
  }
];
export const thingColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '补充产能',
    dataIndex: 'energy',
    search: false,
  },{
    title: '价格（¥）',
    // todo
    dataIndex: 'level',
    search: false,
    render: renderUnknown

  },{
    title: '描述',
    dataIndex: 'description',
    search: false,
  }
];
export const specialtyColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '等级',
    dataIndex: 'level',
    search: false,
  }, {
    title: '掉落地区',
    // todo
    dataIndex: 'description',
    search: false,
    render: renderUnknown


  }
];


export function getColumnType(type: number) {
  switch (type) {
    case 4:
      return postcardColumns;
    case 6:
      return frogColumns;
    case 7:
      return courtyardColumns;
    case 8:
      return foodColumns;
    case 9:
      return thingColumns;
    case 12:
      return specialtyColumns;
    default:
      return toolColumns;
  }
}
