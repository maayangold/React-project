import React from "react";
import { Container, Typography, IconButton, Grid } from "@mui/material";
import { HelpOutline, Settings, FavoriteBorder, MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div style={{ backgroundColor: "#bdaeae", padding: "20px", marginTop: "20px" }}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center" style={{ fontSize: "25px" }}>
                    &copy; {new Date().getFullYear()} Maayan Goldshtein. All rights reserved.
                </Typography>
            </Container>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Link to="/notFound" style={{ textDecoration: "none", color: "primary" }}>
                        <IconButton color="primary">
                            <HelpOutline />
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/notFound" style={{ textDecoration: "none", color: "secondary" }}>
                        <IconButton color="secondary">
                            <Settings />
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/notFound" style={{ textDecoration: "none", color: "error" }}>
                        <IconButton color="error">
                            <FavoriteBorder />
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/notFound" style={{ textDecoration: "none", color: "info" }}>
                        <IconButton color="info">
                            <MoreVert />
                        </IconButton>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}
