import express, {Request, Response} from 'express';
import SectionModel from '../models/section.model';
import {IParsedResponse} from '../helpers/general.interface';
import {getStatus, parseImageList} from '../helpers/helpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  /**
   * Fetch all sections
   */
  const result: IParsedResponse = await SectionModel.fetchSections();
  const status = getStatus(result, 200);
  res.status(status).send(result);
});

router.post('/', async (req: Request, res: Response) => {
  /**
   * Add a new section object to database
   */
  // const imageFile = req['files'] ? req['files'].image : null;
  const imageFile = parseImageList(req.files)[0];
  const result = await SectionModel.addSection(req.body.title, imageFile);
  const status = getStatus(result, 201);
  res.status(status).send(result);
});

router.put('/', async (req: Request, res: Response) => {
  /**
   * Update section
   */
  const image = parseImageList(req.files)[0];
  const result = (await SectionModel.update(
    req.body,
    image
  )) as IParsedResponse;

  const status = getStatus(result, 200);
  res.status(status).send(result);
});

router.delete('/', async (req: Request, res: Response) => {
  /**
   * Delete a section
   */
  const result = await SectionModel.deleteSection(
    req.query.section_hash as string
  );
  const status = getStatus(result, 200);
  res.status(status).send(result);
});

export default router;
