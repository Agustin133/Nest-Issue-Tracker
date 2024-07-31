import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createIssueDto: CreateIssueDto, @Req() request: Request) {
    return this.issuesService.create(createIssueDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.issuesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.issuesService.remove(+id);
  }

  @Get('name/:name')
  @UseGuards(AuthGuard())
  findByName(@Param('name') name: string){
    return this.issuesService.findByName(name);
  }

  @Get('user/:id')
  //@UseGuards(AuthGuard())
  findByUserId(@Param('id') id: string){
    return this.issuesService.findByUserId(id);
  }
}
