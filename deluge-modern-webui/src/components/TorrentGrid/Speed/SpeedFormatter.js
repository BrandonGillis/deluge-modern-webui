import React from 'react';
const prettyBytes = require('pretty-bytes');

const SpeedFormatter = ({ value }) => (
    <div className="col-12">
        <div className="row">
            <div className="col-12">
                {value[0] > 0 ? prettyBytes(value[0]) : prettyBytes(0)}/sec <small>(down)</small> -&nbsp;
                {value[1] > 0 ? prettyBytes(value[0]) : prettyBytes(0)}/sec <small>(up)</small>
            </div>
        </div>
        <div className="row">
            <div className="col-12"><small className="text-muted">{value[2]} PEERS / {value[3]} LEECHERS</small></div>
        </div>
    </div>
);

export default SpeedFormatter;