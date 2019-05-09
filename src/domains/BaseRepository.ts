import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
  Repository,
  SelectQueryBuilder
} from "typeorm";

// Doesn't work ATM because of TS and DeepPartials with ORMs, need to figure this out
abstract class BaseRepository<T> {
  public abstract getRepository(): Repository<T>;
  public getRelations(): string[] {
    return [];
  }

  public get(id: string): Promise<T> {
    return this.getRepository().findOne(id, {
      relations: this.getRelations()
    }) as Promise<T>;
  }

  public findOne(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>
  ): Promise<T> {
    return this.getRepository().findOne(
      conditions,
      options || { relations: this.getRelations() }
    ) as Promise<T>;
  }

  public find(
    conditions?: FindConditions<T> | FindManyOptions<T>
  ): Promise<T[]> {
    return this.getRepository().find(conditions) as Promise<T[]>;
  }

  public queryBuilder(
    alias?: string,
    runner?: QueryRunner
  ): SelectQueryBuilder<T> {
    return this.getRepository().createQueryBuilder(alias, runner);
  }

  public async save(entity: T): Promise<T> {
    // @ts-ignore
    await this.getRepository().save(entity);
    return entity;
  }

  public async remove(entity: T): Promise<void> {
    await this.getRepository().remove(entity);
    return;
  }
}

export default BaseRepository;
