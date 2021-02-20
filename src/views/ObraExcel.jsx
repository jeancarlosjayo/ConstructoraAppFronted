import React from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { fechaDehoy, fechaTimeStamp } from "../helpers/Fechas";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Bar } from "react-chartjs-2";
import { Button, Grid } from "@material-ui/core";
import { empresasContext } from "../context/empresasContext";

const ObraExcel = () => {
  let { id } = useParams();

  const obra = id.split("-");
  //   console.log(obra);

  const [total, setTotal] = React.useState(0);
  const [asistieron, setAsistieron] = React.useState(0);
  const [nombre, setNombre] = React.useState("");
  const [fecha, setFecha] = React.useState(
    fechaTimeStamp(new Date(parseInt(obra[1]) * 1000))
  );
  const [arrayExcel, setArrayExcel] = React.useState([]);

  //Obtener datos solo para obreros de la obra en general , NOMBRE EMPRESA Y ASISTENCIA TOTAL
  const obtenerDatosGeneral = () => {
    firebase
      .database()
      .ref("/obras/" + obra[0])
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          const data = snapshot.val();
          //   console.log(data);
          setTotal(data.buildersnum);
          setNombre(data.name);
        } else {
          console.log("error");
          return null;
        }
      });
  };

  //obtener data de los que asistieron  y la cantidad de obreros que asistieron
  const obtenerDataAsistenciaGeneral = () => {
    firebase
      .database()
      .ref("/obras/" + obra[0])
      .child("asistencia")
      .child(obra[1])
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const arrayExcel = getDatosLista(Object.values(data));
          setArrayExcel(getDatosLista(Object.values(data)));
          setAsistieron(arrayExcel.length);
        } else {
          return null;
        }
      });
  };

  //Context que trae las empresas guardadas , empieza en []
  const { empresaArray, dispatchEmpresa } = React.useContext(empresasContext);

  //obtener empresas
  const obtenerDataPorEmpresas = () => {
    //Primero evaualos si la obra tiene emppresas , campo enterprises
    firebase
      .database()
      .ref("/obras/" + obra[0])
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          const data = snapshot.val().enterprises;
          //Si tiene recorremos la data
          if (data) {
            for (const item of Object.values(data)) {
              //Asigamos los valores a un objeto
              let objtEmpresa = {};
              const nameEnterprises = item.enterprise;
              const numberTotal = item.numbuilders;
              objtEmpresa.name = nameEnterprises;
              objtEmpresa.total = numberTotal;
              //   console.log(objtEmpresa);
              //Vamos a contar cuantos asistieron
              firebase
                .database()
                .ref("/obras/" + obra[0])
                .child("asistencia")
                .child(obra[1])
                .once("value", function (snapshot) {
                  if (snapshot.exists()) {
                    //Se crea el contador
                    let countAsistencia = 0;
                    const dataAsistencia = snapshot.val();
                    //si existe el campo asistencia  recorremos la data
                    if (dataAsistencia) {
                      for (const item of Object.values(dataAsistencia)) {
                        // si el campo enterprise del obrero coincide con el nombre de la obra se suma
                        if (nameEnterprises === item.enterprise) {
                          countAsistencia = countAsistencia + 1;
                        }
                      }
                      //agregamos el contador al objeto
                      objtEmpresa.count = countAsistencia;
                      //   console.log(objtEmpresa);
                      //Evaluamos para que no se repita las empresas en el Array del context
                      const exist = empresaArray.empresas.some(
                        (item) => item.name === objtEmpresa.name
                      );
                      console.log(exist);
                      //Si no se repite realizamos el llenado de la empresas al Array de empresas
                      if (!exist) {
                        dispatchEmpresa({
                          type: "añadir",
                          payload: objtEmpresa,
                        });
                      }
                    }
                  }
                });
            }
          }
        } else {
          console.log("error");
          return null;
        }
      });
  };

  // convertir array en excel
  const getDatosLista = (data) => {
    let exportData = [];
    data.forEach((l) => {
      let object = {
        NOMBRE: l.names,
        DNI: l.dni,
        "HORA DE INGRESO": l.timeenter === "" ? "SIN ASIGNAR " : l.timeenter,
        "HORA DE SALIDA": l.timeexit === "" ? "SIN ASGINAR" : l.timeexit,
        CATEGORIA: l.category === "" ? "SIN ASGINAR" : l.category,
        OCUPACION: l.charge === "" ? "SIN ASGINAR" : l.charge,
        PLANILLA: l.payroll === "" ? "SIN ASGINAR" : l.payroll,
        "FECHA DE NACIMIENTO": l.dayborn === "" ? "SIN ASGINAR" : l.dayborn,
        "FECHA DE VENCIMIENTO DE DNI":
          l.expirationdatedni === "" ? "SIN ASGINAR" : l.expirationdatedni,
        EMPRESA: l.enterprise === "" ? "SIN ASGINAR" : l.enterprise,
        RUC: l.enterpriseruc === "" ? "SIN ASGINAR" : l.enterpriseruc,
      };
      exportData.push(object);
    });
    //ordernar alfabeticamente
    exportData.sort(function (a, b) {
      if (a.NOMBRE > b.NOMBRE) {
        return 1;
      }
      if (a.NOMBRE < b.NOMBRE) {
        return -1;
      }
      return 0;
    });
    return exportData;
  };

  const getDatosListaEmpresa = (data) => {
    let exportData = [];
    if (data !== []) {
      data.forEach((l) => {
        let object = {
          EMPRESA: l.name,
          ASISTIERON: l.count,
          FALTARON: parseInt(l.total) - l.count,
          TOTAL: parseInt(l.total),
        };
        exportData.push(object);
      });
    }
    return exportData;
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  //convertir a excel y descargar
  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(arrayExcel);
    const we = XLSX.utils.json_to_sheet(
      getDatosListaEmpresa(empresaArray.empresas)
    );
    const wb = {
      Sheets: { Listado_General: ws, Listado_Empresas: we },
      SheetNames: ["Listado_General", "Listado_Empresas"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = `${nombre}-${fecha}`;
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
      const pdf = new jsPDF("p", "mm", "a4");
      //   let y = 500;
      var position = 0;
      //   var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save(`${nombre}-${fecha}`);
    });
  };

  //Imprimir pdf por empresas
  const printDocumentEnterprises = () => {
    const input = document.getElementById("graphenterprises");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      //   var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      //   var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      //   var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save(`${nombre}Empresas-${fecha}`);
    });
  };

  //Imprimiendo pdf
  const printPDF = () => {
    printDocument();
    printDocumentEnterprises();
  };

  React.useEffect(() => {
    obtenerDatosGeneral();
    obtenerDataPorEmpresas();
  }, []);

  React.useEffect(() => {
    if ((nombre !== "") & (total !== 0)) {
      obtenerDataAsistenciaGeneral();
    }
  }, [nombre, total]);

  return (
    <>
      {arrayExcel !== [] && (
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
          <Button onClick={printPDF} color="primary" variant="outlined">
            DESCARGAR PDF
          </Button>
        </div>
      )}
      <div
        id="graphdiv"
        style={{ maxWidth: "1400px", margin: "auto", padding: "20px" }}
      >
        <h1 style={{ textAlign: "center" }}>Obra: {nombre}</h1>
        <h2 style={{ textAlign: "center" }}>Fecha: {fecha}</h2>
        <br></br>
        <Bar
          height={400}
          width={900}
          data={{
            labels: ["Asistieron", "Se esperaba"],
            datasets: [
              {
                data: [asistieron, total, 1, 5],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                background: "rgba(255, 99, 132, 0.2)",
                border: "1px solid rgba(255, 99, 132, 1)",
                height: "20px",
                width: "40px",
                marginRight: 5,
              }}
            ></div>
            <h3>ASISTIERON : {asistieron} Personas</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                background: "rgba(54, 162, 235, 0.2)",
                border: "1px solid rgba(54, 162, 235, 1)",
                height: "20px",
                width: "40px",
                marginRight: 5,
              }}
            ></div>
            <h3>SE ESPERABA : {total} Personas</h3>
          </div>
        </div>
      </div>
      <div id="graphenterprises">
        <br></br>
        <br></br>
        <h1 style={{ textAlign: "center" }}>Obra: {nombre}</h1>
        <h2 style={{ textAlign: "center" }}>Fecha: {fecha}</h2>
        <br></br>

        <Grid container>
          {empresaArray.empresas === [] && (
            <h1>Esta obra no tiene empresas asignadas</h1>
          )}
          {empresaArray.empresas !== [] &&
            empresaArray.empresas.map((item) => {
              return (
                <Grid item md={6}>
                  <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                  <Bar
                    height={400}
                    width={900}
                    data={{
                      labels: ["Asistieron", "Faltaron", "Total"],
                      datasets: [
                        {
                          data: [
                            item.count,
                            parseInt(item.total) - item.count,
                            parseInt(item.total),
                            1,
                            5,
                            20,
                          ],
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(200, 162, 235, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                          ],
                          borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(200, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
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
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          background: "rgba(255, 99, 132, 0.2)",
                          border: "1px solid rgba(255, 99, 132, 1)",
                          height: "20px",
                          width: "40px",
                          marginRight: 5,
                        }}
                      ></div>
                      <h3>ASISTIERON : {item.count} Personas</h3>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          background: "rgba(200, 162, 235, 0.2)",
                          border: "1px solid rgba(200, 162, 235, 1)",
                          height: "20px",
                          width: "40px",
                          marginRight: 5,
                        }}
                      ></div>
                      <h3>
                        FALTARON : {parseInt(item.total) - item.count} Personas
                      </h3>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          background: "rgba(54, 162, 235, 0.2)",
                          border: "1px solid rgba(54, 162, 235, 1)",
                          height: "20px",
                          width: "40px",
                          marginRight: 5,
                        }}
                      ></div>
                      <h3>SE ESPERABA : {parseInt(item.total)} Personas</h3>
                    </div>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </>
  );
};

export default ObraExcel;
