import React from 'react';
import { useState } from 'react';
import {
  Button,
  Container,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  chakra,
} from '@chakra-ui/react';
import PlantDetails from './PlantDetails';
import PlantActions from './PlantActions';
import { Plant } from '../../../../../types/CoveyTownSocket';

export type PlantCareProps = {
  plant: Plant;
  showActions: boolean;
};

/**
 * Shows information about a plant, its health status, and actions to do on the plant (watering, remove)
 * @param { plant, showActions }
 * @returns {JSX.Element} component
 */
export default function PlantCare({ plant, showActions }: PlantCareProps): JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const StyledPlot = chakra(Button, {
    baseStyle: {
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '25%',
      borderColor: '#EDD4B2',
      borderWidth: '2px',
      bgColor: '#793D00',
      height: '25%',
      width: '25%',
      fontSize: '50px',
      _disabled: {
        opacity: '100%',
      },
      _hover: { backgroundColor: '#C4A484' },
    },
  });

  return (
    <div>
      <StyledPlot onClick={handleShow}></StyledPlot>

      <Modal isOpen={show} onClose={handleClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <Container>
            <ModalHeader>Plant Care</ModalHeader>
            <ModalCloseButton />
            <PlantDetails plant={plant} />
            <br />
            {showActions && (
              <>
                <PlantActions plant={plant} />
              </>
            )}
          </Container>
        </ModalContent>
      </Modal>
    </div>
  );
}
