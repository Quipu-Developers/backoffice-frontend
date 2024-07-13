import dummydata_normal from "../dummy/dummy_normal.json";
import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import "../style/dbpage.css";

//엑셀 파일로 내보내기
function ExcelExporter() {
  const [fileName, setFileName] = useState('퀴푸 지원 명단.xlsx');

  const exportToExcel = () => {
    const newFileName = window.prompt("저장할 파일명을 입력하세요.", fileName);
    if (newFileName) {
      setFileName(newFileName);
      const worksheet = XLSX.utils.json_to_sheet(dummydata_normal);
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
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  //전화번호 셀 클릭 시 클립보드에 복사
  const handlePhoneNumberClick = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      alert('전화번호가 클립보드에 복사되었습니다.');
    }).catch(err => {
      console.error('클립보드 복사를 실패하였습니다.: ', err);
    });
  };

  //이름 셀 클릭 시 모달창 구현
  const handleNameClick = (student) => {
    setSelectedStudent(student);
    setCurrentIndex(dummydata_normal.findIndex((s) => s.이름 === student.이름));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextStudent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dummydata_normal.length);
    setSelectedStudent(dummydata_normal[(currentIndex + 1) % dummydata_normal.length]);
  };
  
  const prevStudent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + dummydata_normal.length) % dummydata_normal.length);
    setSelectedStudent(dummydata_normal[(currentIndex - 1 + dummydata_normal.length) % dummydata_normal.length]);
  };

  //키보드 상 Arrow 버튼 기능 구현
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showModal) {
        if (event.key === 'ArrowLeft') {
          prevStudent();
        }
        else if(event.key === 'ArrowRight') {
          nextStudent();
        }
        else if(event.keyCode === 27) {
          closeModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, currentIndex, nextStudent, prevStudent]);

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
              {dummydata_normal.map((student, index) => (
                <tr key={index}>
                  <td>{parseInt(student.번호)}</td>
                  <td className="name" onClick={() => handleNameClick(student)}>
                    {student.이름}
                  </td>
                  <td>{student.학번}</td>
                  <td>{student.학과}</td>
                  <td
                    className="phonenumber"
                    onClick={() => handlePhoneNumberClick(student.전화번호)}
                  >
                    {student.전화번호}
                  </td>
                  <td>{student.시간}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="closebutton" onClick={closeModal}>
              x
            </span>
            <h2>{selectedStudent.이름}</h2>
            <p>번호: {selectedStudent.번호}</p>
            <p>학번: {selectedStudent.학번}</p>
            <p>학과: {selectedStudent.학과}</p>
            <p>전화번호: {selectedStudent.전화번호}</p>
            <p>지원동기: {selectedStudent.지원동기}</p>
            <p>시간: {selectedStudent.시간}</p>
            {/* <div className="prevnextbutton">
              <span className="prev-button" onClick={prevStudent}>🠸</span>
              <span className="next-button" onClick={nextStudent}>🠺</span>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dbpage;
