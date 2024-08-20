import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

const getPdf = async (filename) => {
  console.log(filename);
  try {
    const response = await axios.get(
      `${BASE_URL}/bo/data/joinquipu_dev_file/${filename}`,
      {
        headers: {
          accept: "application/json",
          Origin: FRONTEND_URL,
        },
        responseType: "blob", // 파일 다운로드를 위해 blob 타입으로 받기
        withCredentials: true, // 쿠키를 전송하기 위해 설정
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching PDF:", err);
    throw err; // 오류가 발생하면 호출한 함수로 전달
  }
};

const downloadPdf = (filename, blob) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // 파일 이름 설정
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url); // 메모리 해제
};

export const fetchAndSavePortfolio = async (filename) => {
  console.log("Downloading:", filename);
  const portfolio = await getPdf(filename);
  if (portfolio) {
    downloadPdf(filename, portfolio);
  }
};
