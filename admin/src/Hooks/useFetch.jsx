// import { useEffect, useState } from 'react';
// import axios from 'axios';
// const useFetch = (url) => {
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(true);
    


//     //running process fetch data
//     useEffect(()=>{
//         const fetchData = async () =>{
//             try {
//                 const {data:response} = await axios.get(url);
//                 setData(response)
//             } catch (error) {
//                 console.error(error)
//             }
//             setLoading(false)
//         }
//         fetchData();
//     },[]);
//     return {
//         data,
//         loading,
//     }
// }

// export default useFetch
