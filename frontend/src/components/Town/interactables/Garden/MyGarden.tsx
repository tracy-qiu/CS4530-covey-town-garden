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
                  <b>Health Status Key</b>
                  <br />
                  <Badge variant='solid' colorScheme={'green'} margin={'0.3em'}>
                    {'Healthy'}
                  </Badge>
                  <Badge variant='solid' colorScheme={'yellow'} margin={'0.3em'}>
                    {'Dehydrated'}
                  </Badge>
                  <Badge variant='solid' colorScheme={'red'} margin={'0.3em'}>
                    {'About to Die'}
                  </Badge>
                  <Badge variant='solid' margin={'0.3em'}>
                    {'Dead'}
                  </Badge>
                  <br />
                  <b>Health Status Rules</b>
                  <p>If a plant is not watered for...</p>
                  <ul>
                    <li>1 day, it will be dehydrated.</li>
                    <li>2 days, it is about to die.</li>
                    <li>3 days, it dies.</li>
                  </ul>
                  <br />
                  <b>Watering Rules</b>
                  <ul>
                    <li>If the plant is watered while healthy and as a seedling, it will become a sprout</li>
                    <li>If the plant is watered while healthy and as a sprout, it will become an adult</li>
                    <li>If the plant is watered while dehydrated, it will become healthy</li>
                    <li>If the plant is watered while about to die, it will become dehydrated</li>
                  </ul>
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
