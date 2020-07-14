import React from 'react';
import Spinner from '../../components/loading/Spinner'

export default function CoverSearch(menssage, state) {
    switch (state) {
        case 'loading':
            return (
                <>
                    <Spinner>
                    <div style={styleTitle}>
                        <h1 style={{ color: "#ffffff" }}>{menssage}</h1>
                    </div>
                    </Spinner>
                </>
            )
        case 'error':
            return (
                <>
                    <div style={styleError}>
                        <h1 style={{ color: "#ffffff" }}>{menssage}</h1>
                    </div>
                </>
            )
        default:
            return (
                    <div style={styleTitle}>
                        <h1 style={{ color: "#ffffff" }}>Genes</h1>
                    </div>
            )
    }
    
}

const styleError = {
    backgroundColor: "var(--color-accentAA)",
    padding: "2% 10% 2% 10%"
}

const styleTitle = {
    backgroundColor: "var(--color-grey3A)",
    padding: "2% 10% 2% 10%"
}