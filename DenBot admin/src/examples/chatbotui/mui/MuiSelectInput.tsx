import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ChatController } from '../chat-controller';
import { SelectActionRequest, SelectActionResponse } from '../chat-types';

export function MuiSelectInput({
  chatController,
  actionRequest,
  color,
}: {
  chatController: ChatController;
  actionRequest: SelectActionRequest;
  color: string;
}): React.ReactElement {
  const chatCtl = chatController;

  const [animationClass, setAnimationClass] = useState('slide-init');

  useEffect(() => {
    setAnimationClass('slide-up');
  }, []);

  const setResponse = React.useCallback(
    (value: string): void => {
      const option = actionRequest.options.find((o) => o.value === value);
      if (!option) {
        throw new Error(`Unknown value: ${value}`);
      }
      const res: SelectActionResponse = {
        type: 'select',
        value: option.text,
        option,
      };
      chatCtl.setActionResponse(actionRequest, res);
    },
    [actionRequest, chatCtl],
  );

  return (
    <Box
      sx={{
        margin: '0px 24px 0px 24px',
        maxHeight: '32vh',
        borderRadius: 2,
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        '& > *': {
          flex: '0 0 auto',
          maxWidth: '100%',
        },
        '& > * + *': {
          mt: 1,
        },
        '&.slide-up': {
          transform: "translate(0%, 0%)",
          transition: "transform 0.3s ease-in-out",
        },
        '&.slide-down': {
          transform: "translate(0%, 120%)",
          transition: "transform 0.3s ease-in-out",
        },
        '&.slide-init': {
          transform: "translate(0%, 120%)",
        }
      }}
      className={animationClass}
    >
      {
        actionRequest.options.map((o) => (
          <Button
            key={actionRequest.options.indexOf(o)}
            type="button"
            variant="outlined"
            value={o.value}
            onClick={(e): void => {
              setAnimationClass('slide-down');
              setResponse(e.currentTarget.value);
            }}
            sx={{
              margin: 1,
              height: '48px',
              lineHeight: '16px !important',
              background: '#ffffff',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'none !important',
              color: color,
              borderColor: color, 
              '&:hover': {
                borderColor: '#ffffff',
                color: '#ffffff',
                background: color,
              }
            }}
          >
            {o.text}
          </Button>
        ))
      }
    </Box >
  );
}
