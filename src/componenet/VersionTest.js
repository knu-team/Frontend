import { useState, useEffect } from 'react';
import axios from 'axios'
import Modal from 'react-modal';

const VersionTest = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [result, setResult] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (submit === true) {
            (async () => {
                try {
                    const response = await axios.post(
                        'http://ec2-54-180-37-118.ap-northeast-2.compute.amazonaws.com:8080/vercontrol/getrecentversion'
                        , {
                            "osInfo": info[0]
                            , "serviceName": info[1]
                            , "serviceVersion": info[2]
                        }, { headers: { 'Content-Type': 'application/json' } });
                    setResult(response.data)
                    console.log(response.data)
                    setSubmit(false)
                } catch (e) {
                    console.log(e)
                }
            })();
        }
    }, [submit]);

    return (
        <div>
            <button className='testBtn' onClick={() => (setSubmit(true), setModalIsOpen(true), setInfo(props.result))}>테스트</button>
            <div className='testModal'>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    ariaHideApp={false}>
                    <div>
                        <p>Recent Version</p>
                        <div className='testResult'>  
                            <p className='resulttext'>
                               {JSON.stringify(result)} 
                            </p>
                        </div>
                        <button className='resultcheckBtn' onClick={() => (setModalIsOpen(false))} >확인</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default VersionTest 