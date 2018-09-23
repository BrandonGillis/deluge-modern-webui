import React, { Component } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableColumnResizing } from '@devexpress/dx-react-grid-bootstrap4';
import { Progress } from 'reactstrap';

const ProgressFormatter = ({ value }) => (
        <Progress value={value}>{value.toFixed(2)}%</Progress>
);

const ProgressTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={ProgressFormatter}
        {...props}
    />
);

export default class TorrentGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'name', title: 'Name' },
                { name: 'size', title: 'Size' },
                { name: 'progress', title: 'Progress' },
            ],
            defaultColumnWidths: [
                { columnName: 'name', width: 320 },
                { columnName: 'size', width: 100 },
                { columnName: 'progress', width: 180 },
            ],
            progressColumns: ['progress'],
            rows: [
                // { name: 'Barry Seal, American Traffic 2017 1080P FR EN X264 AC3-mHDgz.mkv', size: '2.7 GiB', progress: 53 },
                // { name: 'marvels.cloak.and.dagger.s01e10.final.french.720p.webrip.x264-amb3r.mkv', size: '937.2 MiB', progress: 82 },
            ]
        };
    }

    componentDidMount() {
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
                        name: t.name,
                        size: t.total_wanted,
                        progress: t.progress
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

    getTorrentRows() {

    }

    render() {
        const { rows, columns, defaultColumnWidths, progressColumns } = this.state;

        return (
            <Grid
                rows={rows}
                columns={columns}
            >
                <ProgressTypeProvider
                    for={progressColumns}
                />
                <Table />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableHeaderRow />
            </Grid>
        );
    }
}