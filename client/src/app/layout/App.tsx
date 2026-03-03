
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { useState } from 'react';

import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/Dashbaord/ActivityDashboard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

  function App() {
    //const [activities,setActivities] = useState<Activity[]>([]);
    const [selectedActivity,setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode,setEditMode] = useState(false);
    const {data: activities, isPending} = useQuery({
      queryKey: ['activities'],
      queryFn: async () => {
        const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
        return response.data
      }
    })
   

  
    const handleSelectActivity = (id:string) => {
      setSelectedActivity(activities!.find(x => x.id === id));
    }

    const handleCancelSelectActivity = () => {
      setSelectedActivity(undefined);
    }
    
    const handleOpenForm = (id?:string) => {
      if (id) handleSelectActivity(id);
      else handleCancelSelectActivity();
      setEditMode(true);
    }

    const handleFormClose = () => {
      setEditMode(false);
    }





    return (
      <Box sx={{bgcolor:'#eeeeee', minHeight: '100vh'}}>
          <CssBaseline />
          <Navbar openForm={handleOpenForm} />
          <Container maxWidth='xl' sx={{mt:3}}>
              {!activities || isPending ? (
                <Typography>Loading..</Typography>
              ): (
              <ActivityDashboard 
              activities={activities} 
              selectActivity={handleSelectActivity}
              cancelSelectActivity = {handleCancelSelectActivity}
              selectedActivity = {selectedActivity} 
              editMode={editMode}
              openForm={handleOpenForm}
              closeForm={handleFormClose}
            
              
              
              /> )}
              
          </Container>
          
      </Box>
      
    )
}

export default App
