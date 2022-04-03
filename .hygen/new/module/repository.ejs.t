---
to: "src/modules/<%= h.fileName(name) %>/<%= h.repositoryFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Repository') %>
---

<%

TableName = h.TableName(name);
entityName = h.EntityName(name);
entityFileName = h.entityFileName(name);
repositoryName = h.RepositoryName(name);

%>import { EntityRepository, Repository } from 'typeorm';
import { <%= entityName %> } from './<%= entityFileName %>';

@EntityRepository(<%= entityName %>)
export class <%= repositoryName %> extends Repository<<%= entityName %>> {}
