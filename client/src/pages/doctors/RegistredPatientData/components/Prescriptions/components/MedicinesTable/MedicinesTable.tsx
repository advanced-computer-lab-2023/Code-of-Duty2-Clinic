import * as React from "react";
import Box from "@mui/material/Box";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
   GridRowModesModel,
   GridRowModes,
   DataGrid,
   GridColDef,
   GridActionsCellItem,
   GridEventListener,
   GridRowId,
   GridRowEditStopReasons,
   GridToolbarContainer,
   GridRenderCellParams,
   GridRenderEditCellParams,
} from "@mui/x-data-grid";

import PrescribedMedicine from "../../../../../../../types/PrescribedMedicine";
import { useSaveMedicineMutation } from "./medicineService";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextareaAutosize } from "@mui/material";

const CustomEditCell: React.FC<GridRenderEditCellParams> = params => {
   return (
      <TextareaAutosize
         minRows={3}
         style={{ width: "100%", height: "100%", margin: 0 }}
         value={params.value}
         onChange={e => params.api.setEditCellValue({ ...params, value: e.target.value })}
      />
   );
};
interface PrescribedMedicineRow extends PrescribedMedicine {
   isNew?: boolean;
}
interface MedicineCrudGridProps {
   prescriptionId: string;
   medicines: PrescribedMedicineRow[];
   isSubmitted: boolean;
}

const MedicineCrudGrid: React.FC<MedicineCrudGridProps> = ({
   medicines,
   prescriptionId,
   isSubmitted,
}) => {
   const [rows, setRows] = React.useState<PrescribedMedicineRow[]>(medicines);
   const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

   const saveMedicineMutation = useSaveMedicineMutation();
   const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };
   const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   };

   const handleDeleteClick = (id: GridRowId) => () => {
      setRows(rows.filter(row => row.medicineId !== id));
   };

   const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find(row => row.id === id);
      if (editedRow!.isNew) {
         setRows(rows.filter(row => row.id !== id));
      }
   };

   const processRowUpdate = (newRow: PrescribedMedicineRow) => {
      const updatedMedicine = newRow as PrescribedMedicine;
      saveMedicineMutation.mutate({ prescriptionId, updatedMedicine });
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map(row => (row.medicineId === newRow.id ? updatedRow : row)));
      return updatedRow;
   };

   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
   };
   function getRowId(row: PrescribedMedicineRow) {
      return row.medicineId;
   }
   function addMedicinesFromPharmacy() {}
   const columns: GridColDef[] = [
      { field: "name", headerName: "Name", width: 180, editable: false },
      {
         field: "dosage",
         headerName: "Dosage",
         type: "text",
         width: 500,
         editable: !isSubmitted,
         cellClassName: "medicine-crud-grid",
         renderEditCell: (params: GridRenderCellParams) => <CustomEditCell {...params} />,
      },
      {
         field: "quantity",
         headerName: "Quantity",
         width: 220,
         editable: !isSubmitted,
         type: "string",
      },
   ];
   if (!isSubmitted) {
      columns.push({
         field: "actions",
         type: "actions",
         headerName: "Actions",
         width: 100,
         cellClassName: "actions",
         getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
            if (isInEditMode) {
               return [
                  <GridActionsCellItem
                     icon={<SaveIcon />}
                     label="Save"
                     sx={{
                        color: "primary.main",
                     }}
                     onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                     icon={<CancelIcon />}
                     label="Cancel"
                     className="textPrimary"
                     onClick={handleCancelClick(id)}
                     color="inherit"
                  />,
               ];
            }

            return [
               <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
               />,
               <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
               />,
            ];
         },
      });
   }

   return (
      <Box
         sx={{
            height: "auto",
            width: "100%",
            "& .actions": {
               color: "text.secondary",
            },
            "& .textPrimary": {
               color: "text.primary",
            },
         }}
      >
         <DataGrid
            sx={{
               "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
               "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "15px" },
               "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": { py: "22px" },
            }}
            getRowHeight={() => "auto"}
            getRowId={getRowId}
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
               toolbar: () => {
                  return (
                     <GridToolbarContainer>
                        <Button
                           color="primary"
                           startIcon={<AddIcon />}
                           onClick={() => addMedicinesFromPharmacy()}
                        >
                           Add Medicines
                        </Button>
                     </GridToolbarContainer>
                  );
               },
            }}
            slotProps={{
               toolbar: { setRows, setRowModesModel },
            }}
         />
      </Box>
   );
};
export default MedicineCrudGrid;
