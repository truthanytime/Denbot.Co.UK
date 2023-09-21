

window.onload = function () {
    //64f9b0eda475458d97a9c4
    
      var scriptTags = document.getElementsByTagName('script');
      var targetScriptTag = null;
    
      for (var i = 0; i < scriptTags.length; i++) {
        var scriptTag = scriptTags[i];
        if (scriptTag.hasAttribute('botId')) {
          targetScriptTag = scriptTag;
          break;
        }
      }
    
      var botIdValue = '';
      if (targetScriptTag) {
        botIdValue = targetScriptTag.getAttribute('botId');
      } else {
        console.log("Script tag with 'botId' attribute not found.");
      }
    
      function toggleIframe() {
    
        let iframe_wrapper = document.querySelector("#iframe-wrapper");
        let message_icon = document.querySelector("#message_icon");
        let close_icon = document.querySelector("#close_icon");
    
        const isActive = iframe_wrapper.classList.contains('app-inActive');
    
        iframe_wrapper.classList.add(isActive ? 'app-active' : 'app-inActive');
        iframe_wrapper.classList.remove(isActive ? 'app-inActive' : 'app-active');
    
        message_icon.classList = !isActive ? 'button-active svg-animation fade-in-animation' : 'button-inactive svg-animation fade-out-animation';
    
        close_icon.classList = isActive ? 'button-active svg-animation fade-in-animation' : 'button-inactive svg-animation fade-out-animation';
    
      }
    
      let body_element = document.querySelector("body");
      let Iframe_wrapper = document.createElement("div");
      let Iframe_button = document.createElement("div");
    
      let html_content = `<div id="iframe-wrapper"
            style="height:100%; max-width: 400px; width: 100%; padding:10px;"
            class ="zIndexInfinite fixed right-0 bottom-0 h-full app-inActive"
    
            >
            <iframe
              id="iframe-bot-botId"
              src="http://localhost:3000/preview/${botIdValue}"
              width="100%" height="100%"
            />
          </div>
         `
      let html_button = `
         <div
         class="bot-right bot-eb-trigger bot-popup bot-active"
         id="eb-bot-trigger"
         onclick="toggleIframe"
       >
         <span
           class="round-container"
           style="background: #F0675A;">
           <svg id="message_icon"
            class="button-active svg-animation fade-in-animation" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M22.95 0H4.05C1.755 0 0 1.755 0 4.05V17.55C0 19.845 1.755 21.6 4.05 21.6H18.2247C19.816 21.6 21.3421 22.2321 22.4674 23.3574L24.705 25.595C25.245 26.135 26.055 26.135 26.595 25.595C26.865 25.325 27 25.055 27 24.65V4.05C27 1.755 25.245 0 22.95 0ZM14.85 14.85H6.75C5.94 14.85 5.4 14.31 5.4 13.5C5.4 12.69 5.94 12.15 6.75 12.15H14.85C15.66 12.15 16.2 12.69 16.2 13.5C16.2 14.31 15.66 14.85 14.85 14.85ZM20.25 9.45H6.75C5.94 9.45 5.4 8.91 5.4 8.1C5.4 7.29 5.94 6.75 6.75 6.75H20.25C21.06 6.75 21.6 7.29 21.6 8.1C21.6 8.91 21.06 9.45 20.25 9.45Z" fill="white" />
           </svg>
           <svg 
            id="close_icon"
           class="button-inactive svg-animation fade-out-animation" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M2 2L9 9.00001M9 9.00001L16 16M9 9.00001L16 2M9 9.00001L2 16" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
           </svg>
         </span>
       </div>`
    
      Iframe_wrapper.innerHTML = html_content;
      Iframe_button.innerHTML = html_button;
    
      body_element.appendChild(Iframe_wrapper);
      body_element.appendChild(Iframe_button);
    
      const button_element = document.querySelector('#eb-bot-trigger');
      button_element.onclick = toggleIframe;
    
    }