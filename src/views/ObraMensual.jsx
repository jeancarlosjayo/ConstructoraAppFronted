import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Bar } from "react-chartjs-2";
import {
  fechaDehoy,
  fechaTimeStamp,
  mesTimeStamp,
  mesNombre,
} from "../helpers/Fechas";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Button } from "@material-ui/core";

const ObraMensual = () => {
  let { id } = useParams();
  const obra = id.split("-");

  const mes = mesNombre(obra[1]);

  const [fechas, setFechas] = React.useState([]);
  const [cantidad, setCantidad] = React.useState([]);

  const [excel, setExcel] = React.useState([]);

  const [nombre, setNombre] = React.useState("");

  const obtenerDatosGeneral = async () => {
    await firebase
      .database()
      .ref("/obras/" + obra[0])
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setNombre(data.name);
        } else {
          console.log("error");
          return null;
        }
      });
  };

  const obtenerFechasyCantidad = async () => {
    let totalAsistence = 0;

    await firebase
      .database()
      .ref("/obras/" + obra[0])
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          totalAsistence = snapshot.val().buildersnum;
        } else {
          console.log("error");
          return null;
        }
      });

    await firebase
      .database()
      .ref("/obras/" + obra[0])
      .child("asistencia")
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          let array = [];
          snapshot.forEach(function (ChildSnapshot) {
            let objeto = {};
            const monthCurrency = parseInt(obra[1]);
            const timestamp = new Date(ChildSnapshot.key * 1000);
            const monthTimestamp = mesTimeStamp(timestamp);
            if (monthCurrency === monthTimestamp) {
              const datafor = Object.values(ChildSnapshot.val());
              objeto.count = datafor.length;
              objeto.total = totalAsistence;
              objeto.day = fechaTimeStamp(new Date(ChildSnapshot.key * 1000));
              array.push(objeto);
            }
          });
          recibirArray(array, totalAsistence);
        } else {
          console.log("error NO TIENE ASISTENCIA");
          return null;
        }
      });
  };
  const recibirArray = (array, totalAsistence) => {
    if (array.length > 0) {
      const ArrayDay = array.map((item) => item.day);
      ArrayDay.unshift("Se esperaba");
      setFechas(ArrayDay);
      const ArrayCount = array.map((item) => item.count);
      ArrayCount.unshift(parseInt(totalAsistence));
      setCantidad(ArrayCount);
      setExcel(array);
    }
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const getDatosLista = (data) => {
    let exportData = [];
    data.forEach((l) => {
      let object = {
        DIA: l.day,
        ASISTIERON: l.count,
        TOTAL: l.total,
      };
      exportData.push(object);
    });
    return exportData;
  };

  //convertir a excel y descargar
  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(getDatosLista(excel));
    const wb = {
      Sheets: { Listado_Mensual: ws },
      SheetNames: ["Listado_Mensual"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = `${nombre}-${mes}`;
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  //imprimir PDF obra en general
  const printDocument = () => {
    const input = document.getElementById("graphdiv");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      //   var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      //   var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      //   let y = 500;
      var position = 0;
      //   var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save(`${nombre}-${mes}`);
    });
  };

  // console.log(cantidad);
  console.log(fechas);

  React.useEffect(() => {
    obtenerDatosGeneral();
    obtenerFechasyCantidad();
  }, []);

  return (
    <div>
      {excel && excel.length > 0 && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "auto",
            padding: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button onClick={exportToCSV} color="primary" variant="outlined">
            DESCARGAR EXCEL
          </Button>
          <Button onClick={printDocument} color="primary" variant="outlined">
            DESCARGAR PDF
          </Button>
        </div>
      )}

      <div
        id="graphdiv"
        style={{ maxWidth: "1400px", margin: "auto", padding: "20px" }}
      >
        <h1 style={{ textAlign: "center" }}>Obra: {nombre}</h1>
        <h2 style={{ textAlign: "center" }}>Mes: {mes}</h2>
        <br></br>
        <Bar
          height={400}
          width={900}
          data={{
            labels: fechas,
            datasets: [
              {
                data: cantidad,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(200, 162, 235, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(223, 53, 215, 0.2)",
                  "rgba(240, 173, 235, 0.2)",
                  "rgba(240,248,255, 0.2)",
                  "rgba(127,255,212, 0.2)",
                  "rgba(0,0,0, 0.2)",
                  "rgba(138,43,226, 0.2)",
                  "rgba(127,255,0, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255,248,220, 0.2)",
                  "rgba(0,255,255, 0.2)",
                  "rgba(0,139,139, 0.2)",
                  "rgba(0,100,0, 0.2)",
                  "rgba(169,169,169, 0.2)",
                  "rgba(85,107,47, 0.2)",
                  "rgba(148,0,211, 0.2)",
                  "rgba(220,220,220, 0.2)",
                  "rgba(128,128,128, 0.2)",
                  "rgba(25,25,112, 0.2)",
                  "rgba(255,228,225, 0.2)",
                  "rgba(128,128,0, 0.2)",
                  "rgba(188,143,143, 0.2)",
                  "rgba(0,128,128, 0.2)",
                  "rgba(255,255,255, 0.2)",
                  "rgba(245,245,245, 0.2)",
                  "rgba(255,255,0, 0.2)",
                  "rgba(154,205,50, 0.2)",
                  "rgba(135,206,235, 0.2)",
                  "rgba(244,164,96, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132,1)",
                  "rgba(200, 162, 235,1)",
                  "rgba(54, 162, 235,1)",
                  "rgba(223, 53, 215,1)",
                  "rgba(240, 173, 235,1)",
                  "rgba(240,248,255,1)",
                  "rgba(127,255,212,1)",
                  "rgba(0,0,0,1)",
                  "rgba(138,43,226,1)",
                  "rgba(127,255,0,1)",
                  "rgba(54, 162, 235,1)",
                  "rgba(255,248,220,1)",
                  "rgba(0,255,255,1)",
                  "rgba(0,139,139, 0.2)",
                  "rgba(0,100,0,1)",
                  "rgba(169,169,169,1)",
                  "rgba(85,107,47,1)",
                  "rgba(148,0,211,1)",
                  "rgba(220,220,220,1)",
                  "rgba(128,128,128,1)",
                  "rgba(25,25,112,1)",
                  "rgba(255,228,225,1)",
                  "rgba(128,128,0,1)",
                  "rgba(188,143,143,1)",
                  "rgba(0,128,128,1)",
                  "rgba(255,255,255,1)",
                  "rgba(245,245,245,1)",
                  "rgba(255,255,0,1)",
                  "rgba(154,205,50,1)",
                  "rgba(135,206,235,1)",
                  "rgba(244,164,96,1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default ObraMensual;
