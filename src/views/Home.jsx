import { Typography } from "@material-ui/core";
import React from "react";
import Steppers from "../components/Steppers/Steppers";
import XLSX from "xlsx";
import { toStringDate } from "../helpers/textDate";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const Home = () => {
  const [file, setFile] = React.useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [json, setJSON] = React.useState({});

  const JSON = () => {
    // XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (file) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        console.log(workbook);
        workbook.SheetNames.forEach((sheet) => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          console.log(rowObject);
          setJSON(rowObject);
          //   document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
        });
      };
    }
  };

  console.log(file);

  const cambiarname = () => {
    console.log("sadsad", json);
    let newjson;
    for (const item of json) {
      const fecha = item["FECHA DE NACIMIENTO"]
        ? toStringDate(
            new Date((item["FECHA DE NACIMIENTO"] - (25567 + 1)) * 86400 * 1000)
          )
        : "";
      const fechapuesto = item["FECHA INICIO PUESTO"]
        ? toStringDate(
            new Date((item["FECHA INICIO PUESTO"] - (25567 + 1)) * 86400 * 1000)
          )
        : "";
      const fechacese = item["FECHA DE CESE EN OBRA"]
        ? toStringDate(
            new Date(
              (item["FECHA DE CESE EN OBRA"] - (25567 + 1)) * 86400 * 1000
            )
          )
        : "";
      const dniexce = item["FECHA DE VENCIMIENTO DEL DNI"]
        ? toStringDate(
            new Date(
              (item["FECHA DE VENCIMIENTO DEL DNI"] - (25567 + 1)) *
                86400 *
                1000
            )
          )
        : "";
      const nrodoc = item["DNI"] ? item["DNI"] : "";
      const ruc = item["RUC"] ? item["RUC"] : "";
      console.log(nrodoc);
      newjson = {
        charge: item["OCUPACION"] ? item["OCUPACION"] : "",
        category: item["CATEGORIA"] ? item["CATEGORIA"] : "",
        payroll: item["PLANILLA"] ? item["PLANILLA"] : "",
        // datestart: fechapuesto,
        dayborn: fecha,
        names: item["NOMBRE 2"]
          ? `${item["NOMBRE 1"]} ${item["NOMBRE 2"]}`
          : item["NOMBRE 1"],
        lastnamefirst: item["APELLIDO PATERNO"] ? item["APELLIDO PATERNO"] : "",
        lastnamesecond: item["APELLIDO MATERNO"]
          ? item["APELLIDO MATERNO"]
          : "",
        typedoc: "DNI",
        enterprise: item["EMPRESA"] ? item["EMPRESA"] : "",
        enterpriseruc: item["RUC"] ? item["RUC"].toString() : "",
        nrodoc: nrodoc.toString(),
        buildid: "1613055395",
        datecessationwork: fechacese,
        expirationdatedni: dniexce,
      };
      console.log(newjson);
      firebase
        .database()
        .ref("/obreros/" + nrodoc)
        .set(newjson)
        .then((res) => {
          console.log("res", res);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  };

  console.log("json", json);

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <Typography variant="h3" style={{ margin: "20px" }}>
        Nueva Obra
      </Typography>
      <Steppers></Steppers>
      <input
        type="file"
        id="input"
        accept=".xls,.xlsx"
        onChange={onChange}
      ></input>
      <button onClick={JSON}>JSON</button>
      <button onClick={cambiarname}>ENVIAR</button>
    </div>
  );
};

export default Home;
