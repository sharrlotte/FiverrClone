import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import { plainToInstance } from 'class-transformer';
import { PostResponse } from 'src/services/post/dto/post.response';
import { Request } from 'express';
import { getAuthUser } from 'src/services/auth/auth.utils';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { Roles } from 'src/shared/decorator/role.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const user = getAuthUser(req);

    return plainToInstance(PostResponse, this.postService.create(user, createPostDto));
  }
  @UseInterceptors(FileInterceptor('thumbnail'))
  @Post(':id/thumbnail')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  thumbnail(@Param('id') id: string, @UploadedFile() thumbnail: Express.Multer.File, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.thumbnail(+id, session, thumbnail);
  }

  @UseInterceptors(FilesInterceptor('previews'))
  @Post(':id/previews')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  images(@Param('id') id: string, @UploadedFiles() previews: Array<Express.Multer.File>, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.previews(+id, session, previews);
  }

  @Get()
  findAll(@Query() query: TitlePaginationQueryDto) {
    return this.postService.findAll(query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return plainToInstance(PostResponse, this.postService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return plainToInstance(PostResponse, this.postService.update(+id, updatePostDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
