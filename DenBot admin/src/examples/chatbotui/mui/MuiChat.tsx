import {useState, useEffect, useRef, useCallback} from 'react';

import { Box } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { ChatController } from '../chat-controller';
import {
  ActionRequest,
  AudioActionRequest,
  CustomActionRequest,
  FileActionRequest,
  MultiSelectActionRequest,
  SelectActionRequest,
  TextActionRequest,
} from '../chat-types';

import { MuiAudioInput } from './MuiAudioInput';
import { MuiFileInput } from './MuiFileInput';
import { MuiMessage } from './MuiMessage';
import { MuiMultiSelectInput } from './MuiMultiSelectInput';
import { MuiSelectInput } from './MuiSelectInput';
import { MuiTextInput } from './MuiTextInput';
import { MuiMessageButton } from './MuiMessageButton';

export function MuiChat({
  chatController,
  color,
  setCurrentNode,
}: React.PropsWithChildren<{
  chatController: ChatController;
  color: string;
  setCurrentNode: () => {};
}>): React.ReactElement {

  const chatCtl = chatController;

  var isAutoScrolled = true;

  const [messages, setMessages] = useState(chatCtl.getMessages());
  const [actReq, setActReq] = useState(chatCtl.getActionRequest());

  const msgRef = useRef<HTMLDivElement>(null);
  
  const scroll = useCallback((flag): void => {
    if (msgRef.current && (isAutoScrolled || flag)) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
      isAutoScrolled = true;
    }
  }, [msgRef, isAutoScrolled]);

  useEffect(() => {
    function handleMassagesChanged(): void {
      setMessages([...chatCtl.getMessages()]);
      scroll(true);
    }
    function handleActionChanged(): void {
      setActReq(chatCtl.getActionRequest());
      scroll(true);
    }
    chatCtl.addOnMessagesChanged(handleMassagesChanged);
    chatCtl.addOnActionChanged(handleActionChanged);
    isAutoScrolled = true;
  }, [chatCtl, scroll]);

  useEffect(() => {
    const intervalId = setInterval(scroll, 200);
    return () => {
      clearInterval(intervalId);
    };
  }, [scroll]);

  const handleUserScroll = useCallback(() => {
    isAutoScrolled = false;
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleUserScroll);
    return () => {
      window.removeEventListener('wheel', handleUserScroll);
    };
  }, [handleUserScroll]);

  type CustomComponentType = React.FC<{
    chatController: ChatController;
    actionRequest: ActionRequest;
    color: string;
  }>;
  const CustomComponent = React.useMemo((): CustomComponentType => {
    if (!actReq || actReq.type !== 'custom') {
      return null as unknown as CustomComponentType;
    }
    return (actReq as CustomActionRequest)
      .Component as unknown as CustomComponentType;
  }, [actReq]);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        p: 1,
        display: 'flex',
        overflowY: 'auto',
        flexDirection: 'column',
        '& > *': {
          maxWidth: '100%',
        },
        '& > * + *': {
          mt: 1,
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'column',
          '& > *': {
            maxWidth: '100%',
          },
        }}
        ref={msgRef}
      >
        {messages.map((msg): React.ReactElement => {
          if (msg.type === 'text' || msg.type === 'jsx') {
            return (
              <MuiMessage
                key={messages.indexOf(msg)}
                id={`cu-msg-${messages.indexOf(msg) + 1}`}
                color={color}
                message={msg}
                setCurrentNode={setCurrentNode}
              />
            );
          }
          return (
            <MuiMessageButton
              texts={msg?.buttons as String[]}
              value={msg?.value as String}
              color={color}
            />
          );
        }
        )}
      </Box>
      <Box
        sx={{
          flex: '0 1 auto',
          display: 'flex',
          alignContent: 'flex-end',
          '& > *': {
            minWidth: 0,
          },
        }}
      >
        {actReq && actReq.type === 'text' && (
          <MuiTextInput
            color={color}
            chatController={chatCtl}
            actionRequest={actReq as TextActionRequest}
          />
        )}
        {actReq && actReq.type === 'select' && (
          <MuiSelectInput
            color={color}
            chatController={chatCtl}
            actionRequest={actReq as SelectActionRequest}
          />
        )}
        {actReq && actReq.type === 'multi-select' && (
          <MuiMultiSelectInput
            color={color}
            chatController={chatCtl}
            actionRequest={actReq as MultiSelectActionRequest}
          />
        )}
        {actReq && actReq.type === 'file' && (
          <MuiFileInput
            color={color}
            chatController={chatCtl}
            actionRequest={actReq as FileActionRequest}
          />
        )}
        {actReq && actReq.type === 'audio' && (
          <MuiAudioInput
            color={color}
            chatController={chatCtl}
            actionRequest={actReq as AudioActionRequest}
          />
        )}
        {actReq && actReq.type === 'custom' && (
          <CustomComponent
            color={color}
            chatController={chatCtl}
            actionRequest={actReq as CustomActionRequest}
          />
        )}
      </Box>
    </Box>
  );
}
