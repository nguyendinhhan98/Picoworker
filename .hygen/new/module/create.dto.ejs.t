---
to: "src/modules/<%= h.fileName(name) %>/dtos/create-<%= h.dtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('CreateDTO') %>
---
<%
    dtoName = h.DtoName(name);
%>import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Create<%= dtoName %> {}
