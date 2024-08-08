import axios from 'axios';
import { useEffect, useState } from 'react';

const RecruitDB_api = () => {
  const [generalData, setGeneralData] = useState([]); // 일반부원 데이터 상태
  const [devData, setDevData] = useState([]); // 개발부원 데이터 상태
  const [portfolioTitles, setPrtfolioTitles] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 일반부원 데이터 요청
        const generalResponse = await axios.get('http://localhost:3001/data/joinquipu_general', {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://uos-quipu.vercel.app',
          },
        });
        setGeneralData(generalResponse.data); // 일반부원 데이터 설정

        // 개발부원 데이터 요청
        const devResponse = await axios.get('http://localhost:3001/data2', {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://uos-quipu.vercel.app',
          },
        });
        setDevData(devResponse.data); // 개발부원 데이터 설정
        
        const portfolios = devResponse.data.map(student => ({
            title: student.portolioTitle,
            pdfUrl: student.portfolioUrl
        }));
        setPrtfolioTitles(portfolios);
    
    } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePortfolioClick = (pdfUrl) => {
    setSelectedPortfolio(pdfUrl);
  }
  return { generalData, devData, portfolioTitles, selectedPortfolio, loading, error };
};

export default RecruitDB_api;