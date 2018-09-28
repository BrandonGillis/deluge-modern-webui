import React from 'react';
import { Progress } from 'reactstrap';

const FileFormatter = ({ value }) => (
    <div className="col-12">
        <div className="row">
            <div className="text-left text-truncate col">{value.name}</div>
            <div className="text-right text-muted col-auto pl-0">
                {value.state === "Downloading" && <span>{value.progress.toFixed(0)}%</span>}
                {value.state === "Paused" && <span className="purple">Paused</span>}
            </div>
        </div>
        {value.state === "Downloading" && <Progress value={value.progress} color="blue" />}
        {value.state === "Paused" && <Progress value={value.progress} color="purple" />}
        {value.state === "Finished" && <Progress value={value.progress} color="success" />}
    </div>
);

export default FileFormatter;