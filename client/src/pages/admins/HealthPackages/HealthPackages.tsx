import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@mui/material/Button";
import HealthPackagesModal from "./components/HealthPackagesModal";
import { config } from "../../../configuration";
import DeletePackageModal from "./components/DeletePackagesModal";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

interface IHealthPackage {
  _id?: string;
  name: string;
  amountToPay: number;
  discounts: {
    gainedDoctorSessionDiscount: number;
    gainedPharmacyMedicinesDiscount: number;
    gainedFamilyMembersDiscount: number;
  };
  packageDurationInYears: number;
}

const HealthPackageResetter = {
  _id: "",
  name: "",
  amountToPay: 0,
  discounts: {
    gainedDoctorSessionDiscount: 0,
    gainedPharmacyMedicinesDiscount: 0,
    gainedFamilyMembersDiscount: 0,
  },
  packageDurationInYears: 0,
};
const HealthPackagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedHealthPackage, setSelectedHealthPackage] =
    useState<IHealthPackage>(HealthPackageResetter);
  const [selectedHealthPackageIndex, setSelectedHealthPackageIndex] =
    useState<number>(0);
  const [healthPackages, setHealthPackages] = useState<IHealthPackage[]>([]);
  const [openEditingModal, setOpenEditingModal] = useState(false);
  const [openDeletingModal, setOpenDeletingModal] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchHealthPackages();
  }, []);

  function fetchHealthPackages() {
    axios.get(`${config.serverUri}/admins/health-packages`).then((response) => {
      console.log(JSON.stringify(response.data));
      setHealthPackages(response.data);
    });
  }

  function openEditModal(index: number) {
    setCreate(false);
    setSelectedHealthPackage(healthPackages[index]);
    setSelectedHealthPackageIndex(index);
    setOpenEditingModal(true);
  }

  function openCreateModal() {
    setCreate(true);
    setSelectedHealthPackage(HealthPackageResetter);
    setOpenEditingModal(true);
  }
  const handleCreateOrEdit = (
    _closed: boolean,
    create?: boolean,
    healthPackage?: IHealthPackage
  ): void => {
    if (create) {
      setHealthPackages((prev: any) => {
        prev.push(healthPackage);
        return prev;
      });
    } else if (create === false) {
      setHealthPackages((prev: any) => {
        prev[selectedHealthPackageIndex] = healthPackage;
        return prev;
      });
    }
  };

  function openDeleteModal(index: number) {
    setSelectedHealthPackage(healthPackages[index]);
    setOpenDeletingModal(true);
  }
  const handleDelete = (): void => {
    setHealthPackages((prev) => {
      prev.splice(selectedHealthPackageIndex, 1);
      return prev;
    });
  };
  return (
    <div className="px-12 !flex !flex-col justify-center align-middle my-10">
      <h1 className="mx-auto px-auto">Health Packages</h1>
      <Button
        sx={{ backgroundColor: "#1976d2" }}
        onClick={openCreateModal}
        variant="contained"
      >
        <AddCircleOutlineOutlinedIcon />
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              background: "linear-gradient(to right, #1976d2, #00d4ff)",
              color: "width",
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }}>
                Package Duration (Years)
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Doctor Session Discount
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Pharmacy Medicines Discount
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Family Members Discount
              </TableCell>
              <TableCell sx={{ color: "white" }}>options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {healthPackages.map((healthPackage: IHealthPackage, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {healthPackage.name}
                </TableCell>
                <TableCell align="center">
                  {healthPackage.amountToPay}
                </TableCell>
                <TableCell align="center">
                  {healthPackage.packageDurationInYears}
                </TableCell>
                <TableCell align="center">
                  {healthPackage.discounts.gainedDoctorSessionDiscount * 100}%
                </TableCell>
                <TableCell align="center">
                  {healthPackage.discounts.gainedPharmacyMedicinesDiscount *
                    100}
                  %
                </TableCell>
                <TableCell align="center">
                  {healthPackage.discounts.gainedFamilyMembersDiscount * 100}%
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit">
                    <EditIcon onClick={() => openEditModal(index)} />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      onClick={() => openDeleteModal(index)}
                      color="error"
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Creating or editing health Package */}
      {openEditingModal && (
        <HealthPackagesModal
          onClose={() => {
            setOpenEditingModal(false);
          }}
          onSubmit={handleCreateOrEdit}
          healthPackage={selectedHealthPackage}
          create={create}
          open={openEditingModal}
        />
      )}

      {/* Modal for Deleting health Package */}
      {openDeletingModal && (
        <DeletePackageModal
          close={() => {
            setOpenDeletingModal(false);
          }}
          onSubmit={handleDelete}
          open={openDeletingModal}
          id={selectedHealthPackage._id}
        />
      )}

<Box display="flex" justifyContent="center">
          <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/admin/dashboard")}
        sx={{ margin: 2}}
      >
        Back to Home
      </Button>
</Box>

    </div>
  );
};
export default HealthPackagesPage;
