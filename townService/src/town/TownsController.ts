import assert from 'assert';
import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Header,
  Patch,
  Path,
  Post,
  Response,
  Route,
  Tags,
} from 'tsoa';

import mongoose, { mongo } from 'mongoose';
import { Town, TownCreateParams, TownCreateResponse, GardenCreateParams } from '../api/Model';
import InvalidParametersError from '../lib/InvalidParametersError';
import CoveyTownsStore from '../lib/TownsStore';
import {
  ConversationArea,
  CoveyTownSocket,
  TownSettingsUpdate,
  ViewingArea,
} from '../types/CoveyTownSocket';
import { validateGardenDoesNotExistInTown, validateTownExists } from './garden/GardenUtil';
// import { connectToGardenDB } from './garden/GardenController';
import * as gardenDao from '../database/dao/garden-dao';
import * as townDao from '../database/dao/town-dao';

/**
 * This is the town route
 */
@Route('towns')
@Tags('towns')
// TSOA (which we use to generate the REST API from this file) does not support default exports, so the controller can't be a default export.
// eslint-disable-next-line import/prefer-default-export
export class TownsController extends Controller {
  private _townsStore: CoveyTownsStore = CoveyTownsStore.getInstance();

  /**
   * List all towns that are set to be publicly available
   *
   * @returns list of towns
   */
  @Get()
  public async listTowns(): Promise<Town[]> {
    return this._townsStore.getTowns();
  }

  /**
   * Create a new town
   *
   * @param request The public-facing information for the new town
   * @example request {"friendlyName": "My testing town public name", "isPubliclyListed": true}
   * @returns The ID of the newly created town, and a secret password that will be needed to update or delete this town.
   */
  @Example<TownCreateResponse>({ townID: 'stringID', townUpdatePassword: 'secretPassword' })
  @Post()
  public async createTown(@Body() request: TownCreateParams): Promise<TownCreateResponse> {
    const { townID, townUpdatePassword } = await this._townsStore.createTown(
      request.friendlyName,
      request.isPubliclyListed,
      request.mapFile,
    );
    return {
      townID,
      townUpdatePassword,
    };
  }

  /**
   * Updates an existing town's settings by ID
   *
   * @param townID  town to update
   * @param townUpdatePassword  town update password, must match the password returned by createTown
   * @param requestBody The updated settings
   */
  @Patch('{townID}')
  @Response<InvalidParametersError>(400, 'Invalid password or update values specified')
  public async updateTown(
    @Path() townID: string,
    @Header('X-CoveyTown-Password') townUpdatePassword: string,
    @Body() requestBody: TownSettingsUpdate,
  ): Promise<void> {
    const success = this._townsStore.updateTown(
      townID,
      townUpdatePassword,
      requestBody.friendlyName,
      requestBody.isPubliclyListed,
    );
    if (!success) {
      throw new InvalidParametersError('Invalid password or update values specified');
    }
  }

  /**
   * Deletes a town
   * @param townID ID of the town to delete
   * @param townUpdatePassword town update password, must match the password returned by createTown
   */
  @Delete('{townID}')
  @Response<InvalidParametersError>(400, 'Invalid password or update values specified')
  public async deleteTown(
    @Path() townID: string,
    @Header('X-CoveyTown-Password') townUpdatePassword: string,
  ): Promise<void> {
    const success = this._townsStore.deleteTown(townID, townUpdatePassword);
    if (!success) {
      throw new InvalidParametersError('Invalid password or update values specified');
    }
  }

  /**
   * Creates a conversation area in a given town
   * @param townID ID of the town in which to create the new conversation area
   * @param sessionToken session token of the player making the request, must match the session token returned when the player joined the town
   * @param requestBody The new conversation area to create
   */
  @Post('{townID}/conversationArea')
  @Response<InvalidParametersError>(400, 'Invalid values specified')
  public async createConversationArea(
    @Path() townID: string,
    @Header('X-Session-Token') sessionToken: string,
    @Body() requestBody: Omit<ConversationArea, 'type'>,
  ): Promise<void> {
    const town = this._townsStore.getTownByID(townID);
    if (!town?.getPlayerBySessionToken(sessionToken)) {
      throw new InvalidParametersError('Invalid values specified');
    }
    const success = town.addConversationArea({ ...requestBody, type: 'ConversationArea' });
    if (!success) {
      throw new InvalidParametersError('Invalid values specified');
    }
  }

  /**
   * Creates a viewing area in a given town
   *
   * @param townID ID of the town in which to create the new viewing area
   * @param sessionToken session token of the player making the request, must
   *        match the session token returned when the player joined the town
   * @param requestBody The new viewing area to create
   *
   * @throws InvalidParametersError if the session token is not valid, or if the
   *          viewing area could not be created
   */
  @Post('{townID}/viewingArea')
  @Response<InvalidParametersError>(400, 'Invalid values specified')
  public async createViewingArea(
    @Path() townID: string,
    @Header('X-Session-Token') sessionToken: string,
    @Body() requestBody: Omit<ViewingArea, 'type'>,
  ): Promise<void> {
    const town = this._townsStore.getTownByID(townID);
    if (!town) {
      throw new InvalidParametersError('Invalid values specified');
    }
    if (!town?.getPlayerBySessionToken(sessionToken)) {
      throw new InvalidParametersError('Invalid values specified');
    }
    const success = town.addViewingArea({ ...requestBody, type: 'ViewingArea' });
    if (!success) {
      throw new InvalidParametersError('Invalid values specified');
    }
  }

  /**
   * Connects a client's socket to the requested town, or disconnects the socket if no such town exists
   *
   * @param socket A new socket connection, with the userName and townID parameters of the socket's
   * auth object configured with the desired townID to join and username to use
   *
   */
  public async joinTown(socket: CoveyTownSocket) {
    // Parse the client's requested username from the connection
    const { userName, townID } = socket.handshake.auth as { userName: string; townID: string };

    const town = this._townsStore.getTownByID(townID);
    if (!town) {
      socket.disconnect(true);
      return;
    }

    // Connect the client to the socket.io broadcast room for this town
    socket.join(town.townID);

    const newPlayer = await town.addPlayer(userName, socket);
    assert(newPlayer.videoToken);
    socket.emit('initialize', {
      userID: newPlayer.id,
      sessionToken: newPlayer.sessionToken,
      providerVideoToken: newPlayer.videoToken,
      currentPlayers: town.players.map(eachPlayer => eachPlayer.toPlayerModel()),
      friendlyName: town.friendlyName,
      isPubliclyListed: town.isPubliclyListed,
      interactables: town.interactables.map(eachInteractable => eachInteractable.toModel()),
    });
  }

  /**
   * Retrieves all towns from database
   * @returns list of towns from database
   */
  @Get('townDB')
  public async getAllTowns() {
    // connectToGardenDB();
    try {
      const towns = await townDao.findTowns();
      return towns;
    } catch (error: unknown) {
      return { error: `Error getting all towns: ${error}` };
    }
  }

  /**
   * Retrieves a town from database by id
   * @returns list of towns in database
   */
  @Get('townDB/{dbTownId}')
  public async getTownByDbId(@Path() dbTownId: string) {
    // connectToGardenDB();
    const dbTownIdObject = new mongoose.Types.ObjectId(dbTownId);
    try {
      const towns = await townDao.findTownByDBTownId(dbTownIdObject);
      return towns;
    } catch (error: unknown) {
      return { error: `Error getting all towns: ${error}` };
    }
  }

  /**
   * Create a town
   * @param requestBody townId and adminId
   * @returns town
   */
  @Post('townDB')
  public async createTownInDb(@Body() requestBody: { townId: string; adminId: string }) {
    const adminIdObject = new mongoose.Types.ObjectId(requestBody.adminId);
    // connectToGardenDB();
    try {
      const town = await townDao.createTown({
        townId: requestBody.townId,
        adminId: adminIdObject,
      });
      return town;
    } catch (error: unknown) {
      return { error: `Error creating new garden: ${error}` };
    }
  }

  @Post('{townId}/garden')
  @Response<InvalidParametersError>(400, 'Invalid values specified')
  public async createGarden(@Path() townId: string) {
    // connectToGardenDB();
    try {
      await validateTownExists(townId);
      await validateGardenDoesNotExistInTown(townId);
      const garden = await gardenDao.createGarden({
        gardenPlots: [],
        townId,
      });
      return garden;
    } catch (error: unknown) {
      return { error: `Error creating new garden: ${error}` };
    }
  }

  /**
   * Deletes town
   * @param requestBody
   *
   */
  @Delete('/townDB/delete/{townId}')
  public async deleteDbTown(
    @Path()
    townId: string,
  ) {
    // connectToGardenDB();
    const townIdObject = mongoose.Types.ObjectId.createFromHexString(townId);
    try {
      const response = await townDao.deleteTown(townIdObject);
      return response;
    } catch (error: unknown) {
      return { error: `Error deleting plant: ${error}` };
    }
  }

  /**
   * Retrieves all gardens across all towns
   * @returns garden
   */
  @Get()
  public getAllGardens() {
    // connectToGardenDB();
    try {
      const gardens = gardenDao.findGardens();
      return gardens;
    } catch (error: unknown) {
      return { error: `Error getting all gardens: ${error}` };
    }
  }
}
