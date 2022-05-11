import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { JobEntity } from './job.entity';

@EntityRepository(JobEntity)
export class JobRepository extends Repository<JobEntity> {
  async listPagination(condition: any) {
    const {
      limit,
      page,
      sortBy,
      sortOrder,
      jobTitle,
      jobLevel,
      category,
      subCategory,
      payment,
      countryIds,
    } = condition || {};
    const [data, total] = await this.findAndCount({
      relations: ['category', 'subCategory', 'countries'],
      where: (qb: SelectQueryBuilder<JobEntity>) => {
        if (jobTitle) {
          qb.andWhere('job_title LIKE :jobTitle', {
            jobTitle: `%${jobTitle || ''}%`,
          });
        }
        if (jobLevel) {
          qb.andWhere('job_level = :jobLevel', {
            jobLevel: `${jobLevel || ''}`,
          });
        }
        if (category) {
          qb.andWhere('category = :category', {
            category: `${category || ''}`,
          });
        }
        if (subCategory) {
          qb.andWhere('sub_category = :subCategory', {
            subCategory: `${subCategory || ''}`,
          });
        }
        if (payment?.length > 0) {
          qb.andWhere('payment >= :after', {
            after: Number(payment[0]),
          }).andWhere('payment <= :before', {
            before: Number(payment[1]),
          });
        }
        if (countryIds?.length > 0) {
          qb.where('country_id IN(:...countryIds)', {
            countryIds: countryIds,
          });
        }
      },
      order: {
        [sortBy || 'createdAt']: sortOrder.toUpperCase() || 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      total,
      limit: parseInt(limit) || null,
      page: parseInt(page) || 1,
      data,
    };
  }
}
