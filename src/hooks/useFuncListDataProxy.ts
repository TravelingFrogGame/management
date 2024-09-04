import useRefState from '@/hooks/useRefState';
import {useEffect, useMemo, useRef, useState} from 'react';
import { flushSync } from 'react-dom';
import {TablePaginationConfig} from "antd";

interface FuncDataProxyProps {
  queryParameters?: any;
  execution?: boolean;
}

const pageSize = 20;

export default function useFuncListDataProxy<T = any>(api: any, props?: FuncDataProxyProps) {
  const queryParametersRef = useRef(props?.queryParameters);
  const pageIndexRef = useRef(0);

  const [init, setInit] = useRefState(false);

  const [pullIng, setPullIng, getPullIng] = useRefState(false);

  const [moreData, setMoreData] = useState<boolean>(true);

  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: pageSize,
  });

  // @ts-ignore
  const [dataList, setDataList] = useState<T[]>([]);

  function changeQueryParameters(queryParameters: any) {
    queryParametersRef.current = queryParameters;
  }

  async function change(index: number) {
    if (getPullIng()) {
      return;
    }

    try {

      setPullIng(true);
      pageIndexRef.current = index;

      const currentIndex = pageIndexRef.current;

      const queryParameters = queryParametersRef.current || {};
      const parameters = {
        ...queryParameters,
        pageSize,
        page: currentIndex,
      };
      const apiResult = await api(parameters);

      const { error, data: apiResultData } = apiResult;

      if (error) {
        return;
      }

      const list = apiResultData.list;
      const last = apiResultData.last;


      flushSync(() => {
        setDataList(list);
        setPagination({
          total: apiResultData.total,
          pageSize
        });
      });
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
    await change(pageIndexRef.current);
  }

  useEffect(() => {
    if (props?.execution) {
      change(0);
    }
  }, []);

  const exportPagination = useMemo(() => {
    return {
      ...pagination,
      onChange: (index: number) => {
        change(index - 1);
      }
    }
  }, [pagination, change]);

  return {
    moreData,
    data: dataList,
    change,
    changeQueryParameters,
    pagination: exportPagination as TablePaginationConfig,
    pullIng,
    init,
    refresh,
    setDataList,
  };
}
