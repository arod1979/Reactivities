import Group from "@mui/icons-material/Group";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, Button } from "@mui/material";

export default function Navbar() {
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <MenuItem sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight='bold'>Activities</Typography>

                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItem sx={{
                                fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                            }}>
                                About
                            </MenuItem>
                            <MenuItem sx={{
                                fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                            }}>
                                Contact
                            </MenuItem>
                        </Box>
                        <Button size="large" variant="contained" color="warning">Create activity</Button>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    )
}
