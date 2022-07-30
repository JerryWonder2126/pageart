import path from 'path';

class AppConfig {
  BASE_DIR = path.join(__dirname, '../../');
  OFFERS_BASE_ENDPOINT = '/offers';
  SECTIONS_BASE_ENDPOINT = '/sections';
  API_BASE_ENDPOINT = `/auth`;
}

export default new AppConfig();
