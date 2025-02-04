import React, { useEffect, useState } from "react";
import {
  productStateAtTimestamp,
  getProductPricePeriods,
  getProductPriceDifferences,
} from "../api/api";
import {
  StyledContainer,
} from "../styles/StyledComponents";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

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

const HistoryPage = () => {
  const [historyType, setHistoryType] = useState("pricePeriods");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      fetchHistory();
    }
  }, [historyType]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      let data;
      switch (historyType) {
        case "state":
          data = await productStateAtTimestamp();
          break;
        case "pricePeriods":
          data = await getProductPricePeriods(productId);
          break;
        case "priceDifferences":
          data = await getProductPriceDifferences(productId);
          break;
        default:
          data = [];
      }
      setHistoryData(data.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTable = () => {
    switch (historyType) {
      case "state":
        return (<StyledTable>
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
                    {historyType === "pricePeriods" && item.period
                      ? `From: ${item.period.start} To: ${item.period.end}`
                      : historyType === "priceDifferences" && item.difference
                        ? `Difference: $${item.difference}`
                        : JSON.stringify(item.details || item)}
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
        </StyledTable>)

      case "pricePeriods":
        return (<StyledTable>
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
                    {historyType === "pricePeriods" && item.period
                      ? `From: ${item.period.start} To: ${item.period.end}`
                      : historyType === "priceDifferences" && item.difference
                        ? `Difference: $${item.difference}`
                        : JSON.stringify(item.details || item)}
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
        </StyledTable>)
      case "priceDifferences":
        return (<StyledTable>
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
                    {historyType === "pricePeriods" && item.period
                      ? `From: ${item.period.start} To: ${item.period.end}`
                      : historyType === "priceDifferences" && item.difference
                        ? `Difference: $${item.difference}`
                        : JSON.stringify(item.details || item)}
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
        </StyledTable>)
      default:
        return (<StyledTable>
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
                    {historyType === "pricePeriods" && item.period
                      ? `From: ${item.period.start} To: ${item.period.end}`
                      : historyType === "priceDifferences" && item.difference
                        ? `Difference: $${item.difference}`
                        : JSON.stringify(item.details || item)}
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
        </StyledTable>)
    }
  }

  return (
    <StyledContainer>
      <h2>Battery History</h2>

      <div>
        <label htmlFor="historyType">Select History Type:</label>
        <select
          id="historyType"
          value={historyType}
          onChange={(e) => setHistoryType(e.target.value)}
        >
          <option value="state">State at Timestamp</option>
          <option value="pricePeriods">Price Periods</option>
          <option value="priceDifferences">Price Differences</option>
        </select>
      </div>

      {loading ? (
        <p>Loading history...</p>
      ) : (
        getTable()
      )}
    </StyledContainer>
  );
};

export default HistoryPage;
