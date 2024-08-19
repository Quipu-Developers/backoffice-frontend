import axios from 'axios';
import { useEffect, useState } from 'react';

const RecruitDB_api = () => {
  const [generalData, setGeneralData] = useState([]); // 일반부원 데이터 상태
  const [devData, setDevData] = useState([]); // 개발부원 데이터 상태
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 일반부원 데이터 요청
        const generalResponse = await axios.get('http://localhost:3001/bo/data/joinquipu_general', {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:3000',
          },
          withCredentials: true,
        });
        setGeneralData(generalResponse.data); // 일반부원 데이터 설정

        // 개발부원 데이터 요청
        const devResponse = await axios.get('http://localhost:3001/bo/data/joinquipu_dev', {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:3000',
          },
        });
        setDevData(devResponse.data); // 개발부원 데이터 설정
        
        const portfolios = await axios.get('http://localhost:3001/data/joinquipu_dev_file', {
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:3000',
          },
        });
        setSelectedPortfolio(portfolios);
    
    } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { generalData, devData, selectedPortfolio, loading, error };
};

export default RecruitDB_api;