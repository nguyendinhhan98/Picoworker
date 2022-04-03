---
to: "src/modules/<%= h.fileName(name) %>/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Controller') %>
---
<%
    controllerName = h.ControllerName(name);
    fileName = h.fileName(name);
    className = h.ClassName(name);
    createFunctionName = 'create' + className;
    updateFunctionName = 'update' + className;
    deleteFunctionName = 'delete' + className;
    getAllFunctionName = 'getAll' + className;
    getSignleFunctionName = 'getSingle' + className;

    CreateDtoName = h.CreateDtoName(name);
    createDtoName = h.changeCase.camel(CreateDtoName);
    UpdateDtoName = h.UpdateDtoName(name);
    updateDtoName = h.changeCase.camel(UpdateDtoName);

    RepositoryName = h.RepositoryName(name);
    repositoryName = h.changeCase.camel(RepositoryName);
    repositoryFileName = h.repositoryFileName(name);

    createDtoFileName = h.createDtoFileName(name);
    updateDtoFileName = h.updateDtoFileName(name);

    entityFileName = h.entityFileName(name);
    IEntityName = h.IEntityName(name);

    rootName = h.inflection.pluralize(fileName).toLowerCase();

%>import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { <%= CreateDtoName %> } from './dtos/<%= createDtoFileName %>';
import { <%= UpdateDtoName %> } from './dtos/<%= updateDtoFileName %>';
import { <%= IEntityName %> } from './<%= entityFileName %>';
import { <%= RepositoryName %> } from './<%= repositoryFileName %>';

@Controller('<%= rootName %>')
@ApiTags('<%= name %>')
export class <%= controllerName %> {
  constructor(private <%= repositoryName %>: <%= RepositoryName %>) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async <%= createFunctionName %>(@Body() <%= createDtoName %>: <%= CreateDtoName %>) {
    const <%= name %> = this.<%= repositoryName %>.create(<%= createDtoName %>);
    this.<%= repositoryName %>.save(<%= name %>);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async <%= getAllFunctionName %>(): Promise<<%=IEntityName%>[]> {
    const <%= rootName %> = await this.<%= repositoryName %>.find();
    return <%= rootName %>;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async <%= getSignleFunctionName %>(@Param() params): Promise<<%=IEntityName%>> {
    const <%= name %> = await this.<%= repositoryName %>.findOne(params.id);
    if (!<%= name %>) {
      throw new NotFoundException('<%= name %> not exists');
    }
    return <%= name %>;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async <%= updateFunctionName %>(
    @Param() params,
    @Body() <%= updateDtoName %>: <%= UpdateDtoName %>,
  ): Promise<UpdateResult> {
    return this.<%= repositoryName %>.update(params.id, <%= updateDtoName %>);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async <%= deleteFunctionName %>(@Param() params): Promise<DeleteResult> {
    return this.<%= repositoryName %>.delete(params.id);
  }
}
