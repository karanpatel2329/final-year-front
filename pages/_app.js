
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/studentLogin.css'
import '../styles/globals.css';
import Sidebar from '../mycomponents/teacher/sidebar';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import { RouterSharp } from '@mui/icons-material';

const LayoutWrapper=({path,props,Component})=>{
  console.log("HERE");
 
    let Layout=() => <></>;
    if(path.startsWith('/teacher/signup')){
      return <Component {...props}/>
    }
    if(path.startsWith('/teacher/')){
      return <><Sidebar/> <Component {...props} /></>;
    }
    else{
      return <Component {...props} />
    }
}

function MyApp({ Component, pageProps, router }) {
  const routers = useRouter()
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    var token = localStorage.getItem('token');
    var role = localStorage.getItem('role');
    console.log(token,role);
    if(router.pathname== '/teacher/signup'||router.pathname =='/signup' ||router.pathname=='/'||router.pathname=='/teacher'){
      console.log("IT WORKIG LOGIN OR SIGN UP")
      setLoading(false);
    }else{
    if(router.pathname.startsWith('/teacher/')||router.pathname.startsWith('/student/')){
      if(token==null||role==null){
        console.log('Ite WOKING');
        setLoading(false)
        routers.replace('/');
      }
    }}
    },[]);
  
  return loading?<></>:<LayoutWrapper path={router.pathname} props={ {...pageProps}} Component={Component}>
   
  </LayoutWrapper>
}

export default MyApp
