import { Service } from '../interfaces/Repositories';
import CopaModel from '../models';
import { Copa } from '../schemas';

class CopaService extends Service<Copa> {
  constructor(
    public model = new CopaModel(),
  ) {
    super(model);
  }

  public read = async (): Promise<Copa[]> => {
    const result = await this.model.read();

    return result;
  };
}

export default CopaService;
