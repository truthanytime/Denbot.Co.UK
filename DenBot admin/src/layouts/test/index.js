
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

import EmbedChatBot from 'examples/EmbedChatBot'
import { API_URL } from 'library/constant';

function Test() {

    const { id } = useParams();
    const location = useLocation();

    const [copyState, setCopystate] = useState(false);
    const queryParams = new URLSearchParams(location.search);

    const getColorFromURL = () => {
        return '#' + queryParams.get('color');
    };

    const bubbleText = queryParams.get('bubbleText') || '';

    const isLeft = queryParams.get('isLeft') === 'true';
    const isAuto = queryParams.get('isAuto') === 'true';
    const isTransparent = queryParams.get('isTransparent') === 'true';

    const color = getColorFromURL();

    const bubbleColor = '#' + queryParams.get('bubbleColor') || color;
    const chatBackColor = '#' + queryParams.get('chatBackColor') || 'ffffff';

    const bubbleTextTag = bubbleText.length ? `bubble-text="${bubbleText}" bubble-color="${bubbleColor}"` : '';

    const getText = () => {
        return `<script src="${API_URL}denbot.js" botId="${id}" isLeft="${isLeft}" isAuto="${isAuto}" isTransparent="${isTransparent}" chatBackColor="${chatBackColor}" button-color="${color}" ${bubbleTextTag}></script>`;
    }

    return (
        <DashboardLayout>
            <MDBox pt={6} pb={3} sx={{ width: '50vw', height: "100vh", }} >
                <MDTypography pb={2} variant="h3">Test & Deploy</MDTypography>
                <Tooltip title={copyState ? `Copied!` : 'To the deploy this bot to your site you can just copy this tag to the your html file. Click board!'}>
                    <Button onMouseEnter={() => setCopystate(false)} onClick={() => { setCopystate(true) }}>
                        <CopyToClipboard text={getText()}>
                            <MDBox sx={{ borderWidth: 1, borderColor: '#ffffff', borderRadius: '10px', maxWidth: '50vw', padding: '10px' }}>
                                <MDTypography variant="h6" sx={{ wordWrap: 'break-word' }}>{getText()}</MDTypography>
                            </MDBox>
                        </CopyToClipboard>
                    </Button>
                </Tooltip>
                <EmbedChatBot
                    id={id}
                    color={color}
                    bubbleText={bubbleText}
                    isLeft={isLeft}
                    isAuto={isAuto}
                    bubbleColor={bubbleColor}
                    isTransparent={isTransparent}
                    chatBackColor={chatBackColor}
                />
            </MDBox>
        </DashboardLayout>
    );
}

export default Test;
