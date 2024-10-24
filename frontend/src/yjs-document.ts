// frontend/src/lib/document.ts
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export function getWebSocketURL(docId: string): string {
  // In development, use the local URL
  if (process.env.NODE_ENV === 'development') {
    return `ws://localhost:8090/ws`;
  }

  // In production, use relative URL (assumes same domain)
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws`;
}
