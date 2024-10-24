import { useState, useEffect, useMemo } from 'react'
import { getWebSocketURL } from './yjs-document';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { MonacoBinding } from 'y-monaco'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'




export function App() {
  return <Editor height="90vh" theme="vs-dark"
    defaultLanguage="javascript" defaultValue="// some comment"
    onMount={(editor, monaco) => {
      const ydocument = new Y.Doc()
      const provider = new WebsocketProvider(getWebSocketURL(`test`), 'monaco', ydocument)
      const type = ydocument.getText('monaco')


      const binding = new MonacoBinding(type, editor.getModel()!, new Set([editor]), provider.awareness)

      // binding._beforeTransaction;

    }}
  />
}
