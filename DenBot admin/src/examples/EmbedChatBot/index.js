import React, { useEffect, useState } from 'react';
import "./bot.css";
import "reactflow/dist/style.css";
import { BOT_URL } from 'library/constant';

function EmbedChatBot({ id, color, bubbleText = '', isLeft = false, isAuto = false, isTransparent = false, bubbleColor, chatBackColor }) {

  const bubbleTextColor = bubbleColor ? bubbleColor : color;
  const transBackColorValue = chatBackColor ? chatBackColor : '#ffffff';

  const [initial, setInitial] = useState(isAuto);
  const [showIframe, setShowIframe] = useState(false);
  const [buttonActionClass, setButtonActionClass] = useState(isLeft ? 'app-inActive-left' : 'app-inActive');

  const toggleIframe = () => {
    setShowIframe(() => {
      setButtonActionClass(isLeft ? !showIframe ? 'app-active-left' : 'app-inActive-left' : !showIframe ? 'app-active' : 'app-inActive');
      return !showIframe;
    });

    if (!initial) {
      sendBotStartMessage();
      setInitial(true);
    }
  };

  function sendBotStartMessage() {
    const iframe = document.getElementById(`iframe-bot-${id}`);
    iframe.contentWindow.postMessage({ action: 'startBotMessage' }, `${BOT_URL}preview/${id}?color=${color.substring(1)}&isTransparent=${isTransparent}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonActionClass(isLeft ? isAuto ? 'app-active-left' : 'app-inActive-left' : isAuto ? 'app-active' : 'app-inActive');
      setShowIframe(isAuto);
      if (isAuto) sendBotStartMessage();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => checkAndRegisterEventListener(), []);

  // Define the event handler function
  function messageHandler(event) {
    if (event.data.action === 'closeBotModal') {
      setButtonActionClass(isLeft ? 'app-inActive-left' : 'app-inActive');
      setShowIframe(false); console.log('----Received Close message:', event.data);
      setInitial(false);
    } else if (event.data.action === 'openDenBotSite') {
      console.log('----Received Link message:', event.data);
      parent.window.open(event.data.link, '_blank');
    } else if (event.data.action === 'startBotMessage') {
      console.log('----Received Start Bot message:', event.data);
    }
  }

  // Check if the event listener is already registered
  var isEventListenerRegistered = false; // Flag to track registration status

  function checkAndRegisterEventListener() {
    if (!isEventListenerRegistered) {
      // Add event listener
      window.addEventListener('message', messageHandler);
      isEventListenerRegistered = true;
      console.log('Event listener registered.');
    } else {
      console.log('Event listener already registered.');
    }
  }

  // Remove the existing event listener and register again
  function removeAndRegisterEventListener() {
    if (isEventListenerRegistered) {
      // Remove the event listener
      window.removeEventListener('message', messageHandler);
      isEventListenerRegistered = false;
      console.log('Event listener removed.');
    }
    checkAndRegisterEventListener();
  }

  const isMobileDevice = () => {
    const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
    return mobileMediaQuery.matches;
  };

  const isMobile = isMobileDevice();

  const style = {
    container: {
      minWidth: '340px',
      maxWidth: '50vh',
      width: '90%',
      minHeight: isMobile ? '0px' : '600px',
      maxHeight: isMobile ? '80vh' : '70vh',
      margin: '20px 20px 110px 20px',
      boxShadow: '0px 0px 50px 0px rgba(19, 2, 0, 0.3)',
      borderColor: '#00000010',
      borderRadius: '12px',
    },
    transContainer: {
      minWidth: '340px',
      maxWidth: '50vh',
      width: '90%',
      paddingBottom: '100px',
      backgroundImage: isLeft ? `linear-gradient(90deg, ${transBackColorValue}32 1%, rgba(255, 255, 255, 0) 100%)` : `linear-gradient(270deg, ${transBackColorValue}64 1%, rgba(254, 204, 2, 0) 100%)`,
    },
    iframe: { height: '100%', width: '100%' },
  }

  return (
    <>
      {true && <div
        style={isTransparent ? style.transContainer : style.container}
        className={`zIndexInfinite fixed bottom-0 h-full ${buttonActionClass}`}>
        <iframe
          id={`iframe-bot-${id}`}
          src={`${BOT_URL}preview/${id}?color=${color.substring(1)}&isTransparent=${isTransparent}`}
          style={style.iframe}
        />
      </div>}

      <div className={`${showIframe ? 'text-active' : 'text-inActive'} bot-text-container${isLeft ? '-left' : ''}`}>
        <p style={{ color: bubbleTextColor, fontSize: '12px', fontWeight: 500, whiteSpace: 'pre', textAlign: 'center' }}>
          {`Powered by `}
          <a href="https://denbot.co.uk" style={{ color: '#ba382e' }} target="_blank">DenBot</a></p>
      </div>

      <div
        className={`${isLeft ? 'bot-left' : 'bot-right'} bot-eb-trigger bot-active tooltip slide-up-animation`}
        style={{ bottom: '-100%' }}
        id="eb-bot-trigger"
        onClick={toggleIframe}
      >

        <div className={`${!showIframe ? `tooltiptext${isLeft ? '-left' : ''}` : `tooltiphide`}`} style={{ display: bubbleText?.length == 0 ? 'none' : '' }}>
          <p style={{ color: bubbleTextColor, fontSize: '15px', fontWeight: 600, whiteSpace: 'pre' }}>{bubbleText}</p>
          <span class={`triangle${isLeft ? '-left' : ''}`}></span>
        </div>

        <span
          className="round-container"
          style={{ background: color ? color : '#F0675A' }}>
          <svg className={`${!showIframe ? 'button-active svg-animation fade-in-animation' : 'button-inactive svg-animation fade-out-animation'}`} width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.95 0H4.05C1.755 0 0 1.755 0 4.05V17.55C0 19.845 1.755 21.6 4.05 21.6H18.2247C19.816 21.6 21.3421 22.2321 22.4674 23.3574L24.705 25.595C25.245 26.135 26.055 26.135 26.595 25.595C26.865 25.325 27 25.055 27 24.65V4.05C27 1.755 25.245 0 22.95 0ZM14.85 14.85H6.75C5.94 14.85 5.4 14.31 5.4 13.5C5.4 12.69 5.94 12.15 6.75 12.15H14.85C15.66 12.15 16.2 12.69 16.2 13.5C16.2 14.31 15.66 14.85 14.85 14.85ZM20.25 9.45H6.75C5.94 9.45 5.4 8.91 5.4 8.1C5.4 7.29 5.94 6.75 6.75 6.75H20.25C21.06 6.75 21.6 7.29 21.6 8.1C21.6 8.91 21.06 9.45 20.25 9.45Z" fill="white" />
          </svg>
          <svg className={`${showIframe ? 'button-active svg-animation fade-in-animation' : 'button-inactive svg-animation fade-out-animation'}`} width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L9 9.00001M9 9.00001L16 16M9 9.00001L16 2M9 9.00001L2 16" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </>
  );
}

export default EmbedChatBot;
