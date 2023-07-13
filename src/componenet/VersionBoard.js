import { useState, useEffect } from 'react';
import axios from 'axios'
import VersionDelete from './VersionDelete.js'
import VersionUpdate from './VersionUpdate.js'
import VersionTest from './VersionTest.js'

const VersionBoard = () => {
  const [version, setVersion] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://ec2-54-180-37-118.ap-northeast-2.compute.amazonaws.com:8080/vercontrol/getconfigall?pageNumber=${page}&pageSize=${pageSize}`);
        setVersion(response.data);
      } catch (e) {
        console.log(e)
      }
    };
    fetchData();
  }, [page]);

  function versionList(data) {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
      arr.push(
        <tr>
          <td>{i + 1 + page*pageSize}</td>
          <td>{data[i].osInfo}</td>
          <td>{data[i].serviceName}</td>
          <td>{data[i].serviceVersion}</td>
          <td>{data[i].updateType.toString()}</td>
          <td>{data[i].message}</td>
          <td>{data[i].packageInfo}</td>
          <td>{data[i].regTime}</td>
          <td>
            <div className='actionBtns'>
              <VersionTest result={[data[i].osInfo, data[i].serviceName, data[i].serviceVersion]} />
              <VersionUpdate version={data[i]} />
              <VersionDelete verId={data[i].id} />
            </div>

          </td>
        </tr>
      )
    }
    return arr;
  };

  const handlePage = (e) => {
    if (e.target.value === "next" && version.length === 10) {
      setPage(page + 1);
    } else if(e.target.value === "before" && page > 0) {
      setPage(page - 1)
    }
  }

  return (
    <div>
      <div className="board">
        <table className='table_board'>
          <thead className='table_thead'>
            <tr className='table_category'>
              <th >idx</th>
              <th >os</th>
              <th >service</th>
              <th >version</th>
              <th >updatetype</th>
              <th >message</th>
              <th >package</th>
              <th >regdate</th>
              <th >action</th>
            </tr>
          </thead>
          <tbody>
            {versionList(version)}
          </tbody>
        </table>
      </div>
      <div className="pageControlers">
        <button className='beforePage' value="before" onClick={handlePage}>이전페이지</button>
        <button className='nextPage' value="next" onClick={handlePage}>다음페이지</button>
      </div>
    </div>

  );
}

export default VersionBoard