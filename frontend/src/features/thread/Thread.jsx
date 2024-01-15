import { Send, Settings } from "@mui/icons-material";
import { Box, Fab, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { postChatbotPrompt } from "../../services/validation_server";

const Thread = () => {
    const { slider, setIsSettings } = useContext(SettingsContext);
    const bottomBoxRef = useRef(null);

    const [height, setHeight] = useState(0);
    const [prompt, setPrompt] = useState("");
    const [thread, setThread] = useState([]);

    useEffect(() => {
        setHeight(bottomBoxRef.current.clientHeight);
    }, []);

    useEffect(() => {
        setHeight(bottomBoxRef.current.clientHeight);
    }, [prompt])

    const messages_sample = [
        {role: 'user', content: 'Hi'},
        {role: 'assistant', content: 'Hello! How can I assist you today? Entrypoint main 4.27 MiB (490 KiB) = main.css 29.8 KiB main.js 4.24 MiB 56 auxiliary assets'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
        {role: 'assistant', content: 'Hello! How can I assist you today?'},
    ]

    const handleInputChange = (e) => {
        setPrompt(e.target.value);
    }

    const handleInputKey = (e) => {
        setHeight(bottomBoxRef.current.clientHeight);
    }

    const handleSettingsClick = () => {
        setIsSettings(true);
    }

    const handleSendClick = async () => {
        const payload = {
            prompt: prompt,
            leniency: slider['lenient_harsh'],
            generality: slider['general_specific'],
            optimism: slider['optimistic_pessimistic']
        }

        setThread((previousThread) => ([
            ...previousThread,
            { role: 'user', content: prompt }
        ]));

        setPrompt("");
        setHeight(bottomBoxRef.current.clientHeight);
        console.log(payload);
        const response = await postChatbotPrompt(payload);
        console.log(response.data)
        setThread((previousThread) => ([
            ...previousThread,
            response.data
        ]));
    }

    return (
        <Box height="100vh" width="100vw">
            <Box 
                sx={{ 
                    position: "absolute", 
                    top: 0, 
                    m: 1, 
                    width: "-webkit-fill-available", 
                    height: "-webkit-fill-available",
                    maxHeight: height < 50 ? `calc(100% - ${height}px - 35px)` : `calc(100% - ${height}px - 25px)`, 
                    overflowY: "hidden",
                    ":hover": {
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: (theme) => theme.palette.primary.main,
                            borderRadius: "2.5px",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: (theme) => theme.palette.background.paper,
                        },
                    },
                }}
            >
                {thread.length === 0 ? (
                        <Box sx={{ height: "-webkit-fill-available", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h6">Welcome to Idea Validation Extension!</Typography>
                        </Box>
                    ) :(
                        <Stack spacing={2}>
                            {thread.map((message, index) => (
                                <Box key={index}>
                                    <Typography fontWeight="bold">{message.role === "user" ? "You" : "Expert Panelist"}</Typography>
                                    <Stack spacing={1}>
                                        {message.content.split("\n").map((str, index) => (
                                            <Typography key={index}>{str}</Typography>
                                        ))}
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    )
                }
            </Box>
            <Box ref={bottomBoxRef} sx={{ position: "absolute", bottom: 0, m: 1, width: "-webkit-fill-available" }}>
                <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        endAdornment={
                            <InputAdornment position="end" sx={{ mb: "10px" }}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    color="primary"
                                    sx={{ borderRadius: "25% !important" }}
                                    onClick={handleSendClick}
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        }
                        multiline
                        maxRows={4}
                        placeholder="Write your pitch idea"
                        sx={{ alignItems: "end" }}
                        value={prompt}
                        onKeyDown={handleInputKey}
                        onChange={handleInputChange}
                        onKeyUp={handleInputKey}
                    />
                </FormControl>
            </Box>
            <Fab 
                size="small" 
                aria-label="settings" 
                sx={{ position: "absolute", top: 16, right: 16, backgroundColor: "transparent" }}
                onClick={handleSettingsClick}
            >
                <Settings />
            </Fab>
        </Box>
    );
}

export default Thread;
