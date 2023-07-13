import Modal from 'react-modal';
import axios from 'axios'
import React, { useState, useEffect } from 'react';

const AppTestModal = (props) => {
  const [osselected, setOsSelected] = useState('*');
  const [verselected, setVerSelected] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serresult, setSerResult] = useState('')
  const [submit, setSubmit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const RecentVersion = async () => {
      try {
        const response = await axios.post('http://ec2-54-180-37-118.ap-northeast-2.compute.amazonaws.com:8080/vercontrol/updatecheck'
          , { "osInfo": osselected, "serviceName": serviceName, "serviceVersion": verselected }, { headers: { 'Content-Type': 'application/json' } });
        setSerResult(response.data)
        console.log(response)
        setSubmit(false)
      } catch (e) {
        console.log(e)
      }
    };
    RecentVersion();
  }, [submit]);

  return (
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
              <input type="text" onChange={(e) => {
                setOsSelected(e.target.value)
                console.log(e.target.value)
              }
              }></input>
            </div>
            <div>
              <p>Client ver</p>
              <input type="text" onChange={(e) => {
                setVerSelected(e.target.value)
                console.log(e.target.value)
              }}></input>
              <p>Service Name</p>
              <input type="text" onChange={(e) => {
                setServiceName(e.target.value)
                console.log(e.target.value)
              }}></input>
              <button onClick={() => { setSubmit(true) }}>전송</button>
            </div>
          </div>
          <div>
            <p>Server Result</p>
            <div id="result">
              {serresult}
            </div>
            <button onClick={() => {
              return (
                setSerResult(''),
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
