import style from "./Block.module.css";
import Image from 'next/image';
import Abc from '../../../assets/school.png';
import Link from "next/link";
function Block(props){
    const imgStyle={
        backgroundImage: "url("+props.image.src+")",
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    width: 'auto',
    height: '30vh',
    borderRadius:'12px'
    }
    function clickHandle(event){
       
      
        console.log(props.targetLink);
        console.log(props.text+"Clicked");
    };
    return(
        <div className={style.main}>
            <div  className={style.BlockImage} style={imgStyle}  >
                
            </div>
            <div className={style.BlockButton}>
            <Link href={"/"+props.targetLink} >
                <button type="button" onClick={clickHandle}>
                    {props.text}
                </button>
                </Link>
            </div>
        </div>
    );
};
export default Block;