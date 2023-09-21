import { Avatar, Box, Grow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import ReplayIcon from '@mui/icons-material/Replay';
import { Link } from 'react-router-dom';

import { Message, MessageContent } from '../chat-types';

export function MuiMessage({
  id,
  message,
  color,
  setCurrentNode,
}: {
  id: string;
  message: Message<MessageContent>;
  color: string;
  setCurrentNode: (index: string) => {};
}): React.ReactElement {

  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIndicator(false);
    }, !message?.self ? 700 : 0);

    return () => clearTimeout(timer);
  }, []);

  if (message.deletedAt) {
    return <div id={id} />;
  }

  const ChatAvator = (
    <Box
      minWidth={0}
      flexShrink={0}
      ml={message.self ? 1 : 0}
      mr={message.self ? 0 : 1}
      onClick={() => {
        console.log('Onclicked: ', message.nodeID);
        setCurrentNode(message.nodeID);
      }}
    >
      <Avatar alt={message.username} src={message.avatar}
        sx={{ '& img': { height: "100% !important" } }} />
    </Box>
  );

  const RepeatButton = (
    <Box
      sx={{
        opacity: 0.2,
        transition: 'opacity 0.3s',
        '&:hover': {
          opacity: 1,
        }
      }}
    >
      <ReplayIcon
        sx={{ color: color }}
        onClick={() => {
          console.log('Onclicked: ', message.nodeID);
          setCurrentNode(message.nodeID);
        }} />
    </Box>
  );

  const handleLink = (link: string) => {
    parent.window.open(link, '_blank');
  }

  const parseText = (text: string) => {
    const urlRegex = /([^\s]+\[https?:\/\/[^\s]+\])/g;
    const urlRegex1 = /([^\s]+)\[(https?:\/\/[^\s]+)\]/g;
    const parts = text.split(urlRegex);
    return parts.map((part: string, index: number) => {
      const subParts = part.split(urlRegex1);
      if (subParts.length > 1) {
        const word = subParts[1];
        const url = subParts[2];

        return (
          <span key={index}>
            <a
              style={{
                fontSize: '14px',
                lineHeight: '21px',
                fontWeight: 400,
                fontFamily: 'Helvetica',
                wordWrap: 'break-word',
                color: 'blue',
                width: '100%',
                textAlign: 'left',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {word}
            </a>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };


  return (
    <Grow in>
      <Box maxWidth="100%" display="flex" flexDirection="column">
        <Box
          id={id}
          maxWidth="100%"
          my={1}
          pl={message.self ? '17%' : 0}
          pr={message.self ? 0 : '5%'}
          display="flex"
          justifyContent={message.self ? 'flex-end' : 'flex-start'}
        >
          {!message.self && ChatAvator}
          <Box minWidth={0} display="flex" flexDirection="column">
            <Box
              maxWidth="100%"
              py="16px"
              px="18px"
              bgcolor={!message.self ? color + '1A' : '#0000000A'}
              borderRadius={!message.self ? '0 6px 6px 6px' : '6px 6px 0px 6px'}
            >
              {showIndicator && <BeatLoader color={color} size={10} />}
              {!showIndicator && (
                message.type === 'text' ? (
                  <Typography
                    style={{
                      fontSize: '14px',
                      lineHeight: '21px',
                      fontWeight: 400,
                      fontFamily: 'Helvetica',
                      color: '#212b35',
                      wordWrap: 'break-word'
                    }}>{parseText(message.content as string)}</Typography>
                ) :
                  message.type === 'jsx' ? <div dangerouslySetInnerHTML={{ __html: message.content as string }}></div> : <div />)}
            </Box>
          </Box>
          {message.avatar && message.self && ChatAvator}
          {!message.self && message.nodeID && RepeatButton}
        </Box>
      </Box >
    </Grow >
  );
}
