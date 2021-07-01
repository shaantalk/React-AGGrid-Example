import React from 'react'
import { AgGridReact } from 'ag-grid-react';

export default function Ag({agGridTheme,gridOptions,setGridApi}) {
    return (
        <div style={{ height: '80%', width: '100%', }} className={agGridTheme}>
            <AgGridReact
                onGridReady={(params) => setGridApi(params.api)}
                gridOptions={gridOptions}
            />
        </div>
    )
}
