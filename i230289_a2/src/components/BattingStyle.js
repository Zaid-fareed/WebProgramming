import React from 'react';

//Allows user to select batting style
const BattingStyle = ({ selected, onChange, disabled }) => {
    return (
        <div style={styles.container}>
            <p style={styles.label}>SELECT BATTING STYLE:</p>
            
            <div style={styles.buttonRow}>
                <button 
                    disabled={disabled}
                    onClick={() => onChange('aggressive')}
                    style={{
                        /* Base button styles */
                        ...styles.button,
                        backgroundColor: selected === 'aggressive' ? '#e94560' : '#222',
                        borderColor: '#e94560',
                        opacity: disabled ? 0.5 : 1,
                        cursor: disabled ? 'not-allowed' : 'pointer'
                    }}
                >
                    Aggressive
                </button>

                <button 
                    disabled={disabled}
                    onClick={() => onChange('defensive')}
                    style={{
                        ...styles.button,
                        backgroundColor: selected === 'defensive' ? '#4CAF50' : '#222',
                        borderColor: '#4CAF50',
                        opacity: disabled ? 0.5 : 1,
                        cursor: disabled ? 'not-allowed' : 'pointer'
                    }}
                >
                    Defensive
                </button>
            </div>
        </div>
    );
};

// Styling for the component
const styles = {
    container: {
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center',
        marginTop: '10px'
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#aaa',
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '5px',
        transition: '0.2s',
    }
};

export default BattingStyle;