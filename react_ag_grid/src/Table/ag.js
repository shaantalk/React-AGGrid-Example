import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import AG_GRID_LOCALE_EN from "./locale.en";

export default function Ag({agGridTheme,gridOptions,setGridApi}) {
    return (
        <div style={{ height: '80%', width: '100%', }} className={agGridTheme}>
            <AgGridReact
                onGridReady={(params) => setGridApi(params.api)}
                gridOptions={gridOptions}
                localeText={AG_GRID_LOCALE_EN}
            />
        </div>
    )
}
