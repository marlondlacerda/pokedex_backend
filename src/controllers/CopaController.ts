import CopaService from '../services/CopaService';
import { Controller } from '../interfaces/Repositories';
import { Copa } from '../schemas';

class CopaController extends Controller<Copa> {
  private $route: string;

  constructor(
    service = new CopaService(),
    route = '/copas',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }
}

export default CopaController;
