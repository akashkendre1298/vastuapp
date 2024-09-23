import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonModal,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ToolBar from "../../components/ToolBar/ToolBar";
import "./Reports.css";
import executive from "../../Assets/executive.png";
import cases from "../../Assets/cases.png";
import client from "../../Assets/client.png";
import { calendarOutline, downloadOutline } from "ionicons/icons";

const ReportPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileType, setFileType] = useState("xlsx");

  const openModal = (reportType) => {
    setSelectedReport(reportType);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setStartDate("");
    setEndDate("");
    setFileType("xlsx");
  };

  const handleGenerateReport = () => {
    if (startDate) {
      const startMonth = parseInt(startDate.split("-")[1]);
      console.log("Selected Start Month:", startMonth);
    }

    if (endDate) {
      const endMonth = parseInt(endDate.split("-")[1]);
      console.log("Selected End Month:", endMonth);
    }

    // Continue with the report generation process
    generateReport();
  };

  const fetchData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return [];
    }
  };

  const generateReport = async () => {
    // This will redirect to google.com when clicked
    window.location.href = "http://localhost:3000/";

    closeModal();
  };

  const createExcelFile = (data) => {
    const headers = Object.keys(data[0]);
    const worksheetData = [headers, ...data.map(Object.values)];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedReport);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${selectedReport}_report.xlsx`);
  };

  const createPDF = (data) => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [Object.keys(data[0])],
      body: data.map(Object.values),
    });
    doc.save(`${selectedReport}_report.pdf`);
  };

  return (
    <IonPage>
      <ToolBar />
      <IonContent style={{ backgroundColor: "#e2dee9" }}>
        <div className="main-card">
          <IonCardContent>
            <h1 className="report-title">Reports</h1>
            <IonGrid className="report-button-group">
              <IonRow>
                <IonCol>
                  <IonCard
                    className="report-card"
                    onClick={() => openModal("clients")}
                  >
                    <IonCardContent className="report-card-content">
                      <div>
                        <img
                          src={client}
                          alt="Clients Report"
                          className="report-icon"
                        />
                      </div>
                      <div>
                        <span className="report-name">Client Reports</span>
                      </div>
                      <div>
                        <IonIcon
                          icon={downloadOutline}
                          className="download-icon"
                        />
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard
                    className="report-card"
                    onClick={() => openModal("cases")}
                  >
                    <IonCardContent className="report-card-content">
                      <div>
                        <img
                          src={cases}
                          alt="Cases Report"
                          className="report-icon"
                        />
                      </div>

                      <div>
                        <span className="report-name">Cases Reports</span>
                      </div>
                      <div>
                        <IonIcon
                          icon={downloadOutline}
                          className="download-icon"
                        />
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard
                    className="report-card"
                    onClick={() => openModal("executives")}
                  >
                    <IonCardContent className="report-card-content">
                      <div>
                        <img
                          src={executive}
                          alt="Executives Report"
                          className="report-icon"
                        />
                      </div>

                      <div>
                        <span className="report-name">Executives Reports</span>
                      </div>
                      <div>
                        <IonIcon
                          icon={downloadOutline}
                          className="download-icon"
                        />
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </div>

        <IonModal isOpen={selectedReport !== null} onDidDismiss={closeModal}>
          <div className="modal-wrapper">
            <div className="modal-content-report">
              <h2 className="modal-title-report">
                Download {selectedReport} Report
              </h2>

              <div className="date-row">
                <IonItem className="modal-item">
                  <IonLabel position="floating">Start Month</IonLabel>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <IonInput
                        type="month"
                        style={{ color: "black" }}
                        value={startDate}
                        onIonChange={(e) => setStartDate(e.detail.value)}
                      />
                    </div>
                    <div>
                      <IonIcon
                        icon={calendarOutline}
                        className="calendar-icon"
                      />
                    </div>
                  </div>
                </IonItem>

                <IonItem className="modal-item">
                  <IonLabel position="floating">End Month</IonLabel>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <IonInput
                        type="month"
                        style={{ color: "black" }}
                        value={endDate}
                        onIonChange={(e) => setEndDate(e.detail.value)}
                      />
                    </div>
                    <div>
                      <IonIcon
                        icon={calendarOutline}
                        className="calendar-icon"
                      />
                    </div>
                  </div>
                </IonItem>
              </div>

              <IonItem className="modal-item-filetype">
                <IonLabel position="floating">Select File Type</IonLabel>
                <IonSelect
                  value={fileType}
                  onIonChange={(e) => setFileType(e.detail.value)}
                >
                  <IonSelectOption value="xlsx">Excel (.xlsx)</IonSelectOption>
                  <IonSelectOption value="pdf">PDF (.pdf)</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonButton
                expand="block"
                onClick={handleGenerateReport}
                style={{ marginBottom: "20px" }}
              >
                Download <IonIcon slot="end" icon={downloadOutline} />
              </IonButton>
              <IonButton expand="block" color="danger" onClick={closeModal}>
                Cancel
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ReportPage;
