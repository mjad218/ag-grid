import React, { useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { getFakeRowData, RowData } from "./helpers";

function App() {
  const [rowData, setRowData] = useState<RowData[]>([]);

  //: ( id,name,last_name,status, actions )
  const [columnDefs] = useState([
    { field: "id" },
    { field: "lastName" },
    { field: "status" },
    // { field: "actions" },
  ]);

  const onInsertRandom = () => {
    const row = getFakeRowData();
    setRowData((prev) => [...prev, row]);
  };
  const getRowId = (params: { data: { id: string } }) => {
    return params.data.id;
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <button onClick={onInsertRandom}>Insert Random</button>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        getRowId={getRowId}
      ></AgGridReact>
    </div>
  );
}

export default App;
