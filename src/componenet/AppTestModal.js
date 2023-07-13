import Modal from 'react-modal';
import axios from 'axios'
import React,{useState, useEffect} from 'react';

const AppTestModal = (props) => {
  const [osselected, setOsSelected] = useState('*');
  const [verselected, setVerSelected] = useState('');
  const [serresult, setSerResult] = useState('Client의 버전은?')
  const [submit,setSubmit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const RecentVersion = async () => {
      try {
        const response = await axios.post('http://ec2-54-180-37-118.ap-northeast-2.compute.amazonaws.com:8080/vercontrol/getrecentversion'
        , { "osInfo": osselected , "serviceVersion": verselected}, {headers: {'Content-Type' : 'application/json' }});
        setSerResult(response.data)
        console.log(serresult)
        setSubmit(false)
      } catch (e) {
        // setSubmit(false)
        console.log(e)
      }
    };
    RecentVersion();
  }, [submit]);

  // const handleSelectOption = (e) => {
  //   if(e.target.className === "SelectOs"){
  //     setOsSelected(e.target.value)
  //   } else {
  //     setVerSelected(e.target.value)
  //   }
    
  // };

  return(
    <div>
    <button className='apptestBtn' onClick={() => setModalIsOpen(true)}>App Test</button>
      <div className='ModalBox'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}>
          <div className='Modal_Selects'>
            <div>
              <p>Client os</p>
              {/* <select
                className='SelectOs'
                onChange={handleSelectOption}>
                <option className='SelectOs' value="IOS">IOS</option>
                <option className='SelectOs' value="android">android</option>
              </select> */}
              <input type="text" onChange={(e) => {
                setOsSelected(e.target.value)
                console.log(e.target.value)}
              }></input>
            </div>
            <div>
              <p>Client ver</p>
              {/* <select 
              className='SelectVersion'
              onChange={handleSelectOption}>
                <option className='SelectVersion' value="1.0.0">1.0.0</option>
                <option className='SelectVersion' value="1.5.0">1.5.0</option>
                <option className='SelectVersion' value="2.0.0">2.0.0</option>
              </select> */}
              <input type="text" onChange={(e) => 
                {setVerSelected(e.target.value)
                  console.log(e.target.value)
                }}></input>
              <button onClick={() => {setSubmit(true)}}>전송</button>
            </div>
          </div>
          <div>
            <p>Server Result</p>
            <div id="result">
              {serresult}
            </div>
            <button onClick={() => {
              return (
                setSerResult('Client의 버전은?'),
                setModalIsOpen(false)
                
              )

              }}>확인</button>
          </div>
        </Modal>
      </div>
    </div>
  );

}

export default AppTestModal
