import { Typography, message } from "antd";


export const ellipsisData = (item) => {
 return item?.length > 12 ? (
   <Typography.Text
     style={
       true
         ? {
             width: 100,
           }
         : undefined
     }
     ellipsis={
       true
         ? {
             tooltip: <span className="squad-name">{item}</span>
           }
         : false
     }
   >
     {item}
   </Typography.Text>
 ) : (
   item
 );
};