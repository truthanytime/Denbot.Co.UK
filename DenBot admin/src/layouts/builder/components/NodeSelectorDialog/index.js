import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Icon from "@mui/material/Icon";
import { blue } from '@mui/material/colors';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

export default function NodeSelectorDialog(props) {
    const { onClose, selectedValue, open } = props;

    const nodeData = [
        { title: 'Send Message', value: 'messageNode', icon: 'message' },
        { title: 'Send Image', value: 'imageNode', icon: 'image' },
        { title: 'Input Name', value: 'nameNode', icon: 'message' },
        { title: 'Input Text', value: 'textNode', icon: 'message' },
        { title: 'Input Phone Number', value: 'phoneNode', icon: 'phone' },
        { title: 'Input Email', value: 'emailNode', icon: 'email' },
        { title: 'Send Email', value: 'sendEmailNode', icon: 'poll' },
        { title: 'Send GA Event', value: 'googleAnalyticsNode', icon: 'email' },
        { title: 'ConditionalNode', value: 'conditionalNode', icon: 'dns' },
        { title: 'MultiSelector', value: 'multiSelectorNode', icon: 'toc' }];

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} sx={{ maxWidth: '400px', margin: 'auto' }}
            PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', }, }}
        >
            <MDBox sx={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
                {nodeData.map((node) => (
                    <MDBox
                        key={`selector-${node.value}`}
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="info"
                    >
                        <Button onClick={() => handleListItemClick(node.value)} key={node.value} sx={{ width: "100%", justifyContent: 'left', display: 'flex' }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <Icon fontSize="large">{node.icon}</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <MDTypography variant="button" fontWeight="bold" color="text">
                                {node.title}
                            </MDTypography>
                        </Button>
                    </MDBox>
                ))}
            </MDBox>
        </Dialog>
    );
}