import React, { useEffect, useState } from "react";
import {
    getAllProductsHistory,

} from "../api/api";
import {
    StyledContainer,
} from "../styles/StyledComponents";
import styled from "@emotion/styled";

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

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const data = await getAllProductsHistory();
        setHistoryData(data.data);
    };

    return (
        <StyledContainer>
            <h2>Batteries History</h2>
            <StyledTable>
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
            </StyledTable>
        </StyledContainer>
    );
};

export default AllProductsHistoryPage;
