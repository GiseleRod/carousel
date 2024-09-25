import axios from 'axios';
import { useEffect, useState } from 'react';

const ImagenesApi=()=>{
    const[imagenes, setImagenes]=useState([]);

    useEffect(()=>{
        axios.get("https://picsum.photos/v2/list").then((resp)=>{
            console.log(resp.data);
            setImagenes(resp.data)
        })
    },[])

    return(
        <>
            <div className='imagenes'>
                {imagenes.map((data,i)=>{
                    return (
                        <div key={i}>
                            <h2>{data.url}</h2>
                            <img src={data.download_url} alt={data.author} height="200px"/>
                        </div>
                    )
                })}
            </div>
            
        </>
    )
}
export default ImagenesApi