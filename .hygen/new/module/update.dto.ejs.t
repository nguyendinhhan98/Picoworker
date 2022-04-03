---
to: "src/modules/<%= h.fileName(name) %>/dtos/update-<%= h.dtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('UpdateDTO') %>
---
<%
    dtoName = h.DtoName(name);
%>import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Update<%= dtoName %> {}
