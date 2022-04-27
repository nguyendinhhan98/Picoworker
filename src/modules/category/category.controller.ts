import {
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
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ICategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { Constants } from '../../core/enum/constants.enum';
import { JwtOAuthGuard } from '../../core/guards/jwt.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@Controller('categories')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    category.parent = createCategoryDto.parentId;
    this.categoryRepository.save(category);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllCategory(): Promise<ICategoryEntity[]> {
    return this.categoryRepository.find({
      relations: ['children'],
      where: {
        parent: null,
      },
    });
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async getSingleCategory(@Param() params): Promise<ICategoryEntity> {
    const category = await this.categoryRepository.findOne(params.id);
    if (!category) {
      throw new NotFoundException('category not exists');
    }
    return category;
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async updateCategory(
    @Param() params,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryRepository.update(params.id, updateCategoryDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteCategory(@Param() params): Promise<DeleteResult> {
    return this.categoryRepository.delete(params.id);
  }
}
