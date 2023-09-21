
var link = document.createElement('link');
// https://app2.denbot.co.uk
link.href = 'https://app2.denbot.co.uk/bot.css';
link.rel = 'stylesheet';

let firstLoad = false;
var isAuto = false;

link.onload = function () {
  // CSS loaded, execute the rest of the code

  window.onload = function () {

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    const initializeGtag = (id) => {
      gtag('config', id);
    };

    const sendBotEvent = (data) => {
      initializeGtag(data?.id);
      gtag('event', data?.action, {
        event_category: data?.category,
        event_label: data?.label,
      });
    };

    var scriptTags = document.getElementsByTagName('script');
    var targetScriptTag = null;

    let body_element = document.querySelector("body");
    let Iframe_wrapper = document.createElement("div");
    let Iframe_text = document.createElement("div");
    let Iframe_button = document.createElement("div");

    for (var i = 0; i < scriptTags.length; i++) {
      var scriptTag = scriptTags[i];
      if (scriptTag.hasAttribute('botId')) {
        targetScriptTag = scriptTag;
        break;
      }
    }

    var botIdValue = '';
    var button_color = '#F0675A';

    var bubbleText = 'How can I help?';
    var bubbleColor = button_color;
    var chatBackColor = '#FFFFFF';
    var isBubble = true;
    var isLeft = false;
    var isTransparent = false;

    const isMobileDevice = () => {
      const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
      console.log('------------------: ', mobileMediaQuery);
      return mobileMediaQuery.matches;
    };

    const isMobile = isMobileDevice();

    if (targetScriptTag) {
      botIdValue = targetScriptTag.getAttribute('botId');
      button_color = targetScriptTag.getAttribute('button-color');
      bubbleColor = targetScriptTag.getAttribute('bubble-color') || button_color;
      chatBackColor = targetScriptTag.getAttribute('chatBackColor') || chatBackColor;

      bubbleText = targetScriptTag.getAttribute('bubble-text') || '';
      isBubble = bubbleText?.length > 0;

      isLeft = targetScriptTag.getAttribute('isLeft') === 'true';
      isAuto = targetScriptTag.getAttribute('isAuto') === 'true';
      isTransparent = targetScriptTag.getAttribute('isTransparent') === 'true';
      firstLoad = isAuto;

      console.log('----------Is Auto: ', isAuto);
      console.log('----------Is Left: ', isLeft);

    } else {
      console.log("Script tag with 'botId' attribute not found.");
    }

    const iFrameStyle = `"
    z-index: 9999999999999999; 
    min-width: 340px; 
    max-width: 40vh; 
    width: 90%; 
    max-height: ${isMobile ? '70vh' : '70vh'};  
    height: ${isMobile ? '70vh' : '70vh'}; 
    min-height: ${isMobile ? '0px' : '600px'}; 
    margin: 20px 20px 110px 20px; 
    box-shadow: 0px 0px 50px 0px rgba(19, 2, 0, 0.4);
    border-color: #00000010;
    border-radius: 12px;"`;

    const transIframeStyle = `"
    z-index: 9999999999999999; 
    min-width: 340px; 
    max-width: 40vh; 
    height: 100vh; 
    width: 90%; 
    padding-bottom: 100px;
    background-image: ${isLeft ? `linear-gradient(90deg, ${chatBackColor}32 1%, rgba(0, 0, 0, 0) 100%)` : `linear-gradient(270deg, ${chatBackColor}32 1%, rgba(0, 0, 0, 0) 100%)`};"`;

    let html_content = `
    <div 
      id="iframe-wrapper"
      style=${isTransparent ? transIframeStyle : iFrameStyle}
      class="dt-zIndexInfinite dt-fixed dt-bottom-0 dt-h-full ${'dt-app-inActive'}${isLeft ? '-left' : ''}" >
    <iframe
      id="iframe-bot-botId"
      style="border: none; top: 0;"
      src="https://app2.denbot.co.uk/preview/${botIdValue}?color=${button_color.substring(1)}&isTransparent=${isTransparent}"
      width="100%" height="100%"
    />
  </div>`;

  let html_text = `
  <div 
    class="dt-text-inActive dt-bot-text-container${isLeft ? '-left' : ''}"
    id="eb-link-text"
  >
    <p style="font-size: 12px; font-weight: 500; text-align: center;" >
    ${'Powered by '}<a href="https://denbot.co.uk" style="font-weight: 600; color: #ba382e; text-decoration: underline;" target="_blank">Denbot</a></p>
</div>
`;

    let html_button = `<div 
      class="${isLeft ? 'dt-bot-left' : 'dt-bot-right'} dt-bot-eb-trigger dt-bot-active dt-tooltip dt-slide-up-animation" 
      id="eb-bot-trigger" 
      style="bottom: -100%"
      onclick="toggleIframe">
    <div id="tooltip-text" class="dt-tooltiptext${isLeft ? '-left' : ''}" style="${isBubble ? '' : 'display: none'}">
    <p style="color: ${bubbleColor}; font-size: 15px; font-weight: 600; white-space: pre; margin: 10px; ">${bubbleText}</p>
    <span class="dt-triangle${isLeft ? '-left' : ''}"></span>
  </div>
  <span
   class="dt-round-container"
   style="background: ${button_color};">
   <svg 
      id="message_icon"
      style="width: 25px; height: 25px;"
      class="dt-button-active dt-svg-animation dt-fade-in-animation" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.95 0H4.05C1.755 0 0 1.755 0 4.05V17.55C0 19.845 1.755 21.6 4.05 21.6H18.2247C19.816 21.6 21.3421 22.2321 22.4674 23.3574L24.705 25.595C25.245 26.135 26.055 26.135 26.595 25.595C26.865 25.325 27 25.055 27 24.65V4.05C27 1.755 25.245 0 22.95 0ZM14.85 14.85H6.75C5.94 14.85 5.4 14.31 5.4 13.5C5.4 12.69 5.94 12.15 6.75 12.15H14.85C15.66 12.15 16.2 12.69 16.2 13.5C16.2 14.31 15.66 14.85 14.85 14.85ZM20.25 9.45H6.75C5.94 9.45 5.4 8.91 5.4 8.1C5.4 7.29 5.94 6.75 6.75 6.75H20.25C21.06 6.75 21.6 7.29 21.6 8.1C21.6 8.91 21.06 9.45 20.25 9.45Z" fill="white" />
   </svg>
   <svg
      id="close_icon"
      style="width: 17px; height: 17px;"
      class="dt-button-inactive dt-svg-animation dt-fade-out-animation" width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L9 9.00001M9 9.00001L16 16M9 9.00001L16 2M9 9.00001L2 16" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
   </svg>
  </span>
  </div>`;

    function toggleIframe() {

      let iframe_wrapper = document.querySelector("#iframe-wrapper");
      let tooltiptext = document.querySelector("#tooltip-text");
      let textContainer = document.querySelector('#eb-link-text');

      isLeft = iframe_wrapper.classList.contains(`dt-app-inActive-left`) || iframe_wrapper.classList.contains(`dt-app-active-left`);
      let isActive = iframe_wrapper.classList.contains(`dt-app-inActive${isLeft ? '-left' : ''}`);

      iframe_wrapper.classList.add(isActive ? `dt-app-active${isLeft ? '-left' : ''}` : `dt-app-inActive${isLeft ? '-left' : ''}`);
      iframe_wrapper.classList.remove(isActive ? `dt-app-inActive${isLeft ? '-left' : ''}` : `dt-app-active${isLeft ? '-left' : ''}`);

      let message_icon = document.querySelector("#message_icon");
      let close_icon = document.querySelector("#close_icon");

      message_icon.classList = !isActive ? 'dt-button-active dt-svg-animation dt-fade-in-animation' : 'dt-button-inactive dt-svg-animation dt-fade-out-animation';
      close_icon.classList = isActive ? 'dt-button-active dt-svg-animation dt-fade-in-animation' : 'dt-button-inactive dt-svg-animation dt-fade-out-animation';

      if (isBubble) {
        tooltiptext.classList.add(!isActive ? `dt-tooltiptext${isLeft ? '-left' : ''}` : `dt-tooltiphide`);
        tooltiptext.classList.remove(!isActive ? `dt-tooltiphide` : `dt-tooltiptext${isLeft ? '-left' : ''}`);
      }

      if (isTransparent) {
        textContainer.classList = isActive ? `dt-bot-text-container${isLeft ? '-left' : ''} dt-text-active` : `dt-bot-text-container${isLeft ? '-left' : ''} dt-text-inActive`;
      }

    }

    Iframe_wrapper.innerHTML = html_content;
    body_element.appendChild(Iframe_wrapper);

    Iframe_button.innerHTML = html_button;
    body_element.appendChild(Iframe_button);

    if (isTransparent) {
      Iframe_text.innerHTML = html_text;
      body_element.appendChild(Iframe_text);
    }

    const button_element = document.querySelector('#eb-bot-trigger');

    button_element.onclick = function () {
      console.log('----Open Button Clicked!');
      if (!firstLoad) {
        sendBotStartMessage();
        firstLoad = true;
      }
      toggleIframe();
    };

    // Define the event handler function
    function messageHandler(event) {
      if (event.data.action === 'closeBotModal') {
        console.log('----Received Close message:', event.data);
        firstLoad && toggleIframe();
        firstLoad = false;

      } else if (event.data.action === 'openDenBotSite') {
        console.log('----Received Link message:', event.data);
        window.open(event.data.link, '_blank');

      } else if (event.data.action === 'sentGoogleAnalytics') {
        sendBotEvent(event.data.data);
      }
    }

    window.addEventListener('message', messageHandler);

    function sendBotStartMessage() {
      const iframe_element = document.querySelector('#iframe-bot-botId');
      iframe_element.contentWindow.postMessage({ action: 'startBotMessage' }, `https://app2.denbot.co.uk/preview/${botIdValue}?color=${button_color.substring(1)}`);
    }

    if (isAuto) {
      setTimeout(() => {
        toggleIframe();
        sendBotStartMessage();
      }, 5000);
    }

  }
};
document.head.appendChild(link);



