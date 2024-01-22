import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const NotFound = () => {

 
    return (<>

       <div>
        <p>ERROR</p>
       <h4>page not found!!!!:(</h4>
       </div>
      <Link to="/"style={{textDecoration:"none",color:"#61dafb"}}>
      <Button variant="outlined" > ➡️ לחזרה</Button>
      </Link>
    </>)
}
export default NotFound;
//  https://static.wixstatic.com/media/91dd81_b8ca68b816cc4d0986ed633aa1d2a060~mv2_d_2650_1767_s_2.jpg/v1/fill/w_217,h_170,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/91dd81_b8ca68b816cc4d0986ed633aa1d2a060~mv2_d_2650_1767_s_2.jpg