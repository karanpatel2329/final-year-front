import style from "./eventCard.module.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const eventCard=(props)=>
{
    const newdate=props.date.split("GMT")[0];
    return (
        <div className={style.main}>
        <Card sx={{ maxWidth: "98%"}}>
            <CardActionArea>
                <CardContent>
                    <div className={style.topHeading}>
                    <Typography  varient="h1" className={style.root}>
                       {props.name}
                    </Typography>
                    
                    <Typography  variant="subtitle1" justifyContent="right ">
                        {newdate}
                    </Typography>
                    </div>
                    <Typography variant="body1" color="text.primary">
                       {props.short}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {props.long}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
        </Card>
        </div>
      );

};
export default eventCard;