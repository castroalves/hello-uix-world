import { useState, useEffect } from 'react';

import {
    Wrapper,
    useUiExtension
} from '@graphcms/uix-react-sdk'

const SerpPreview = () => {
    const { form: { subscribeToFieldState } } = useUiExtension();
    const [ name, setName ] = useState('This is the title');
    const [ description, setDescription ] = useState('This is the description');
    const [ brand, setBrand ] = useState('Brand');
  
    useEffect(() => {
        async function subscribe() {
            await subscribeToFieldState(
                'name',
                state => {
                    setName(state.value);
                },
                { value: true }
            );
        }
        return () => subscribe();
    },[subscribeToFieldState, name]);

    useEffect(() => {
        async function subscribe() {
            await subscribeToFieldState(
                'description',
                state => {
                    setDescription(state.value);
                },
                { value: true }
            );
        }
        return () => subscribe();
    },[subscribeToFieldState, description]);

    useEffect(() => {
        async function subscribe() {
            await subscribeToFieldState(
                'brand',
                state => {
                    setBrand(state.value);
                },
                { value: true }
            );
        }
        return () => subscribe();
    },[subscribeToFieldState, brand]);

    return (
        <div style={{
            padding: '10px',
            backgroundColor: '#fff',
        }}>
            <div style={{
                fontSize: '12px',
                marginBottom: '5px',
            }}>autoreviews.com</div>
            <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'blue',
                marginBottom: '5px',
            }}>{brand} {name} | AutoReviews</div>
            <div style={{
                textAlign: 'justify',
            }}>{description?.substring(0, 155)}...</div>
        </div>
    );
};

const declaration = {
    extensionType: 'formSidebar',
    name: 'Google SERP Preview',
    description: 'Preview your content on Google',
};

const GoogleSerpPreview = () => {
    return (
        <Wrapper declaration={declaration}>
            <SerpPreview />
        </Wrapper>
    )
}

export default GoogleSerpPreview;