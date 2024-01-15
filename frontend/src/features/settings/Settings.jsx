import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { Box, Fab, Slider, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const Settings = () => {
    const { slider, setSlider, setIsSettings } = useContext(SettingsContext);

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setSlider((previous) => ({
            ...previous,
            [name]: value
        }));
        localStorage.setItem(name, value);
    }

    const handleBackClick = () => {
        setIsSettings(false);
    }

    return (
        <Box height="100vh" width="100vw">
            <Box
                sx={{
                    position: "absolute", 
                    top: 0, 
                    m: 1, 
                    width: "-webkit-fill-available", 
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h5" textAlign="center">Settings</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography sx={{ width: "150px" }} textAlign="end">General</Typography>
                        <Slider
                            aria-label="general-to-specific"
                            valueLabelDisplay="auto"
                            step={0.1}
                            marks
                            min={0}
                            max={1}
                            name="general_specific"
                            value={slider['general_specific']}
                            onChange={handleSliderChange}
                        />
                        <Typography sx={{ width: "150px" }}>Specific</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography sx={{ width: "150px" }} textAlign="end">Lenient</Typography>
                        <Slider
                            aria-label="lenient-to-harsh"
                            valueLabelDisplay="auto"
                            step={0.1}
                            marks
                            min={0}
                            max={1}
                            name="lenient_harsh"
                            value={slider['lenient_harsh']}
                            onChange={handleSliderChange}
                        />
                        <Typography sx={{ width: "150px" }}>Harsh</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography sx={{ width: "150px" }} textAlign="end">Optimistic</Typography>
                        <Slider
                            aria-label="optimistic-to-pessimistic"
                            valueLabelDisplay="auto"
                            step={0.1}
                            marks
                            min={0}
                            max={1}
                            name="optimistic_pessimistic"
                            value={slider['optimistic_pessimistic']}
                            onChange={handleSliderChange}
                        />
                        <Typography sx={{ width: "150px" }}>Pessimistic</Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="end">
                        {/* <Button variant="contained" onClick={handleSaveClick}>Save</Button> */}
                        {/* <Button variant="contained" onClick={handleResetClick}>Reset</Button> */}
                    </Stack>
                </Stack>
            </Box>
            <Fab 
                size="small" 
                aria-label="back" 
                sx={{ position: "absolute", top: 16, left: 16, backgroundColor: "transparent" }}
                onClick={handleBackClick}
            >
                <ArrowBack />
            </Fab>
        </Box>
    );
}

export default Settings;
