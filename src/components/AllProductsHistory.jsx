import React, { useEffect, useState } from "react";
import {
    getAllProductsHistory,

} from "../api/api";
import {
    StyledButton,
    StyledContainer,
} from "../styles/StyledComponents";
import styled from "@emotion/styled";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const AllProductsHistoryPage = () => {
    const [historyData, setHistoryData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const data = await getAllProductsHistory();
        setHistoryData(data.data);
    };
    const handleAllProductsHistoryClick = () => {
        // Navigate to the product page with the given productId
        navigate(`/admin`);
    };
    const groupedHistory = historyData.reduce((acc, item) => {
        const key = `${item.productId}-${item.name}`;
        if (!acc[key]) {
            acc[key] = { name: item.name, productId: item.productId, history: [] };
        }
        acc[key].history.push(item);
        return acc;
    }, {});

    return (
        <StyledContainer>
            <div style={{ display: "flex", justifyContent: "space-between" , maxHeight: 60, marginBottom: 15}}><h2>Batteries History</h2>
                <StyledButton
                    onClick={() => handleAllProductsHistoryClick()}
                    style={{background: "red"}}
                >
                    Back to products page
                </StyledButton></div>

            {/* <StyledTable>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Battery ID</th>
                        <th>Details</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData.length > 0 ? (
                        historyData.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{item.productId}</td>
                                <td>
                                    {JSON.stringify(item.details || item)}
                                </td>
                                <td>
                                    {item.timestamp
                                        ? new Date(item.timestamp).toLocaleString()
                                        : "N/A"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No history found.</td>
                        </tr>
                    )}
                </tbody>
            </StyledTable> */}
            <div>
                {Object.values(groupedHistory).map((group, index) => (
                    <Accordion key={group.productId || index} sx={{ mb: 1, boxShadow: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#f5f5f5" }}>
                            <Typography variant="h6">{group.name} (ID: {group.productId})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Change Type</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Stock</TableCell>
                                            <TableCell>Valid From</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {group.history.map((item, i) => (
                                            <TableRow key={item.historyId || i}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell>{item.changeType}</TableCell>
                                                <TableCell>${item?.price?.toFixed(2)}</TableCell>
                                                <TableCell>{item.stockQuantity}</TableCell>
                                                <TableCell>{new Date(item.validFrom).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </StyledContainer>
    );
};

export default AllProductsHistoryPage;
