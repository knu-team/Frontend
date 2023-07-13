import { useRef,useState, useEffect } from 'react';
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
        console.log(page)
        const response = await axios.get(`http://ec2-54-180-37-118.ap-northeast-2.compute.amazonaws.com:8080/vercontrol/getconfigall?pageNumber=${page}&pageSize=${pageSize}`);
        setVersion(response.data);
        console.log(version)
      } catch (e) {
        console.log(e)
      }
    };
    fetchData()
  }, [page]);

  function versionList() {
    let arr = [];

    console.log(version)
    for (let i = 0; i < version.length; i++) {

      arr.push(
        <tr>
          <td>{i + 1 + page*pageSize}</td>
          <td>{version[i].osInfo}</td>
          <td>{version[i].serviceName}</td>
          <td>{version[i].serviceVersion}</td>
          <td>{version[i].updateType.toString()}</td>
          <td>{version[i].message}</td>
          <td>{version[i].packageInfo}</td>
          <td>{version[i].regTime}</td>
          <td>
            <div className='actionBtns'>
              <VersionTest result={[version[i].osInfo, version[i].serviceName, version[i].serviceVersion]} />
              <VersionUpdate version={version[i]} />
              <VersionDelete verId={version[i].id} />
            </div>

          </td>
        </tr>
      )
    }
    return arr;
  };
  
  const handlePage = (e) => {
    if (e.target.value === "next") {
      setPage((page) => page+1);
      console.log(`페이지넘버는 ${page}`)
    } else if(e.target.value === "before" && page > 0) {
      setPage((page) => page - 1)
      console.log(`페이지넘버는 ${page}`)
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
            {/* {console.log(version)} */}
            {versionList()}
          </tbody>
        </table>
      </div>
      <div className="pageControlers">
        <button className='beforePage' value="before" onClick={handlePage}>이전 페이지</button>
        <button className='nextPage' value="next" onClick={handlePage}>다음 페이지</button>
      </div>
    </div>

  );
}

export default VersionBoard