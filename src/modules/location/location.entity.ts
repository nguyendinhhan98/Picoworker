import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
export interface ILocationEntity {
  id: string;
  name: string;
  parentId?: string;
}

@Entity({ name: 'locations' })
export class LocationEntity extends AbstractEntity implements ILocationEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => LocationEntity, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: string;

  @OneToMany(() => LocationEntity, (category) => category.parent)
  children: LocationEntity[];
}
