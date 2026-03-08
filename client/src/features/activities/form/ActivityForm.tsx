import { Paper, Box, TextField, Typography, Button } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";




export default function ActivityForm() {

    const {id} = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${activity.id}`);
        }
        else {
            await createActivity.mutate(data as unknown as Activity, {
                onSuccess:(id) => {
                    navigate(`/activities/${id}`);
                }
            });
         
        }
    }

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity? 'Edit activity': 'Create activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='title' defaultValue={activity?.title} label='Title' />
                <TextField name='description' defaultValue={activity?.description} label='Description' multiline rows={3} />
                <TextField name='category' defaultValue={activity?.category} label='Category' />
                <TextField
                    name='date'
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] 
                        : new Date().toISOString().split('T')[0]
                    }
                    label='Date'
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField name='city' defaultValue={activity?.city} label='City' />
                <TextField name='venue' defaultValue={activity?.venue} label='Venue' />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={()=>{}} color='inherit'>Cancel</Button>
                    <Button type="submit" color='success' variant="contained" 
                    disabled={updateActivity.isPending || createActivity.isPending}>
                        Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
    
}







