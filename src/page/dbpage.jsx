import dummydata from "../dummy/dummy.json";
import * as XLSX from 'xlsx';
import React from 'react';
import "../style/dbpage.css";
// import fs from 'fs';

function ExcelExporter() {
  const exportToExcel = ()  => {
    const filename = '퀴푸 지원 명단.xlsx'
    const worksheet = XLSX.utils.json_to_sheet(dummydata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, '퀴푸 지원 명단.xlsx');

    // if (fs.existsSync(filename)) {
    //   const existingWorkbook = XLSX.readFile(filename);
    //   XLSX.utils.book_append_sheet(existingWorkbook, worksheet, 'Sheet1');
    //   XLSX.writeFile(existingWorkbook, filename);
    // }
    // else {
    //   XLSX.writeFile(workbook, filename);
    // }
  };

  return (
    <div>
      <button onClick = {exportToExcel}>엑셀 파일로 내보내기</button>
    </div>
  )
}

export default function Dbpage() {
  return (
    <div className="db-container">
      <div className="db-logo">Quipu</div>
      <div className="bottombox">
        <div className="buttonlist">
          <button>불러오기</button>
          <ExcelExporter />
        </div>

        <div className="dbbox">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>학번</th>
                <th>학과</th>
                <th>전화번호</th>
                <th>지원동기</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody>
              {dummydata.map((student, index) => (
                <tr key={index}>
                  <td>{parseInt(student.번호)}</td>
                  <td>{student.이름}</td>
                  <td>{student.학번}</td>
                  <td>{student.학과}</td>
                  <td>{student.전화번호}</td>
                  <td>{student.지원동기}</td>
                  <td>{student.시간}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
