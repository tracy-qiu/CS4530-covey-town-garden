import React from 'react';
import { Plant } from '../../../../types/CoveyTownSocket';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Container,
  Spacer,
  Box,
  HStack,
  VStack,
  ModalBody,
} from '@chakra-ui/react';
import { MyGardenPlots } from './MyGardenPlots';

export type MyGardenAreaProps = {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
};

/**
 * Renders the plant plots styled for the a user's garden together as one component.
 * The plots display as two across, two down and are clickable for information and actions.
 * The user can also choose to return to the overall garden.
 * @param username user's name to be displayed
 * @param { boolean, () => void, Plant[] } props to represent user's plants and conditionally show user's garden
 * @returns { JSX.Element } user garden modal
 */
export function MyGarden(
  username: string,
  { isOpen, onClose, plants }: MyGardenAreaProps,
): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <Container>
          <VStack>
            <HStack align='center' justify='center'>
              <ModalHeader textAlign='center'>{username + "'s" + ' Garden'}</ModalHeader>
            </HStack>
            <HStack>
              <Box border='1px solid black'>{'Status Guide: '}</Box>
              <ModalBody textAlign='center'>{'Welcome, ' + username + '!'}</ModalBody>
              <Spacer />
            </HStack>
            <MyGardenPlots plants={plants}></MyGardenPlots>
          </VStack>
          <ModalCloseButton />
        </Container>
      </ModalContent>
    </Modal>
  );
}
