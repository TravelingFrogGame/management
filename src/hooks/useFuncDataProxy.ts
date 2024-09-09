import {useEffect, useRef, useState} from 'react';
import {ResultCode, ResultType} from "@/typing/request";

export interface FuncDataProxyProps {
  isPagination?: boolean;
  queryParameters?: any;
}

export default function useFuncDataProxy<T = any>(
  api: any,
  props?: FuncDataProxyProps,
) {
  const queryParametersRef = useRef(props?.queryParameters);

  const [data, setData] = useState<T | undefined>();

  const [init, setInit] = useState(false);
  const [code, setCode] = useState<ResultCode>();
  const [msg, setMsg] = useState<string>('');

  async function update() {
    const _queryParameters = queryParametersRef.current || {};

    const apiResult: ResultType<any> = await api(_queryParameters);
    const {error, data, code: resultCode, msg: resultMsg} = apiResult;
    // if (error) {
    //   return;
    // }
    setData(data);
    setCode(resultCode);
    setMsg(resultMsg);
    if (!init) {
      setInit(true);
    }
  }

  function changeQueryParameters(queryParameters: any) {
    queryParametersRef.current = queryParameters;
  }

  useEffect(() => {
    update().then();
  }, []);

  return {
    update,
    data,
    changeQueryParameters,
    init,
    code,
    msg,
  };
}
