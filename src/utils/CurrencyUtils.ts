

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

  export function getCurrency(type: number) {
    return currencyList.find((item) => {
      return item.value === type;
    })
  }
}
