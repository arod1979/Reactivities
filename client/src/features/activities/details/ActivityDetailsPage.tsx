import { Grid,  Typography } from "@mui/material"
import { useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailHeader from "./ActivityDetailsHeader";
import ActivityDetailInfo from "./ActivityDetailsInfo";
import ActivityDetailChat from "./ActivityDetailsChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

type Props = {
  activity:Activity
}


export default function ActivityDetailsPage() {

  const {id} = useParams();
  console.log('id from params:', id);
  const {activity,isLoadingActivity} = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>
  if (!activity) return <Typography>Activity Not Found...</Typography>
  
  return (
    <Grid container spacing={3}>
        <Grid size={8}>
            <ActivityDetailHeader activity={activity} />
            <ActivityDetailInfo activity={activity}/>
            <ActivityDetailChat />
        </Grid>
        <Grid size={4}>
            <ActivityDetailSidebar />
        </Grid>
    </Grid>
    
  )
}