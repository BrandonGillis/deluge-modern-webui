import React, { Component } from 'react';
import { Grid, Table, TableHeaderRow, TableColumnResizing } from '@devexpress/dx-react-grid-bootstrap4';

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
            rows: [
                { name: 'Barry Seal, American Traffic 2017 1080P FR EN X264 AC3-mHDgz.mkv', size: '2.7 GiB', progress: 53 },
                { name: 'marvels.cloak.and.dagger.s01e10.final.french.720p.webrip.x264-amb3r.mkv', size: '937.2 MiB', progress: 82 },
            ]
        };
    }

    render() {
        const { rows, columns, defaultColumnWidths } = this.state;

        return (
            <Grid
                rows={rows}
                columns={columns}
            >
                <Table />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableHeaderRow />
            </Grid>
        );
    }
}