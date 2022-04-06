---
to: "src/modules/<%= h.fileName(name) %>/<%= h.entityFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Entity') %>
---
<%

TableName = h.TableName(name);
IEntityName = h.IEntityName(name);
entityName = h.EntityName(name);

%>import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

export interface <%= IEntityName %> {
  id: string;
}

@Entity({ name: '<%= TableName %>' })
export class <%= entityName %> extends AbstractEntity implements <%= IEntityName %> {}
