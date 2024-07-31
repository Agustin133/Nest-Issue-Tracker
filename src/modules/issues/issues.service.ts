import { ConflictException, Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Issue } from './schemas/issue.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service'

@Injectable()
export class IssuesService {

  constructor(@InjectModel(Issue.name) private issueModel: Model<Issue>,
  private readonly usersService: AuthService,
  ){}

  async create(createIssueDto: CreateIssueDto) {
    const existsIssue = await this.issueModel.findOne({ id: createIssueDto.id});

    if(existsIssue){
      throw new ConflictException(`Issue ${createIssueDto.id} already exists`);
    }

    // add user ID to the body


    const createdIssue = new this.issueModel(createIssueDto);
    return createdIssue.save();
  }

  findAll() {
    return this.issueModel.find();
  }

  async findOne(id: number) {

    const existsIssue = await this.issueModel.findOne({ id });

    if(!existsIssue){
      throw new ConflictException(`Issue ${id} does not exists`);
    }

    return this.issueModel.findOne({ id });
  
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    
    const existsIssueOri = await this.issueModel.findOne({ id });

    if(!existsIssueOri){
      throw new ConflictException(`Issue ${id} does not exists`);
    }

    if(updateIssueDto.id){
      const existsIssueNew = await this.issueModel.findOne({ id: updateIssueDto.id });

      if(existsIssueNew){
        throw new ConflictException(`Issue ${id} already exists`);
      }
    }

    await this.issueModel.updateOne({ id }, updateIssueDto);

    return this.issueModel.findOne({ id });
  }

  async remove(id: number) {
    const existsIssue = await this.issueModel.findOne({ id });

    if(!existsIssue){
      throw new ConflictException(`Issue ${id} does not exists`);
    }

    await this.issueModel.deleteOne({ id });
    return existsIssue;
  }

  async findByName(name: string) {
    const existsIssue = await this.issueModel.findOne({ issueName: name });

    if(!existsIssue){
      throw new ConflictException(`Issue ${name} does not exists`);
    }

    return this.issueModel.findOne({ issueName: name });
  }

  async findByUserId(id: string) {

    const existsUser = await this.usersService.findById(id);

    if(!existsUser){
      throw new ConflictException(`User with id ${id} does not exists`);
    }
    
    return this.usersService.findById(id);
    
  } //TODO
}
