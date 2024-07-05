import dummydata from "../dummy/dummy.json";
import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import "../style/dbpage.css";

//엑셀 파일로 내보내기
function ExcelExporter() {
  const [fileName, setFileName] = useState('퀴푸 지원 명단.xlsx');

  const exportToExcel = () => {
    const newFileName = window.prompt("저장할 파일명을 입력하세요.", fileName);
    if (newFileName) {
      setFileName(newFileName);
      const worksheet = XLSX.utils.json_to_sheet(dummydata);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, newFileName);
    }
  };

  return (
    <div>
      <button onClick={exportToExcel}>엑셀 파일로 내보내기</button>
    </div>
  )
}

function Dbpage() {
  //전화번호 실 클릭 시 클립보드에 복사
  const handlePhoneNumberClick = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      alert('전화번호가 클립보드에 복사되었습니다.');
    }).catch(err => {
      console.error('클립보드 복사를 실패하였습니다.: ', err);
    });
  };

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
                  <td onClick={() => handlePhoneNumberClick(student.전화번호)}>{student.전화번호}</td>
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

export default Dbpage;
