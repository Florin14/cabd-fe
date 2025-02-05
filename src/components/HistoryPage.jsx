import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box, Typography, CircularProgress, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Card, CardContent } from "@mui/material";
import { getProductPricePeriods, getProductPriceDifferences, productStateAtTimestamp } from "../api/api";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const HistoryPage = () => {
  const [historyType, setHistoryType] = useState("pricePeriods");
  const [historyData, setHistoryData] = useState(null);
  const [historyData2, setHistoryData2] = useState([]);
  const [historyData3, setHistoryData3] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      fetchHistory();
    }
  }, [historyType]);

  const fetchStateAtTimestamp = async (date) => {
    setLoading(true);
    try {
      const formattedDate = date.format("YYYY-MM-DDTHH:mm"); // Format to match API
      let response = await productStateAtTimestamp(productId, formattedDate);
      setHistoryData3(response?.data);
    } catch (error) {
      console.error("Error fetching state:", error);
      setHistoryData3(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setHistoryData([])
    setLoading(true);
    try {
      let data;
      switch (historyType) {
        case "state":
          let response2 = await productStateAtTimestamp(productId, "2025-02-04T12:40");
          setHistoryData3(response2?.data)
          break;
        case "pricePeriods":
          let response1 = await getProductPricePeriods(productId);
          data = response1?.data;
          break;
        case "priceDifferences":
          let response = await getProductPriceDifferences(productId);
          setHistoryData2(response?.data)
          break;
        default:
          data = null;
      }
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!historyData && !historyData2 && !historyData3) return <Typography>No data available.</Typography>;

    if (historyType === "pricePeriods") {

      return (
        <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">{historyData?.productName} (ID: {historyData?.productId}) (Inital Price: {historyData?.price?.toFixed(2)})</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Min Price</TableCell>
                    <TableCell>Max Price</TableCell>
                    <TableCell>Stock Quantity</TableCell>
                    <TableCell>Min Price Period</TableCell>
                    <TableCell>Max Price Period</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>${historyData?.minPrice?.toFixed(2)}</TableCell>
                    <TableCell>${historyData?.maxPrice?.toFixed(2)}</TableCell>
                    <TableCell>{historyData?.stockQuantity}</TableCell>
                    <TableCell>
                      {new Date(historyData?.startTimeForMinPrice).toLocaleString()} -{" "}
                      {new Date(historyData?.endTimeForMinPrice).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(historyData?.startTimeForMaxPrice).toLocaleString()} -{" "}
                      {new Date(historyData?.endTimeForMaxPrice).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      );
    }

    if (historyType === "priceDifferences") {
      return (
        <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">{historyData2?.[0]?.productName} (ID: {historyData2?.[0]?.productId})</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>New Price</TableCell>
                    <TableCell>Old Price</TableCell>
                    <TableCell>Stock Quantity</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>${historyData2[0]?.price?.toFixed(2)} - initial</TableCell>
                    <TableCell>${historyData2[0]?.price?.toFixed(2)} - initial</TableCell>
                    <TableCell>{historyData2[0]?.stockQuantity}</TableCell>
                    <TableCell>
                      {new Date(historyData2[0]?.timestamp).toLocaleString()} - initial
                    </TableCell>
                    <TableCell>
                      {new Date(historyData2[0]?.timestamp).toLocaleString()} - initial
                    </TableCell>
                  </TableRow>
                  {historyData2?.slice(1)?.map((item, index) => (<TableRow id={index}>
                    <TableCell>${item?.newPrice?.toFixed(2)}</TableCell>
                    <TableCell>${item?.oldPrice?.toFixed(2)}</TableCell>
                    <TableCell>{item?.stockQuantity}</TableCell>
                    <TableCell>
                      {new Date(item?.from).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item?.to).toLocaleString()}
                    </TableCell>
                  </TableRow>))}

                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h6">State at Timestamp</Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Select Timestamp"
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(newDate);
              fetchStateAtTimestamp(newDate);
            }}
            sx={{ mt: 2, mb: 2, width: "100%" }}
            />
                </LocalizationProvider>


          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "100px" }}>
              <CircularProgress />
            </Box>
          ) : historyData3 ? (
            <Box sx={{ mt: 2 }}>
              <Typography><strong>Product Name:</strong> {historyData3?.name}</Typography>
              <Typography><strong>Product ID:</strong> {historyData3?.productId}</Typography>
              <Typography><strong>Price:</strong> ${historyData3?.price?.toFixed(2)}</Typography>
              <Typography><strong>Stock Quantity:</strong> {historyData3?.stockQuantity}</Typography>
              <Typography><strong>Valid From:</strong> {new Date(historyData3?.validFrom).toLocaleString()}</Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ mt: 2 }}>No data available.</Typography>
          )}
        </CardContent>
      </Card>
    );

    return null;
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Product History
      </Typography>

      {/* Tabs for History Type Selection */}
      <Tabs value={historyType} onChange={(e, newValue) => setHistoryType(newValue)} sx={{ mb: 3 }}>
        <Tab label="Price Periods" value="pricePeriods" />
        <Tab label="Price Differences" value="priceDifferences" />
        <Tab label="State at Timestamp" value="state" />
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "200px" }}>
          <CircularProgress />
        </Box>
      ) : (
        renderTable()
      )}
    </Box>
  );
};

export default HistoryPage;
