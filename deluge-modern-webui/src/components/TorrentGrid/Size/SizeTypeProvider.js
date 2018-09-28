import React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import SizeFormatter from './SizeFormatter';

const SizeTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={SizeFormatter}
        {...props}
    />
);

export default SizeTypeProvider;