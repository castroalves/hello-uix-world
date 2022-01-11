import { useState, useEffect } from 'react';

import {
    Wrapper,
    useUiExtension
} from '@graphcms/uix-react-sdk'

const SerpPreview = () => {
    const { extension, sidebarConfig, form: { subscribeToFieldState } } = useUiExtension();
    const [ title, setTitle ] = useState('This is the title');
    const [ description, setDescription ] = useState('This is the description');

    const siteUrl = extension.config.SITE_URL;
  
    useEffect(() => {
        async function subscribe() {
            await subscribeToFieldState(
                sidebarConfig.TITLE_FIELD,
                state => {
                    setTitle(state.value);
                },
                { value: true }
            );
        }
        return () => subscribe();
    },[subscribeToFieldState, sidebarConfig.TITLE_FIELD]);

    useEffect(() => {
        async function subscribe() {
            await subscribeToFieldState(
                sidebarConfig.DESCRIPTION_FIELD,
                state => {
                    setDescription(state.value);
                },
                { value: true }
            );
        }
        return () => subscribe();
    },[subscribeToFieldState, sidebarConfig.DESCRIPTION_FIELD]);

    return (
        <div style={{
            padding: '10px',
            backgroundColor: '#fff',
        }}>
            <div style={{
                fontSize: '12px',
                marginBottom: '5px',
            }}>{siteUrl || 'website.com'}</div>
            <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'blue',
                marginBottom: '5px',
            }}>{title || 'Title here'}</div>
            <div>{description?.substring(0, 155) || 'Description here'}...</div>
        </div>
    );
};

const declaration = {
    extensionType: 'formSidebar',
    name: 'Google SERP Preview',
    description: 'Preview your content on Google',
    config: {
        SITE_URL: {
            type: 'string',
            displayName: 'Site URL',
            required: true,
        },
    },
    sidebarConfig: {
        TITLE_FIELD: {
            type: 'string',
            displayName: 'Title Field',
            required: true,
        },
        DESCRIPTION_FIELD: {
            type: 'string',
            displayName: 'Description Field',
            required: true,
        }
    }
};

const GoogleSerpPreview = () => {
    return (
        <Wrapper declaration={declaration}>
            <SerpPreview />
        </Wrapper>
    )
}

export default GoogleSerpPreview;