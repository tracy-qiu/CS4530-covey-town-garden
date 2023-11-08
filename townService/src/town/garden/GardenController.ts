import { Body, Controller, Get, Path, Post, Query, Response, Route, Tags } from 'tsoa';
import * as db from './GardenManager';

@Route('town/garden')
export class GardenController extends Controller {
  @Get()
  public getAll() {
    return db.getAll();
  }
}
