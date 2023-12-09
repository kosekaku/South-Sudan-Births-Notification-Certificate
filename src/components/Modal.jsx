import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  ButtonStrip,
  Button,
} from "@dhis2/ui";

const ModalCard = ({ title, content, onSave, onCancel }) => {
  return (
    <div>
      <Modal>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ModalActions>
          <ButtonStrip end>
            <Button onClick={onCancel()} secondary>
              Canceal
            </Button>
            <Button onClick={onSave()} primary>
              Save
            </Button>
          </ButtonStrip>
        </ModalActions>
      </Modal>
    </div>
  );
};

ModalCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalCard;
