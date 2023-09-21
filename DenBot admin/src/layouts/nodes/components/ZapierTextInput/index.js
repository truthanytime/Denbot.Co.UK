import React, { useEffect, useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import MDButton from "components/MDButton";
import { getZapierUrlApi, setZapierUrlApi } from 'library/apis/admin';

const ZapierTextInput = () => {
    const [zapierUrl, setZapierUrl] = useState('');

    useEffect(() => {
        // Fetch the configuration file
        getZapierUrlApi()
            .then(response => {
                setZapierUrl(response?.zapierUrl || '');
            })
            .catch(error => console.error('Error fetching configuration:', error));
    }, []);

    const handleZapierUrlChange = (event) => {
        const newZapierUrl = event.target.value;
        setZapierUrl(newZapierUrl);
    };

    const hadleSaveZapierUrl = () => {
        // Update the configuration file
        const configData = { zapierUrl: zapierUrl };
        setZapierUrlApi(configData)
            .catch(error => console.error('Error updating configuration:', error));
    }

    return (
        <Box m={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography p={1}>Zapier URL:</Typography>
            <TextField
                id="zapierUrlInput"
                type="text"
                value={zapierUrl}
                sx={{ minWidth: '300px' }}
                onChange={handleZapierUrlChange}
            />
            <MDButton
                variant="gradient"
                color="dark"
                sx={{ height: '40px', margin: '10px' }}
                onClick={hadleSaveZapierUrl}>Save</MDButton>
        </Box>
    );
};

export default ZapierTextInput;
