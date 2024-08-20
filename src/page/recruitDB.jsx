import * as XLSX from "xlsx";
import React, { useState, useEffect, useCallback } from "react";
import "../style/recruitDB.css";
import Select from "react-select";
import { fetchAndSavePortfolio } from "../api/recruitDB_api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

// 일반부원 데이터 호출 함수
const fetchGeneralData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bo/data/joinquipu_general`, {
      headers: {
        accept: "application/json",
        Origin: FRONTEND_URL,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching general data:", err);
    throw err;
  }
};

// 개발부원 데이터 호출 함수
const fetchDevData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bo/data/joinquipu_dev`, {
      headers: {
        accept: "application/json",
        Origin: FRONTEND_URL,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching dev data:", err);
    throw err;
  }
};

// 엑셀 파일로 내보내기
function ExcelExporter({ buttonText, generalData, devData }) {
  const [fileName, setFileName] = useState("퀴푸 지원 명단.xlsx");

  const exportToExcel = () => {
    const newFileName = window.prompt("저장할 파일명을 입력하세요.", fileName);
    if (newFileName) {
      setFileName(newFileName);

      const generalWorksheet = XLSX.utils.json_to_sheet(generalData);
      const devWorksheet = XLSX.utils.json_to_sheet(devData);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, generalWorksheet, "GeneralData"); // GeneralData 시트 추가
      XLSX.utils.book_append_sheet(workbook, devWorksheet, "DevData"); // DevData 시트 추가

      XLSX.writeFile(workbook, newFileName);
    }
  };

  return (
    <div>
      <button onClick={exportToExcel}>{buttonText}</button>
    </div>
  );
}

function RecruitDB() {
  const [placeholderText, setPlaceholderText] = useState("부원 선택");
  const [buttonText, setButtonText] = useState("엑셀 파일로 내보내기");
  const [norordev, setNorordev] = useState("일반");
  const [generalData, setGeneralData] = useState([]);
  const [devData, setDevData] = useState([]);
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // 클릭된 학생의 인덱스 상태
  const [selectedOption, setSelectedOption] = useState({
    value: "일반",
    label: "일반",
  });

  // 드롭다운 옵션
  const options = [
    { value: "일반", label: "일반" },
    { value: "개발", label: "개발" },
  ];

  // 일반/개발부원 선택 이벤트
  const loadData = async (selectedValue) => {
    try {
      if (selectedValue === "일반") {
        // 일반부원 데이터 불러오기
        const data = await fetchGeneralData();
        setGeneralData(data);
        setData(data);
        setNorordev("일반");
      } else if (selectedValue === "개발") {
        // 개발부원 데이터 불러오기
        const data = await fetchDevData();
        setDevData(data);
        setData(data);
        setNorordev("개발");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleDataChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleLoadDataClick = () => {
    loadData(selectedOption.value); // 선택된 옵션에 따라 데이터 로드
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택한 학생의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 전화번호 셀 클릭 시 클립보드에 복사
  const handlePhoneNumberClick = (phoneNumber) => {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        alert("전화번호가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("클립보드 복사를 실패하였습니다.: ", err);
      });
  };

  // 이름 셀 클릭 시 모달창 구현
  const handleNameClick = (student, index) => {
    setSelectedStudent(student);
    setSelectedIndex(index);
    setCurrentIndex(data.findIndex((s) => s.name === student.name));
    setShowModal(true);
    setActiveIndex(index); // 클릭된 인덱스 저장
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveIndex(null);
  };

  const nextStudent = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setSelectedStudent(data[(currentIndex + 1) % data.length]);
  }, [currentIndex, data]);

  const prevStudent = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    setSelectedStudent(data[(currentIndex - 1 + data.length) % data.length]);
  }, [currentIndex, data]);

  const selectCustom = {
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused ? "#fee32f" : "",
      color: state.isFocused ? "black" : "",
    }),
    control: (provided) => ({
      ...provided,
      width: window.innerWidth <= 768 ? "17vw" : "20vw",
      height: "2rem",
    }),
    menu: (provided) => ({
      ...provided,
      width: window.innerWidth <= 768 ? "17vw" : "25vw",
      height: "4rem",
    }),
  };

  // 키보드 상 Arrow 버튼 기능 구현
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showModal) {
        if (event.key === "ArrowLeft") {
          prevStudent();
        } else if (event.key === "ArrowRight") {
          nextStudent();
        } else if (event.keyCode === 27) {
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, currentIndex, nextStudent, prevStudent]);

  // 화면 크기에 따라 버튼 텍스트 변경
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setButtonText("내보내기");
        setPlaceholderText("부원");
      } else {
        setButtonText("엑셀 파일로 내보내기");
        setPlaceholderText("부원 선택");
      }
    };

    // 초기 실행
    handleResize();

    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);
    return () => {
      // 이벤트 리스너 제거
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const onClickLogout = () => {
    navigate("/");
  };

  return (
    <div className="db-container">
      <div className="db-logo">
        <span> Quipu </span>
        <span className="db-logout" onClick={onClickLogout}>
          {" "}
          logout{" "}
        </span>
      </div>
      <div className="bottombox">
        <div className="buttonlist">
          {/* 일반/개발부원 드롭다운 */}
          <Select
            className="select"
            onChange={handleDataChange}
            options={options}
            placeholder={placeholderText}
            styles={selectCustom}
          />
          <button onClick={handleLoadDataClick}>불러오기</button>
          <ExcelExporter
            buttonText={buttonText}
            generalData={generalData}
            devData={devData}
          />
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
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <tr
                  key={index}
                  className={
                    activeIndex === index ? "table-row.active" : "table-row"
                  }
                >
                  <td>
                    <p>{parseInt(student.id)}</p>
                  </td>
                  <td
                    className="name"
                    onClick={() => handleNameClick(student, index)}
                  >
                    <p>{student.name}</p>
                  </td>
                  <td>
                    <p>{student.student_id}</p>
                  </td>
                  <td>
                    <p>{student.major}</p>
                  </td>
                  <td
                    className="phonenumber"
                    onClick={() => handlePhoneNumberClick(student.phone_number)}
                  >
                    <p>{student.phone_number}</p>
                  </td>
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
            <h2>{selectedStudent.name}</h2>
            <p>번호: {selectedStudent.id}</p>
            <p>학번: {selectedStudent.student_id}</p>
            <p>학과: {selectedStudent.major}</p>
            <p>전화번호: {selectedStudent.phone_number}</p>
            <p>지원동기: {selectedStudent.motivation}</p>
            <div className="prevnextbutton">
              <span className="prev-button" onClick={prevStudent}>
                &#60;
              </span>
              <span className="next-button" onClick={nextStudent}>
                &#62;
              </span>
            </div>
            {norordev === "개발" && selectedIndex !== null && (
              <>
                <p>
                  포트폴리오 PDF:{" "}
                  <span
                    className="pdf-button"
                    onClick={() =>
                      fetchAndSavePortfolio(selectedStudent.portfolio_pdf)
                    }
                  >
                    {selectedStudent.portfolio_pdf}
                  </span>
                </p>
                <p>프로젝트 설명: {selectedStudent.project_description}</p>
                <p>깃허브 프로필 URL: {selectedStudent.github_profile_url}</p>
                <p>깃허브 이메일: {selectedStudent.github_email}</p>
                <p>슬랙 이메일: {selectedStudent.slack_email}</p>
                <p>
                  일반부원 희망 여부: {selectedStudent.willing_general_member}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruitDB;
