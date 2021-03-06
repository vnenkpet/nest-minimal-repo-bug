import {
  Resolver,
  InputType,
  Field,
  Mutation,
  ObjectType,
  registerEnumType,
  ID,
  Args,
  Query,
} from '@nestjs/graphql';
import {
  IProject,
  IProjectNode,
  UserRole,
  IProjectEdge,
  IProjectUser,
} from 'src/model/project/project-repo/project-repo.service';
import { ProjectService } from './project.service';

registerEnumType(UserRole, { name: 'UserRole' });

@InputType()
export class ProjectInputData {
  @Field()
  name: string;
}

@ObjectType()
export class Project implements Omit<IProject, 'dsn'> {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => [ProjectEdge])
  edges: ProjectEdge[];

  @Field(type => [ProjectNode])
  nodes: ProjectNode[];

  @Field(type => [ProjectUser])
  users: ProjectUser[];

  @Field()
  isPublic: boolean;
}

@ObjectType()
export class ProjectEdge implements IProjectEdge {
  @Field()
  id: string;
  @Field()
  sourceNodeId: string;
  @Field()
  targetNodeId: string;
}

@ObjectType()
export class ProjectNode implements IProjectNode {
  @Field()
  uniqueName: string;
}

@ObjectType()
export class ProjectUser implements IProjectUser {
  @Field()
  id: string;

  @Field(type => UserRole)
  role: UserRole;
}

@ObjectType()
export class ProjectMutationResponse {
  @Field(type => Project)
  project: Project;
}

@Resolver(of => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(returns => Project)
  async create(@Args('data') data: ProjectInputData): Promise<Project> {
    return this.projectService.create(data);
  }

  @Mutation(returns => [Project])
  async myProjects(): Promise<Project[]> {
    return this.projectService.getMyProjects();
  }

  //   @Query(returns => Project)
  //   async getProjectByDsn(): Promise<Project> {
  //     return this.projectService.getCurrentProject();
  //   }
}
