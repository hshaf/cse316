import { Alert, Button, Box, Modal, AlertTitle } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../auth";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);

    let errmsg = "";
    if (auth.errorMsg) {
        errmsg = auth.errorMsg;
    }

    function handleClose() {
        auth.closeErrorModal();
    }

    return (
    <div>
        <Modal
        open={auth.errorMsg !== null}
        >
            <Box sx={style} id="account-error-box">
                <div id="account-error-modal-content">  
                    <div>  
                        <Alert severity="warning" id="account-error-alert">
                        <AlertTitle>Warning</AlertTitle>
                            {errmsg}
                        </Alert>
                    </div>
                    <div>
                        <Button id="account-error-close-button"
                            onClick={handleClose}
                        >Close</Button>
                    </div>
                </div>
            </Box>
        </Modal>
    </div>
    );
}
