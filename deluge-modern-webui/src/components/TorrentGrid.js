import React, { Component } from 'react';
import { Grid, Table, TableHeaderRow, TableColumnResizing } from '@devexpress/dx-react-grid-bootstrap4';
import SpeedTypeProvider from './TorrentGrid/Speed/SpeedTypeProvider';
import SizeTypeProvider from './TorrentGrid/Size/SizeTypeProvider';
import FileTypeProvider from './TorrentGrid/File/FileTypeProvider';
import TorrentStore from '../stores/TorrentStore';
import ClientActions from '../actions/ClientActions';
import ActionTypes from '../constants/ActionTypes';

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

        this.onTorrentsChange = this.onTorrentsChange.bind(this);
    }

    componentDidMount() {
        TorrentStore.listen(ActionTypes.CLIENT_GET_TORRENTS_SUCCESS, this.onTorrentsChange);

        ClientActions.getTorrents();
        this.interval = setInterval(() => {
            ClientActions.getTorrents();
        }, 2000);
    }

    componentWillUnmount() {
        TorrentStore.unlisten(ActionTypes.CLIENT_GET_TORRENTS_SUCCESS, this.onTorrentsChange);
    }

    onTorrentsChange() {
        let torrents = TorrentStore.getAllTorrents();

        const newRows = Object.keys(torrents).map(function (key) {
            var t = torrents[key];
            return {
                file: { name: t.name, progress: t.progress, state: t.state },
                size: t.total_wanted,
                speed: [t.download_payload_rate, t.upload_payload_rate, t.num_peers, t.num_seeds]
            }
        })

        const newState = Object.assign({}, this.state, {
            rows: newRows
        });

        this.setState(newState);
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