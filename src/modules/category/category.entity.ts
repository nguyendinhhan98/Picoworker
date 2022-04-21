import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export interface ICategoryEntity {
  id: string;
  name: string;
  parentId?: string;
}
@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity implements ICategoryEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: string;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];
}
