import { useState, useEffect } from 'react';
import axios from 'axios'
import Modal from 'react-modal';

const VersionUpdate = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [osInfo, setOsInfo] = useState(props.version.osInfo);
    const [serviceVersion, setServiceVersion] = useState(props.version.serviceVersion);
    const [serviceName, setServiceName] = useState(props.version.serviceName);
    const [updateType, setUpdateType] = useState(props.version.updateType);
    const [message, setMessage] = useState(props.version.message);
    const [packageInfo, setPackageInfo] = useState(props.version.packageInfo);
    
    
    console.log(props.version.serviceName)
console.log("ver"+props.version.serviceVersion)
    useEffect(() => {
        if(submit === true){
        (async () => {
            try {
                const response = await axios.put(`http://ec2-54-180-37-118.ap-northeast-2.compute.amazonaws.com:8080/vercontrol/versions/${props.version.id}`
                    , {
                        "osInfo": osInfo,
                        "serviceVersion": serviceVersion,
                        "serviceName": serviceName,
                        "updateType": updateType,
                        "message": message,
                        "packageInfo": packageInfo
                    }, { headers: { 'Content-Type': 'application/json' } });
                setSubmit(false)
            } catch (e) {
                // setSubmit(false)
                console.log(e)
            }
        })();}
    }, [submit]);

    return (
        <div>
        <button className='updateBtn' onClick={() => setModalIsOpen(true)}>수정</button>
        <div className='ModalBox'>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            ariaHideApp={false}>
            <div>
                <div className='AddInputValue'>
                    <input type="text" placeholder='osInfo' defaultValue={osInfo} onChange={(e) => setOsInfo(e.target.value)}></input>
                    <input type="text" placeholder='serviceVersion' defaultValue={serviceVersion} onChange={(e) => setServiceVersion(e.target.value)}></input>
                    <input type="text" placeholder='serviceName' defaultValue={serviceName} onChange={(e) => setServiceName(e.target.value)}></input>
                    <input type="text" placeholder='updateType' defaultValue={updateType} onChange={(e) => setUpdateType(e.target.value)}></input>
                    <input type="text" placeholder='message' defaultValue={message} onChange={(e) => setMessage(e.target.value)}></input>
                    <input type="text" placeholder='packageInfo' defaultValue={packageInfo} onChange={(e) => setPackageInfo(e.target.value)}></input>
                </div>
                <div>
                    <button onClick={() => (setSubmit(true), setModalIsOpen(false))}>확인</button>
                    <button onClick={() => setModalIsOpen(false)}>취소</button>
                </div>
            </div>
        </Modal>
    </div>

        </div>

    )
}

export default VersionUpdate 