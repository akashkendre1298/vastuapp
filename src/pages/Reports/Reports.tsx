import React from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import "./Reports.css";
import ToolBar from "../../components/ToolBar/ToolBar";

const ReportPage = () => {
  const generateReport = async (type) => {
    let apiUrl;
    let responseData;

    switch (type) {
      case 'clients':
        apiUrl = 'http://localhost:8888/api/clients';
        break;
      case 'cases':
        apiUrl = 'http://localhost:8888/api/cases';
        break;
      case 'executives': // Added case for executives
        apiUrl = 'http://localhost:8888/api/executives';
        break;
      default:
        return;
    }

    responseData = await fetchData(apiUrl);

    if (responseData) {
      let filteredData = [];

      switch (type) {
        case 'clients':
        case 'cases':
          filteredData = responseData.data.map(item => {
            const { _id, __v, exeId, client_id, executiveID, password, image, ...rest } = item;
            return rest;
          });
          break;
        case 'executives':
          filteredData = responseData.map(item => {
            const { _id, __v, password, ...rest } = item;
            return rest;
          });
          break;
        default:
          break;
      }

      createExcelFile(type, filteredData);
    }
  };

  const fetchData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  };

  const createExcelFile = (type, data) => {
    const headers = Object.keys(data[0]);
    const worksheetData = [headers, [], ...data.map(Object.values)]; // Add an empty row after the headers

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Apply bold style to the headers
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      worksheet[cellAddress].s = { font: { bold: true } };
    });

    // Adjust column widths
    const colWidths = headers.map((header, colIndex) => {
      const maxLength = Math.max(
        header.length,
        ...data.map(row => (row[header] ? row[header].toString().length : 0))
      );
      return { wch: maxLength + 6 }; // Adding some padding
    });

    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type);

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${type}_report.xlsx`);
  };

  return (
    <IonPage>
      <ToolBar />
      <IonContent>
        <div className="main-card">
          <IonCardHeader className="report-header">
            <h1>Reports</h1>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="report-button-group">
              <IonRow className="report-buttons">
                <IonCol>
                  <button className="report-button" onClick={() => generateReport("clients")}>
                    Clients Report
                  </button>
                </IonCol>
              </IonRow>
              <IonRow className="report-buttons">
                <IonCol>
                  <button className="report-button" onClick={() => generateReport("cases")}>
                    Cases Report
                  </button>
                </IonCol>
              </IonRow>
              <IonRow className="report-buttons">
                <IonCol>
                  <button className="report-button" onClick={() => generateReport("executives")}>
                    Executives Report
                  </button>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReportPage;
