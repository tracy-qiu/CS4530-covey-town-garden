import React, { useEffect, useState } from 'react';
import { Plant } from '../../../../types/CoveyTownSocket';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  Box,
  HStack,
  VStack,
  ModalBody,
  Container,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Heading,
  Badge,
} from '@chakra-ui/react';
import { MyGardenPlots } from './MyGardenPlots';
import { SeedManual } from './Plant/SeedManual';
import PlantCare from './Plant/PlantCare';

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
  // const [showManual, setShowManual] = useState(false);

  // const handleClick = () => {
  //   setShowManual(true);
  // };

  return (
    <>
      {/* {showManual && (
        <SeedManual username={username} isOpen={showManual} onClose={onClose} />
      )} */}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />

        <ModalContent bgColor='#FFFEF6'>
          <ModalBody>
            <Container>
              <VStack>
                <ModalHeader>
                  {username == 'me' ? 'My Garden' : username + "'s" + ' Garden'}
                </ModalHeader>
                {/* <b>{'Welcome, ' + username + '!'}</b> */}
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
                    <b>Health Status</b>
                    <br />
                    <Badge colorScheme={'green'}>{'Healthy'}</Badge>
                    <Badge colorScheme={'yellow'}>{'Dehydrated'}</Badge>
                    <Badge colorScheme={'red'}>{'About to Die'}</Badge>
                    <Badge colorScheme={'gray'}>{'Dead'}</Badge>
                    <br />
                    <b>Age</b>
                    <br />
                    <Badge colorScheme={'purple'}>{'Adult'}</Badge>
                    <Badge colorScheme={'pink'}>{'Sprout'}</Badge>
                    <Badge colorScheme={'teal'}>{'Seedling'}</Badge>
                    <br />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <MyGardenPlots plants={plants}></MyGardenPlots>
            </Container>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
}
