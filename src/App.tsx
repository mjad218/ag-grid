import React, { MouseEventHandler, RefObject, useRef, useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, GridApi } from "ag-grid-community";
import { getFakeRowData, RowData } from "./helpers";
import { faker } from "@faker-js/faker";
const ActionsCell = (props: any) => {
  const id = props.data.id;
  const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.handleDelete(id);
  };

  const onDuplicate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.handleDuplicate(props.data);
  };

  return (
    <>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onDuplicate}>Duplicate</button>
    </>
  );
};
function App() {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const tableRef = useRef<any>(null);
  const handleDelete = (id: string) => {
    setRowData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleDuplicate = (data: RowData) => {
    const newRow = { ...data, id: faker.datatype.uuid() };
    setRowData((prev) => [...prev, newRow]);
  };

  const [columnDefs] = useState([
    { field: "id", checkboxSelection: true },
    { field: "lastName" },
    { field: "status" },

    {
      field: "actions",
      cellRenderer: ActionsCell,
      cellRendererParams: { handleDelete, handleDuplicate },
    },
  ]);

  const removeSelectedRows = () => {
    const selectedNodes = (tableRef.current.api as GridApi).getSelectedNodes();
    const newRows = rowData.filter((row) =>
      selectedNodes.every((node) => node.data.id !== row.id)
    );

    setRowData(newRows);
  };
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
      <button onClick={removeSelectedRows}>Remove Selected</button>
      <AgGridReact
        ref={tableRef}
        rowData={rowData}
        rowSelection="multiple"
        columnDefs={columnDefs}
        getRowId={getRowId}
      ></AgGridReact>
    </div>
  );
}

export default App;
