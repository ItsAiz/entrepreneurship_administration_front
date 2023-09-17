import React from 'react';
import { Dialog } from 'primereact/dialog';
import EnterpreneurshipForm from './enterpreneurshipRegister';
import PropTypes from 'prop-types';

const EnterpreneurshipModal = ({ isOpen, onClose, initialEntrepreneurshipData }) => {
  return (
    <Dialog
      visible={isOpen}
      onHide={onClose}
      header={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Edición Emprendimiento</span>
        </div>
      }
      style={{ width: '65%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <EnterpreneurshipForm
          initialEntrepreneurshipData={initialEntrepreneurshipData}
          isEditing={true}
        />
      </div>
    </Dialog>
  );
};

EnterpreneurshipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialEntrepreneurshipData: PropTypes.object,
};

export default EnterpreneurshipModal;
