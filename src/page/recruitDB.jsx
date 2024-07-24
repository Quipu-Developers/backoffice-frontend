import dummydata_normal from "../dummy/dummy_normal.json";
import dummydata_dev from "../dummy/dummy_dev.json";
import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import "../style/recruitDB.css";
import Select from 'react-select';

//엑셀 파일로 내보내기
function ExcelExporter({buttonText}) {

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
      <button onClick={exportToExcel}>{buttonText}</button>
    </div>
  )
}

function RecruitDB() {
  const[buttonText, setButtonText] = useState('엑셀 파일로 내보내기');
  // 일반/개발부원 선택 이벤트
  const[data, setData] = useState(dummydata_normal);
  const handleDataChange=(selectedOption)=>{
    const selectedValue = selectedOption.value;
    if(selectedValue === '일반'){
      setData(dummydata_normal);
    }
    else if(selectedValue === '개발'){
      setData(dummydata_dev);
    }
  };

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
    setCurrentIndex(data.findIndex((s) => s.이름 === student.이름));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextStudent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setSelectedStudent(data[(currentIndex + 1) % data.length]);
  };
  
  const prevStudent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    setSelectedStudent(data[(currentIndex - 1 + data.length) % data.length]);
  };

  // 드롭다운 옵션
  const options = [
    {value: "일반", label: "일반"},
    {value: "개발", label: "개발"},
  ]

  const selectCustom = {
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused ? "#fee32f" : "",
      color: state.isFocused ? "black" : "",
    }),
    control: provided => ({
      ...provided,
      width: '6.5rem',
      height: '2rem',
    }),
    menu: provided => ({
      ...provided,
      width: '6.5rem',
      height: '4rem',
    }),
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

  // 화면 크기에 따라 버튼 텍스트 변경
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setButtonText('내보내기');
      } else {
        setButtonText('엑셀 파일로 내보내기');
      }
    };

    // 초기 실행
    handleResize();

    // 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);
    return () => {
      // 이벤트 리스너 제거
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="db-container">
      <div className="db-logo">Quipu</div>
      <div className="bottombox">
        <div className="buttonlist">
          {/* 일반/개발부원 드롭다운 */}
          <Select className='select' onChange={handleDataChange} options={options} placeholder={"부원 선택"} styles={selectCustom} />
          <button>불러오기</button>
          <ExcelExporter buttonText={buttonText} />
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
              {data.map((student, index) => (
                <tr key={index}>
                  <td><p>{parseInt(student.번호)}</p></td>
                  <td className="name" onClick={() => handleNameClick(student)}>
                    <p>{student.이름}</p>
                  </td>
                  <td><p>{student.학번}</p></td>
                  <td><p>{student.학과}</p></td>
                  <td
                    className="phonenumber"
                    onClick={() => handlePhoneNumberClick(student.전화번호)}
                  ><p>
                    {student.전화번호}
                    </p>
                  </td>
                  <td><p>{student.시간}</p></td>
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

export default RecruitDB;