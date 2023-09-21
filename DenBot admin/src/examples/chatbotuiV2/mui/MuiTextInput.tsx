import { Box, Button, Icon, TextField, Input, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import React, { useEffect, useState } from 'react';

import { ChatController } from '../chat-controller';
import { TextActionRequest, TextActionResponse } from '../chat-types';

export function MuiTextInput({
  chatController,
  actionRequest,
  color,
}: {
  chatController: ChatController;
  actionRequest: TextActionRequest;
  color: string;
}): React.ReactElement {
  const chatCtl = chatController;
  const [value, setValue] = React.useState(actionRequest.defaultValue);

  const [animationClass, setAnimationClass] = useState('slide-init');

  useEffect(() => {
    setAnimationClass('slide-up');
  }, []);

  const setResponse = React.useCallback((): void => {
    if (value) {
      const res: TextActionResponse = { type: 'text', value };
      chatCtl.setActionResponse(actionRequest, res);
      setValue('');
    }
  }, [actionRequest, chatCtl, value]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        setResponse();
      }
    },
    [setResponse],
  );

  const sendButtonText = actionRequest.sendButtonText
    ? actionRequest.sendButtonText
    : 'Send';

  return (
    <Box
      sx={{
        flex: '1 auto',
        display: 'flex',
        marginLeft: '10px',
        marginRight: '35px',
        '& > *': {
          flex: '1 1 auto',
          minWidth: 0,
        },

        '& > * + *': {
          ml: 1,
        },
        '&.slide-up': {
          transform: "translate(0%, 0%)",
          transition: "transform 1s ease-in-out",
        },
        '&.slide-down': {
          transform: "translate(0%, 120%)",
          transition: "transform 1s ease-in-out",
        },
        '&.slide-init': {
          transform: "translate(0%, 120%)",
          transition: "transform 1s ease-in-out",
        },
      }}
    >
      <Input
        placeholder={actionRequest.placeholder}
        value={value}
        onChange={(e): void => setValue(e.target.value)}
        endAdornment={
          <IconButton sx={{
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: 'red',
            margin: '3px',
            padding: '10px',
            marginRight: '8px',
            background: color, '&:hover': {
              background: color + '99',
            },
          }} onClick={setResponse} aria-label="add to shopping cart">
            <ArrowUpward sx={{ color: '#ffffff', width: '20px', height: '20px' }} />
          </IconButton>
        }
        style={{
          background: 'white',
          borderRadius: 8,
          borderColor: 'red',
          borderWidth: '0',
          marginRight: 6,
          paddingLeft: '20px',
          boxShadow: '0px 0px 8px 0px rgba(19, 2, 0, 0.2)',
          color: 'black'
        }}
        autoFocus
        disableUnderline
        multiline
        inputProps={{ onKeyDown: handleKeyDown }}
        maxRows={10}
      />
    </Box>
  );
}
