---
to: "src/modules/<%= h.fileName(name) %>/<%= h.moduleFileName(name) %>.ts"
unless_exists: true
---
<%
moduleName = h.ModuleName(name);
controllerName = h.ControllerName(name);
controllerFileName = h.controllerFileName(name);
RepositoryName = h.RepositoryName(name);
repositoryFileName = h.repositoryFileName(name);

%>import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= controllerName %> } from './<%= controllerFileName %>';
import { <%= RepositoryName %> } from './<%= repositoryFileName %>';

@Module({
  imports: [TypeOrmModule.forFeature([<%= RepositoryName %>])],
  controllers: [<%= controllerName %>],
})
export class <%= moduleName %> {}
