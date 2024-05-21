import * as React from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Box from '@mui/joy/Box';

import DialogContent from '@mui/joy/DialogContent';

export default function InformationReview({openModal, setOpenModal, personalInfo , professionalInfo , onSub , handleBack}) {

    
  return (
    <React.Fragment>
      
      <Transition in={openModal} timeout={400}>
        {(state: string) => (
          <Modal
            keepMounted
            open={!['exited', 'exiting'].includes(state)}
            onClose={() => setOpenModal(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: 'none',
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === 'exited' ? 'hidden' : 'visible',
            }}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle>Preview Your Information</DialogTitle>
              <DialogContent>
      <div>
        <p><strong>Username:</strong> {personalInfo.username}</p>
        <p><strong>CIN:</strong> {personalInfo.cin}</p>
        <p><strong>Email:</strong> {personalInfo.email}</p>
        <p><strong>Phone Number:</strong> {personalInfo.phoneNumber}</p>
        <p><strong>Address:</strong> {personalInfo.address}</p>
      </div>
      <div>
        <p><strong>License:</strong> {professionalInfo.license}</p>
        <p><strong>Services Provided:</strong> {professionalInfo.servicesProvided}</p>
        <p><strong>Certificates:</strong> {professionalInfo.certificates}</p>
        <p><strong>Company Name:</strong> {professionalInfo.companyname}</p>
        <p><strong>Anthropometric Certificate:</strong> {professionalInfo.anthropometricCertificate}</p>
      </div>
      <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={() => {setOpenModal(false) ; onSub()}}>
              Continue
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() =>{ setOpenModal(false); handleBack()}}
            >
              Cancel
            </Button>
          </Box>
      
                  </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}