import React from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardContent,
  IonCard,
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
    const worksheet = XLSX.utils.json_to_sheet(data);
    const colWidths = Object.keys(data[0]).map(key => {
      const maxLength = data.reduce((max, item) => Math.max(max, item[key]?.toString().length || 0), key.length);
      return { wch: maxLength + 2 };
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
      <IonContent >
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
