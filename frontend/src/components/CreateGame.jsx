import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    TextField,
    styled,
    Select,
    MenuItem,
    FormControl,
    CircularProgress,
    InputLabel,
} from '@mui/material';
import { createGame } from './backendConnectors/rpsConnector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const CreateGame = ({ open, handleClose }) => {
    const [commitment, setCommitment] = useState(null);
    const [opponentAddress, setOpponentAddress] = useState('');
    const [stakeAmount, setStakeAmount] = useState('');
    const [salt, setSalt] = useState(0);
    const [timeoutOption, setTimeoutOption] = useState(1);
    const [customTimeout, setCustomTimeout] = useState('');
    const [loading, setLoading] = useState(false);

    const Moves = {
        Rock: 1,
        Paper: 2,
        Scissors: 3,
        Spock: 4,
        Lizard: 5,
    };

    const handleCreateGame = async () => {
        try {
            setLoading(true)
            const selectedTimeout = timeoutOption === 0 ? customTimeout : timeoutOption;
            const move = Moves[commitment]
            const res = await createGame(move, opponentAddress, stakeAmount, salt, selectedTimeout);
            console.log(res)
            handleClose();
        } catch (error) {
            console.error(`Error handling in handle create game`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleCommitmentClick = (move) => {
        setCommitment(move);
    };

    const moveNames = ['Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];

    return (
        <>
            <Dialog  open={open} onClose={handleClose} PaperProps={{
        style: {
            backgroundColor: '#000000', 
            border: '2px solid #00bb34', 
            borderRadius: '10px', 
            color: 'white',
        },
    }}>
                <StyledDialogTitle style={{
         backgroundColor: '#00bb34',
         color: 'white',
      }}>
                    <Typography variant="h4" color="inherit">
                        Create Game
                    </Typography>
                </StyledDialogTitle>
                <StyledDialogContent>
                    <Typography variant="h6" color="inherit" gutterBottom>
                        Select Move:
                    </Typography>
                    <div>
                        {moveNames.map((moveName) => (
                            <Button
                                key={moveName}
                                variant={commitment === moveName ? 'contained' : 'outlined'}
                                color="inherit"
                                onClick={() => handleCommitmentClick(moveName)}
                                style={{ margin: '8px' }}
                                InputProps={{
                                    style: {
                                        borderColor: '#00bb34', // Green border color
                                    },
                                }}
                            >
                                {moveName}
                            </Button>
                        ))}
                    </div>
                    <TextField
                        label="Opponent's Address"
                        value={opponentAddress}
                        onChange={(e) => setOpponentAddress(e.target.value)}
                        fullWidth
                        margin="dense"
                        style={{ color: 'white', border: '1px solid white', backgroundColor: "(0,187,52, 0.1)" }}
                        InputLabelProps={{
                            style: {
                                color: '#00bb34', // Label color
                            },
                        }}
                        InputProps={{
                            style: {
                                color: 'white', // Green border color
                            },
                        }}
                    />
                    <TextField
                        label="Stake Amount"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        fullWidth
                        margin="dense"
                        style={{ color: 'white', border: '1px solid white', backgroundColor: "(0,187,52, 0.1)" }}
                        InputLabelProps={{
                            style: {
                                color: '#00bb34', // Label color
                            },
                        }}
                        InputProps={{
                            style: {
                                color: 'white', // Green border color
                            },
                        }}
                    />
                    <TextField
                        label="Your Salt(Keep it secret, needed when resolving game)"
                        value={salt}
                        onChange={(e) => setSalt(e.target.value)}
                        fullWidth
                        margin="dense"
                        style={{ color: 'white', border: '1px solid white', backgroundColor: "(0,187,52, 0.1)" }}
                        InputLabelProps={{
                            style: {
                                color: '#00bb34', // Label color
                            },
                        }}
                        InputProps={{
                            style: {
                                color: 'white', // Green border color
                            },
                        }}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="timeout-label"   style={{ color: 'white', border: '1px solid white', backgroundColor: "(0,187,52, 0.1)" }}
                        InputLabelProps={{
                            style: {
                                color: '#00bb34', // Label color
                            },
                        }}
                        InputProps={{
                            style: {
                                color: 'white', // Green border color
                            },
                        }}>Timeout (in minutes)</InputLabel>
                        <Select
                            labelId="timeout-label"
                            id="timeout-select"
                            value={timeoutOption}
                            onChange={(e) => setTimeoutOption(e.target.value)}
                        >
                            <MenuItem value={1}>1 minute</MenuItem>
                            <MenuItem value={2}>2 minutes</MenuItem>
                            <MenuItem value={4}>4 minutes</MenuItem>
                            <MenuItem value={0}>Custom</MenuItem>
                        </Select>
                    </FormControl>
                    {timeoutOption === 0 && (
                        <TextField
                            label="Custom Timeout (in minutes)"
                            value={customTimeout}
                            onChange={(e) => setCustomTimeout(e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    )}
                </StyledDialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleCreateGame}
                        color="primary"
                        disabled={commitment === null || loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Create Game'
                        )}
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} />

        </>
    );
};

export default CreateGame;