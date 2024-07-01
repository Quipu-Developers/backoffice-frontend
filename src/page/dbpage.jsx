import dummydata from "../dummy/dummy.json";
import "../style/dbpage.css";

export default function Dbpage() {
  return (
    <div className="db-container">
      <div className="db-logo">Quipu</div>
      <div className="bottombox">
        <div className="buttonlist">
          <button>불러오기</button>
          <button>액셀 파일로 내보내기</button>
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
