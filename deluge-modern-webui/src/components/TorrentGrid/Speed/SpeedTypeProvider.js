import React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import SpeedFormatter  from './SpeedFormatter';

const SpeedTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={SpeedFormatter}
        {...props}
    />
);

export default SpeedTypeProvider;