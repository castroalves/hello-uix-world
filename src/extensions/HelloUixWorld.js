import {
    Wrapper,
    useUiExtension,
    FieldExtensionType,
    FieldExtensionFeature
} from '@graphcms/uix-react-sdk'

const MyField = () => {
    const { value, onChange, isTableCell } = useUiExtension();
    console.log('isTableCell:', isTableCell);
    console.log('doors:', value);
    if (isTableCell) {
        return <p>{value}</p>;
    }
    return <input 
        value={value} 
        onChange={({target: {value: val}}) => onChange(val)} 
        placeholder="https://twitter.com/yourusername"
        />
}

const declaration = {
    extensionType: 'field',
    fieldType: FieldExtensionType.STRING,
    features: [
        FieldExtensionFeature.FieldRenderer,
        FieldExtensionFeature.TableRenderer,
    ],
    name: 'Hello UIX World',
    config: {
        API_KEY: {
            type: 'string',
            displayName: 'API Key',
            description: 'API Key for this UI Extension',
            required: true,
        },
    }
};

const HelloUixWorld = () => {
    const uid = new URLSearchParams(document.location.search).get("extensionUid");
    console.log({ uid });
    return (
        <Wrapper uid={uid} declaration={declaration}>
            <MyField />
        </Wrapper>
    )
}

export default HelloUixWorld;