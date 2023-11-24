import React, { useEffect, useState } from 'react';
import { Plant, PlotPlant } from '../../../../types/CoveyTownSocket';
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
import { PLANTS } from './GardenAreaPlots';
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
 * @param { boolean, () => void, PlotPlant[] } props to represent user's plants and conditionally show user's garden
 * @returns { JSX.Element } user garden modal
 */
export function MyGarden(
  username: string,
  { isOpen, onClose, plants }: MyGardenAreaProps,
): JSX.Element {
  const curUsername = useTownController().ourPlayer.userName;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />

        <ModalContent bgColor='#FFFEF6'>
          <ModalBody>
            <Container>
              {username !== curUsername && <Tag>View Only</Tag>}
              <VStack>

                <ModalHeader>
                  {username == curUsername ? 'My Garden' : username + "'s" + ' Garden'}
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
                    <b>Health Status</b>
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
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <MyGardenPlots plants={plants} username={username}></MyGardenPlots>
            </Container>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
}
