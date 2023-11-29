import React, { useEffect, useState } from 'react';
import { Container, Box, SimpleGrid } from '@chakra-ui/react';
import { GardenPlotButton } from './PlotButton';
import { GardenPlot, Plant, PlotPlant } from '../../../../types/CoveyTownSocket';
import useTownController from '../../../../hooks/useTownController';
import PlayersInTownList from '../../../SocialSidebar/PlayersList';
import { gardenApiClient } from '../../../../classes/garden-client';

const samplePlant1: PlotPlant = {
  plotPlantId: '12',
  plantId: '65643e8e2e726976a53f8465',
};

const samplePlant2: PlotPlant = {
  plotPlantId: '13',
  plantId: '65643e8e2e726976a53f8465',
};

const samplePlant3: PlotPlant = {
  plotPlantId: '14',
  plantId: '65643e8e2e726976a53f8465',
};

const samplePlantDead: PlotPlant = {
  plotPlantId: '100',
  plantId: '65643e8e2e726976a53f8465',
};

const undefinedPlant: PlotPlant = { plotPlantId: '16', plantId: undefined };

export const PLANTS: PlotPlant[] = [samplePlant1, samplePlant2, samplePlantDead, undefinedPlant];

/**
 * Renders each individual plot styled for the garden together as one component.
 * The plots display as four across and four down, with scrollability vertically
 * to view other plots that do not fit in the view.
 * @returns {JSX.Element} GardenPlots
 */
export function GardenAreaPlots(): JSX.Element {
  const [gardenPlots, setGardenPlots] = useState<Record<string, unknown>[]>([]);
  const townController = useTownController();
  const townId = townController.townID;

  useEffect(() => {
    const updateGardenDetails = async () => {
      const garden = await gardenApiClient.getGardenByTown(townId);
      const gardenId = garden._id;
      const plots = await gardenApiClient.getPlotsByGarden(gardenId);
      // on each garden plot ...
      const newPlots = plots.map(async (plot: GardenPlot) => {
        // and for each plot plant in a garden plot ...
        const newPlants = plot.plants.map(async (plotPlant: PlotPlant) => {
          // get the plant by plant id for each plotplant
          const plant =
            plotPlant.plantId !== null
              ? await gardenApiClient.getPlant(plotPlant.plantId).catch(error => {
                  if (error.response && error.response.status === 204) {
                    return undefined;
                  }
                })
              : undefined;
          return { plotPlantId: plotPlant.plotPlantId, plant };
        });
        const gardener = await gardenApiClient.getGardener(plot.gardenerId);
        return {
          _id: plot._id,
          gardenId: gardenId,
          gardenerId: plot.gardenerId,
          gardenerName: gardener.name,
          plants: await Promise.all(newPlants),
        };
      });
      setGardenPlots(await Promise.all(newPlots));
    };
    updateGardenDetails();
  });

  return (
    <Container>
      <SimpleGrid spacing={3} columns={4}>
        {gardenPlots.map((plot, index) => {
          return (
            <Box key={plot}>
              <GardenPlotButton
                gardenId={plot.gardenId}
                gardenPlotId={plot._id}
                username={plot.gardenerName}
                plants={plot.plants}></GardenPlotButton>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
