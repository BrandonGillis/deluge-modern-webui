import React, { Component } from 'react';
import { Grid, Table, TableHeaderRow, TableColumnResizing } from '@devexpress/dx-react-grid-bootstrap4';
import SpeedTypeProvider from './TorrentGrid/Speed/SpeedTypeProvider';
import SizeTypeProvider from './TorrentGrid/Size/SizeTypeProvider';
import FileTypeProvider from './TorrentGrid/File/FileTypeProvider';

// {method: "core.resume_torrent", params: [["3b1d85f8780ef8c4d8538f809a7a63fc5299318e"]], id: 22}
// {method: "core.pause_torrent", params: [["3b1d85f8780ef8c4d8538f809a7a63fc5299318e"]], id: 28}


const TableComponent = ({ ...restProps }) => (
    <div className="card">
        <Table.Table
            {...restProps}
            className="table-striped table-white table-hover"
        />
    </div>
);

export default class TorrentGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'file', title: 'FILE' },
                { name: 'size', title: 'SIZE' },
                { name: 'speed', title: 'SPEED' },
            ],
            defaultColumnWidths: [
                { columnName: 'file', width: 320 },
                { columnName: 'size', width: 100 },
                { columnName: 'speed', width: 180 },
            ],
            fileColumns: ['file'],
            sizeColumns: ['size'],
            speedColumns: ['speed'],
            rows: [
            ]
        };
    }

    componentDidMount() {
        this.getTorrents();
        this.interval = setInterval(() => {
            this.getTorrents();
        }, 2000);
    }

    getTorrents() {
        global.api
            .post('json', {
                'method': 'web.update_ui',
                'params': [
                    [
                        "queue",
                        "name",
                        "total_wanted",
                        "state",
                        "progress",
                        "num_seeds",
                        "total_seeds",
                        "num_peers",
                        "total_peers",
                        "download_payload_rate",
                        "upload_payload_rate",
                        "eta",
                        "ratio",
                        "distributed_copies",
                        "is_auto_managed",
                        "time_added",
                        "tracker_host",
                        "save_path",
                        "total_done",
                        "total_uploaded",
                        "max_download_speed",
                        "max_upload_speed",
                        "seeds_peers_ratio"
                    ],
                    {}
                ],
                'id': 1
            }).then(response => {

                console.log(response.data);
                // create an array of torrent rows only with relevant data
                var torrents = response.data.result.torrents;

                const newRows = Object.keys(torrents).map(function (key) {
                    var t = torrents[key];
                    return {
                        file: { name: t.name, progress: t.progress, state: t.state },
                        size: t.total_wanted,
                        speed: [t.download_payload_rate, t.upload_payload_rate, t.num_peers, t.num_seeds]
                    }
                })
                console.log(newRows);
                // create a new "State" object without mutating 
                // the original State object. 
                const newState = Object.assign({}, this.state, {
                    rows: newRows
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    render() {
        const { rows, columns, defaultColumnWidths, speedColumns, sizeColumns, fileColumns } = this.state;

        return (
            <Grid
                rows={rows}
                columns={columns}
            >
                <FileTypeProvider
                    for={fileColumns}
                />
                <SizeTypeProvider
                    for={sizeColumns}
                />
                <SpeedTypeProvider
                    for={speedColumns}
                />
                <Table tableComponent={TableComponent} />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableHeaderRow />
            </Grid>
        );
    }
}