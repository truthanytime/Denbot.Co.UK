import { useState, forwardRef, useRef } from 'react';
import { DotLoader } from 'react-spinners';
import { TwitterPicker, SketchPicker } from 'react-color';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import MDBox from 'components/MDBox';
import { uploadFile } from 'library/apis/s3Upload';
import { updateSessionApi } from 'library/apis/session';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateModal({ item, open, setOpen, fetchData }) {

    const ref = useRef(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);

    const [name, setName] = useState(item?.name || '');
    const [zapierUrl, setZapierUrl] = useState(item?.zapierUrl || '');
    const [bubbleText, setBubbleText] = useState(item?.bubbleText || '');
    const [isBubbleEnabled, setIsBubbleEnabled] = useState(!!item?.isBubbleEnabled);
    const [avatar, setAvatar] = useState(item?.avatar || '');
    const [isLeft, setIsLeft] = useState(item?.isLeft || false);
    const [isAuto, setIsAuto] = useState(item?.isAuto || false);
    const [isTransparent, setIsTransparent] = useState(item?.isTransparent || false);
    const [chatBackColor, setChatBackColor] = useState(item?.chatBackColor || '#FF6900');
    const [color, setColor] = useState(item?.color || '#FF6900');
    const [bubbleColor, setBubbleColor] = useState(item?.bubbleColor || (item?.color || '#FF6900'));

    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setIsUploading(false);
        setOpen(false);
        fetchData().catch(console.error);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            console.log('Data: ', item);
            await updateSessionApi(item?._id, {
                name: name,
                avatar: avatar,
                color: color,
                zapierUrl: zapierUrl,
                bubbleText: bubbleText,
                isLeft: isLeft,
                isAuto: isAuto,
                isTransparent: isTransparent,
                isBubbleEnabled: isBubbleEnabled,
                bubbleColor: bubbleColor,
                chatBackColor: chatBackColor,
            });
            setIsLoading(false);
        } catch (error) {
            console.log('Update Session Error:', error);
            setIsLoading(false);
        }
        handleClose();
    }

    const handleChange = async event => {
        setIsUploading(true);
        const fileUploaded = event.target.files[0];
        try {
            const s3Url = await uploadFile(fileUploaded);
            setAvatar(s3Url);
            setIsUploading(false);
        } catch (error) {
            setIsUploading(false);
            console.log(error);
        }
    }

    const handleBoxClick = () => {
        setModalOpen(true);
    };

    const handleBoxClick1 = () => {
        setModalOpen1(true);
    };

    const handleColorChange = (color) => {
        setBubbleColor(color.hex);
    };

    const handleChatBackColor = (color) => {
        setChatBackColor(color.hex);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalClose1 = () => {
        setModalOpen1(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
        >
            <Paper elevation={3} sx={{ padding: '10px', backgroundColor: '#202A40' }}>
                <Typography variant='h5' p={2}>{"Please Input your bot information"}</Typography>
                <Divider sx={{ margin: 0 }} />
                <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                    <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-start' }}>
                        <MDBox
                            variant="gradient"
                            bgColor="dark"
                            color="white"
                            coloredShadow="dark"
                            borderRadius="xl"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="6rem"
                            height="6rem"
                            m={2}
                        >
                            {!avatar.length ?
                                <Icon fontSize="medium" color="inherit">message</Icon> :
                                <MDBox width="6rem" height="6rem" component="img" src={avatar} sx={{ borderRadius: 3, borderWidth: 4, borderColor: color }} />
                            }
                        </MDBox>
                        <Box sx={{ marginLeft: -2.5, marginTop: "4.5rem", display: 'flex', justifyContent: 'flex-end' }}>
                            {!isUploading && <IconButton onClick={() => { ref.current.click() }} sx={{ color: '#cccccc', marginLeft: -2 }}><CameraAltIcon /></IconButton>}
                            {isUploading && <DotLoader color={'#ffffff'} size={10} />}
                        </Box>
                        <Box m={2}>
                            <TwitterPicker
                                triangle='hide'
                                onChange={(e) => { setColor(e.hex) }}
                            />
                        </Box>
                    </Box>
                    <Box ml={1}>
                        <TextField
                            margin="dense"
                            label="Input Your Bot Name"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Box sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                            <Checkbox
                                checked={isBubbleEnabled}
                                onChange={(e) => setIsBubbleEnabled(e.target.checked)}
                            />
                            <TextField
                                margin="dense"
                                label="Input Your Bot Bubble Text"
                                fullWidth
                                variant="standard"
                                value={bubbleText}
                                disabled={!isBubbleEnabled}
                                onChange={(e) => setBubbleText(e.target.value)}
                            />
                            <Box
                                sx={{
                                    background: 'white',
                                    width: '50px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    margin: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': {
                                        background: 'lightgray',
                                    },
                                    '&:active': {
                                        background: 'gray',
                                    },
                                }}
                                onClick={handleBoxClick}
                            >
                                <Box sx={{
                                    background: bubbleColor, width: '33px', height: '33px', borderRadius: '8px',
                                }}>
                                </Box>

                            </Box>
                            {modalOpen && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                        right: '0',
                                        bottom: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        zIndex: 99,
                                    }}
                                >
                                    <div style={{ background: 'white', padding: '20px' }}>
                                        <SketchPicker color={bubbleColor} onChange={handleColorChange} />
                                        <Button onClick={handleModalClose}>Close</Button>
                                    </div>
                                </div>
                            )}
                        </Box>
                        <Box sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-start' }}>
                            <Typography variant='h5' p={2}>{"Bot Auto: "}</Typography>
                            <Checkbox
                                checked={isAuto}
                                onChange={(e) => setIsAuto(e.target.checked)}
                            />
                            <Typography variant='h5' p={2}>{"Set Bot Left: "}</Typography>
                            <Checkbox
                                checked={isLeft}
                                onChange={(e) => setIsLeft(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-start' }}>
                            <Typography variant='h5' p={2}>{"Transparent Mode: "}</Typography>
                            <Checkbox
                                checked={isTransparent}
                                onChange={(e) => setIsTransparent(e.target.checked)}
                            />
                            <Box
                                sx={{
                                    background: 'white',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    margin: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': {
                                        background: 'lightgray',
                                    },
                                    '&:active': {
                                        background: 'gray',
                                    },
                                }}
                                onClick={handleBoxClick1}
                            >
                                <Box sx={{
                                    background: chatBackColor, width: '33px', height: '33px', borderRadius: '8px',
                                }}>
                                </Box>

                            </Box>
                            {modalOpen1 && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                        right: '0',
                                        bottom: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        zIndex: 99,
                                    }}
                                >
                                    <div style={{ background: 'white', padding: '20px' }}>
                                        <SketchPicker color={chatBackColor} onChange={handleChatBackColor} />
                                        <Button onClick={handleModalClose1}>Close</Button>
                                    </div>
                                </div>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button sx={{ marginTop: 1, borderColor: 'white' }} onClick={handleSave}>Save</Button>
                        </Box>
                        <input
                            id="myInput"
                            type="file"
                            accept={"image/*"}
                            ref={ref}
                            onChange={handleChange}
                            style={{ display: 'none' }} />
                    </Box>
                </Box>
            </Paper>
        </Dialog >
    );
}
