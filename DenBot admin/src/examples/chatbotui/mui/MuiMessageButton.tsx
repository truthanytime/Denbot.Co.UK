import { Box, Button, Icon } from '@mui/material';
import React from 'react';

import { ChatController } from '../chat-controller';
import {
  MultiSelectActionRequest,
  MultiSelectActionResponse,
} from '../chat-types';

export function MuiMessageButton({
  texts,
  value,
  color,
}: {
  texts: String[];
  value: String;
  color: string;
}): React.ReactElement {

  return (
    <Box
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          flex: '0 0 auto',
          maxWidth: '100%',
        },
        '& > * + *': {
          mt: 1,
        },
      }}
    >
      {texts.map((text: String) => {
        const isSelected = text === value;
        return (
          <Button
            type="button"
            variant={"outlined"}
            sx={{
              margin: 0.3,
              marginX: 2,
              background: !isSelected ? '#ffffff' : color, 
              fontFamily: 'Helvetica',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'none !important', 
              color: !isSelected ? color: '#fff', 
              textAlign: 'left !important', 
              borderColor: color, '&:hover': {
                borderColor: color,
                backgroundColor: isSelected ? color : '#fff',
              }
            }}
          >
            {text}
          </Button>)
      }
      )}
    </Box>
  );
}
