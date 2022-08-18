import express, {Request, Response} from 'express';
import OfferModel from '../models/offer.model';
import {IParsedResponse} from '../helpers/general.interface';
import {getStatus, parseImageList} from '../helpers/helpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  /**
   * Get offers
   */
  let response;
  if (req.query.uhash) {
    // Get offer by unique hash id
    response = await OfferModel.fetchOffer(req.query.uhash as string);
  } else if (req.query.latest) {
    // Get latest offers saved to the database limited by MAX_NUM
    const MAX_NUM = 8;
    response = await OfferModel.getLatestOffers(MAX_NUM);
  } else {
    // Get all offers under a particular section
    response = await OfferModel.fetchOffers(req.query.section as string);
  }
  const status = getStatus(response, 200);
  res.status(status).send(response);
});

router.post('/', async (req: Request, res: Response) => {
  // Add an offer to database
  let result: IParsedResponse = {
    rows: [],
    error: '',
  };
  const body = req.body;
  const imgFiles: any[] = parseImageList(req.files);
  result = await OfferModel.createOffer(body, imgFiles);

  const status = getStatus(result, 201);
  res.status(status).send(result);
});

router.put('/', async (req: Request, res: Response) => {
  // Update an offer
  // console.log(req.files);
  const imgFiles: any[] = parseImageList(req.files);
  const body = req.body;
  const result = (await OfferModel.update(
    body,
    req.query.type as string,
    imgFiles
  )) as IParsedResponse;
  const status = getStatus(result, 200);
  res.status(status).send(result);
});

router.delete('/', async (req: Request, res: Response) => {
  // Delete an offer
  const result = await OfferModel.deleteOffer(req.query.offer_hash as string);
  const status = getStatus(result, 200);
  res.status(status).send(result);
});

export default router;
