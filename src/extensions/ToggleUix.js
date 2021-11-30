import {
    Wrapper,
    useUiExtension,
    FieldExtensionType,
    FieldExtensionFeature
} from '@graphcms/uix-react-sdk';

import { useState } from 'react';
import Switch from 'react-switch';

const ToggleField = () => {
    const { value, onChange, isTableCell } = useUiExtension();
    const [checked, setChecked] = useState(false);
    if (isTableCell) {
        return <p style={{height: '60px'}}>{value ? 'yes' : 'no'}</p>;
    }
    return <Switch checked={checked} onChange={(checked) => {
        onChange(checked);
        setChecked(checked);
    }} />
}

const declaration = {
    extensionType: 'field',
    fieldType: FieldExtensionType.BOOLEAN,
    features: [
        FieldExtensionFeature.FieldRenderer,
        FieldExtensionFeature.TableRenderer,
    ],
    name: 'Toggle',
};

const ToggleUix = () => {
    return (
        <Wrapper declaration={declaration}>
            <ToggleField />
        </Wrapper>
    )
}

export default ToggleUix;