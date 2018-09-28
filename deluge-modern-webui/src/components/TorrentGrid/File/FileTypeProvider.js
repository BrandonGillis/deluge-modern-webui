import React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import FileFormatter from './FileFormatter';

const FileTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={FileFormatter}
        {...props}
    />
);

export default FileTypeProvider;