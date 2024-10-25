import { useState, useEffect, useMemo } from 'react'
import { getWebSocketURL } from './yjs-document';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { MonacoBinding } from 'y-monaco'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'


import PocketBase from 'pocketbase';

const pb = new PocketBase(document.location.origin);
const DOCUMENT_ID = "sj8q0jvnls2aeod"
const ydoc = new Y.Doc()
export function App() {


  useEffect(() => {
    // Subscribe to document changes
    const subscription = pb.collection('documents').subscribe('*', async (data) => {
      if (data.record.id === DOCUMENT_ID && ydoc) {
        // When remote changes are received, apply them to the Yjs document
        const update = new Uint8Array(data.record.updates);
        Y.applyUpdate(ydoc, update);
      }
    });

    return () => {
      subscription.then((unsuscribe) => {
        return unsuscribe()
      })
    };
  }, []);

  return (
    <div>
      <Editor height="90vh" theme="vs-dark"
        defaultLanguage="javascript" defaultValue="// some comment"
        onChange={async (content) => {
          const update = Y.encodeStateAsUpdate(ydoc);
          const updates = Array.from(update)

          try {
            await pb.collection('documents').update(DOCUMENT_ID, {
              content,
              updates,
            });
          } catch (error) {
            console.error('Failed to save changes:', error);
          }
        }}
        onMount={(editor) => {
          const type = ydoc.getText('monaco')


          const binding = new MonacoBinding(type, editor.getModel()!, new Set([editor]))

          // binding._beforeTransaction;

        }}
      />
      <button onClick={async () => {
        pb.collection('documents').create({
          content: '',
          updates: [],
        }).catch((error) => {
          console.error(`error creating document`, error)
        }).then((data) => {
          console.log({ data })
        });
      }}>Create</button>
    </div>)
}
