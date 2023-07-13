import { useState, useEffect } from 'react';
import axios from 'axios'

const VersionDelete = (verId) => {
    const [Isdel, setIsDel] = useState(false);
    const [submit, setSubmit] = useState(false);

    console.log(verId.verId)
    useEffect(() => {
        if(Isdel === true){
        (async () => {
            try {
                const response = await axios.delete(`http://ec2-54-180-37-118.ap-northeast-2.compute.amazonaws.com:8080/vercontrol/versions/${verId.verId}`);
                console.log(response)    
                setIsDel(false)
            } catch (e) {
                // setSubmit(false)
                console.log(e)
            }
        })();}
    }, [submit]);

    const handleDelete = (e) => {
        console.log(e.target.value)
        setSubmit(true);
        if(e.target.value === "false"){
            console.log(e.target.value)
          setIsDel(true);
        }
      }
    return (
        <button className='delBtn' onClick={handleDelete} value={Isdel}>삭제</button>
    )
}

export default VersionDelete 