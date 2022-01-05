import { useState, useEffect } from 'react';

import {
    Wrapper,
    useUiExtension
} from '@graphcms/uix-react-sdk'

const SerpPreview = () => {
    const { form: { subscribeToFieldState, getFieldState } } = useUiExtension();
    const [ name, setName ] = useState('This is the title');
    const [ description, setDescription ] = useState('This is the description');
    const [ brand, setBrand ] = useState('Brand');
  
    useEffect(() => {
        let unsubscribeNameField;
        async function subscribe() {
            unsubscribeNameField = await subscribeToFieldState(
                'name',
                state => {
                    setName(state.value);
                },
                { value: true }
            );
        }
        subscribe();
        return () => {
            //unsubscribeNameField();
        }
    },[subscribeToFieldState, name]);

    useEffect(() => {
        let unsubscribeDescriptionField;
        async function subscribe() {
            unsubscribeDescriptionField = await subscribeToFieldState(
                'description',
                state => {
                    setDescription(state.value);
                },
                { value: true }
            );
        }
        subscribe();
        return () => {
            //unsubscribeDescriptionField();
        }
    },[subscribeToFieldState, description]);

    useEffect(() => {
        let unsubscribeBrandField;
        async function subscribe() {
            unsubscribeBrandField = await subscribeToFieldState(
                'brand',
                state => {
                    setBrand(state.value);
                },
                { value: true }
            );
        }
        subscribe();
        return () => {
            //unsubscribeBrandField();
        }
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