export interface IService {
  create(data: any);

  findAll(data: any);

  findOne(id, options: any);

  recovery(id);

  recoveryList(ids: string[]);

  update(id: string, data: any);

  remove(id: string);
}
