
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/studentLogin.css'
import '../styles/globals.css';
import Sidebar from '../mycomponents/teacher/sidebar';
import StudentSidebar  from '../mycomponents/student/student_sidebar';
const LayoutWrapper=({path,props,Component})=>{
  console.log("HERE");
    let Layout=() => <></>;
    if(path.startsWith('/teacher/signup')){
      return <Component {...props}/>
    }
    if(path.startsWith('/teacher/')){
      return <><Sidebar/> <Component {...props} /></>;
      console.log("HERE CHange");
    }
    if(path.startsWith('/student/')){
      return <><StudentSidebar/> <Component {...props} /></>;
      console.log("HERE CHange");
    }
    else{
      return <Component {...props} />
    }
}
function MyApp({ Component, pageProps, router }) {
 
  return <LayoutWrapper path={router.pathname} props={ {...pageProps}} Component={Component}>
   
  </LayoutWrapper>
}

export default MyApp
