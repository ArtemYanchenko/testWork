import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, Container } from '@mui/material'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssBaseline />
        <Container maxWidth="md">
            <App />
        </Container>
    </React.StrictMode>
)