/* eslint-disable react-hooks/rules-of-hooks */
import { useLayoutEffect, useState } from 'react';
import { isErrorWithMessage } from '../libs/utils';

// fetch의 결과값은 any or unknown이 된다!
// {data, isLoading, error} = useFetch(url, [id])
export function useFetch<T>(url: string, deps: unknown[] = []) {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    console.log('🚀 ~ url:', url);
    const controller = new AbortController();
    const { signal } = controller;

    // const f = async() = {
    //   setLoading(true);...
    //   try {
    //     const res = await fetch(...);
    //     if (res.ok) ...
    //     const data = await res.json();
    //     setData(data);
    //     ...
    //   } catch(err) {}
    // };
    // f();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetch(url, { signal })
      .then((res) => {
        if (!res.ok)
          throw Error(`${res.status} ${res.statusText || 'Error!!'}`);
        return res.json();
      })
      .then(setData)
      .catch((err: unknown) => {
        // error을 제끼는 법
        if (!signal.aborted)
          setError(isErrorWithMessage(err) ? err.message : JSON.stringify(err));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, deps);

  return { data, isLoading, error };
}
