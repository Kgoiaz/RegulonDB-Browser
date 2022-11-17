import React from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Genes from './genes';
import Operon from './operon';
import TranscriptionFactor from './transcriptionFactor';
import TranscriptionUnit from './transcriptionUnit';
import SigmaFactor from './sigmaFactor';

//import "./transcriptionFactor.css"

function Regulates({regulates}) {
    const [_show, set_show] = React.useState(true);
    console.log(regulates);
    return (
        <Paper>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <IconButton
                        sx={{ width: "10px", height: "10px" }}
                        aria-label="view"
                        onClick={() => {
                            set_show(!_show);
                        }}
                    >
                        {_show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <div>
                    <h2>Regulates</h2>
                </div>
            </div>
            {_show && (
                <div style={{ margin: "0 5% 0 5%", padding: "0 0 20px 0" }} >
                    {regulates.genes.length > 0 && ( <Genes genes={regulates.genes} />)}
                    {regulates.operons.length > 0 && ( <Operon operon={regulates.operons} /> )}
                    {regulates.transcriptionUnits.length > 0 && ( <TranscriptionUnit transcriptionUnit={regulates.transcriptionUnits} /> )}
                    {regulates.transcriptionFactors.length > 0 && ( <TranscriptionFactor transcriptionFactor={regulates.transcriptionFactors} /> )}
                    {regulates.sigmaFactors.length > 0 && ( <SigmaFactor sigmaFactor={regulates.sigmaFactors} /> )}
                </div>
            )}

        </Paper>

    );
}

export default Regulates;