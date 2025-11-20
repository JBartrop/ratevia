import React, { useEffect, useState } from "react";

export function  usePolling<T>(
  callback: () => Promise<T>,
  interval: number
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const poll = async () => {
      try {
        const result = await callback();
        if (isMounted) setData(result);
      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        timer = setTimeout(poll, interval);
      }
    };

    poll();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [callback, interval]);

  return { data, error };
}

//usage and call anywhere
const data = usePolling(() => fetch("/api/data").then(r => r.json()), 5000);
