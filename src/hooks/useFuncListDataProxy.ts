import useRefState from '@/hooks/useRefState';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface FuncDataProxyProps {
  queryParameters?: any;
  execution?: boolean;
}

const pageSize = 20;

export default function useFuncListDataProxy<T = any>(api: any, props?: FuncDataProxyProps) {
  const queryParametersRef = useRef(props?.queryParameters);
  const pageIndexRef = useRef(-1);

  const [init, setInit] = useRefState(false);

  const [pullIng, setPullIng, getPullIng] = useRefState(false);

  const [moreData, setMoreData] = useState<boolean>(true);

  // @ts-ignore
  const [dataList, setDataList] = useState<T[]>([]);

  function changeQueryParameters(queryParameters: any) {
    queryParametersRef.current = queryParameters;
  }

  async function nextPage(refresh?: boolean) {
    if (getPullIng()) {
      return;
    }

    try {
      setPullIng(true);

      const currentIndex = refresh ? -1 : pageIndexRef.current;

      const nextPageIndex = currentIndex + 1;
      const queryParameters = queryParametersRef.current || {};
      const parameters = {
        ...queryParameters,
        pageSize,
        page: nextPageIndex,
      };

      const apiResult = await api(parameters);

      const { error, data: apiResultData } = apiResult;

      if (error) {
        return;
      }

      const list = apiResultData.list;
      const last = apiResultData.last;

      flushSync(() => {
        // @ts-ignore
        if (refresh) {
          setDataList(list);
        } else {
          setDataList([...dataList, ...list]);
        }
      });
      pageIndexRef.current = nextPageIndex;
      if (last) {
        setMoreData(false);
      }
    } finally {
      setPullIng(false);
      if (!init) {
        setInit(true);
      }
    }
  }

  async function refresh() {
    pageIndexRef.current = -1;
    queryParametersRef.current = props?.queryParameters;
    setMoreData(true);
    await nextPage(true);
  }

  useEffect(() => {
    if (props?.execution) {
      nextPage().then();
    }
  }, []);

  return {
    moreData,
    data: dataList,
    nextPage,
    changeQueryParameters,
    pullIng,
    init,
    refresh,
    setDataList,
  };
}
