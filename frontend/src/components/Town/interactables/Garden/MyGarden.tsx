import React from 'react';
import { PlotPlant } from '../../../../types/CoveyTownSocket';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  VStack,
  ModalBody,
  Container,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Badge,
  Tag,
} from '@chakra-ui/react';
import { MyGardenPlots } from './MyGardenPlots';
import useTownController from '../../../../hooks/useTownController';

export type MyGardenAreaProps = {
  isOpen: boolean;
  onClose: () => void;
  plants: PlotPlant[];
};

/**
 * Renders the plant plots styled for the a user's garden together as one component.
 * The plots display as two across, two down and are clickable for information and actions.
 * The user can also choose to return to the overall garden.
 * @param username user's name to be displayed
 * @param { isOpen, onClose, plants } MyGardenAreaProps to represent user's plants and conditionally show user's garden
 * @returns { JSX.Element } user garden modal
 */
export function MyGarden(
  username: string,
  { isOpen, onClose, plants }: MyGardenAreaProps,
): JSX.Element {
  const currUsername = useTownController().ourPlayer.userName;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
      <ModalOverlay />
      <ModalContent bgColor='#FFFEF6'>
        <ModalBody>
          <Container>
            {username !== currUsername && <Tag>View Only</Tag>}
            <VStack>
              <ModalHeader>
                {username == currUsername ? 'My Garden' : username + "'s" + ' Garden'}
              </ModalHeader>
            </VStack>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    <b>Guide</b>
                    <AccordionIcon />
                  </Box>
                </AccordionButton>
                <AccordionPanel>
                  <b>Plant Health Status</b>
                  <br />
                  <p>
                    <Badge variant='solid' colorScheme={'green'} marginRight={'0.5em'}>
                      {'Healthy'}
                    </Badge>
                    Watered within 24 hours
                  </p>
                  <p>
                    <Badge variant='solid' colorScheme={'yellow'} marginRight={'0.5em'}>
                      {'Dehydrated'}
                    </Badge>
                    Not watered for 1 day
                  </p>
                  <p>
                    <Badge variant='solid' colorScheme={'red'} marginRight={'0.5em'}>
                      {'About to Die'}
                    </Badge>
                    Not watered for 2 days
                  </p>
                  <p>
                    <Badge variant='solid' marginRight={'0.5em'}>
                      {'Dead'}
                    </Badge>
                    Not watered for 3 days
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <br />
            <MyGardenPlots plants={plants} username={username}></MyGardenPlots>
          </Container>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
