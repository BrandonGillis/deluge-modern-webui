import React from 'react';
const prettyBytes = require('pretty-bytes');

const SizeFormatter = ({ value }) => (
    <span>{prettyBytes(value)}</span>
);

export default SizeFormatter;