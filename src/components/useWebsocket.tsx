import React, { useEffect, useRef, useState } from "react";

export function useWebSocket<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed as T);
      } catch (err: any) {
        setError("Invalid JSON from WebSocket");
      }
    };

    ws.onerror = (event) => {
      console.error(event);
      setError("WebSocket error");
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [url]);

  return { data, error, send: (msg: any) => wsRef.current?.send(JSON.stringify(msg)) };
}


//usage and call anywhere
const { data, error, send } = useWebSocket("/ws/data");