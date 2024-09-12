

export namespace CurrencyUtils {
  export const currencyList = [
    {
      value: 2,
      label: '三叶草',
    },
    {
      value: 3,
      label: '种子',
    }
  ];

  export const shopCurrencyList = [
    {
      value: 2,
      label: '三叶草',
    },
    {
      value: 3,
      label: '种子',
    },
    {
      value: 11,
      label: '工具碎片',
    }
  ];

  export function getCurrency(type: number) {
    return shopCurrencyList.find((item) => {
      return item.value === type;
    })
  }
}
