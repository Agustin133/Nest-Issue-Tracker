import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service'

@Injectable()
export class ProjectsService {
  
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>,
  private readonly usersService: AuthService,
){}
  
  async create(createProjectDto: CreateProjectDto) {

    const existsProject = await this.projectModel.findOne({ id: createProjectDto.id })

    if(existsProject){ 
      throw new ConflictException(`Project ${createProjectDto.id} already exists`);
    }

    if(createProjectDto.members){
      for (const name of createProjectDto.members) {
        const userExists = await this.usersService.findUsers( name );
        if (!userExists) {
          throw new NotFoundException(`User ${name} not found`);
        }
      }
    }

    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  findAll() {
    return this.projectModel.find();
  }

  async findOne(id: number) {
    const existProject = await this.projectModel.findOne({ id });

    if(!existProject){
      throw new ConflictException(`Project ${id} does not exists`);
    }

    return this.projectModel.findOne({ id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {

    const existsProjectOri = await this.projectModel.findOne({ id });

    if(!existsProjectOri){
      throw new ConflictException(`Project ${id} does not exists`);
    }

    if(updateProjectDto.members){
      for (const name of updateProjectDto.members) {
        const userExists = await this.usersService.findUsers( name );
        if (!userExists) {
          throw new NotFoundException(`User ${name} not found`);
        }
      }
    }

    if(updateProjectDto.id){
      const existProjectNew = await this.projectModel.findOne({ id: updateProjectDto.id });

      if(existProjectNew){
        throw new ConflictException(`Project ${id} already exists`);
      }
    }

    await this.projectModel.updateOne({ id }, updateProjectDto);
    return this.projectModel.findOne({ id });
  }

  async remove(id: number) {
    const existsProject = await this.projectModel.findOne({ id });

    if(!existsProject){
      throw new ConflictException(`Project ${id} does not exists`);
    }

    await this.projectModel.deleteOne({ id });
    return existsProject;
  }
}
