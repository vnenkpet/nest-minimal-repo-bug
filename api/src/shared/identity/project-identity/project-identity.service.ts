import { Injectable, Scope } from '@nestjs/common';
import { IProject } from 'src/model/project/project-repo/project-repo.service';

@Injectable({ scope: Scope.REQUEST })
export class ProjectIdentityService {
  private _project: IProject;

  set project(project: IProject) {
    this._project = project;
  }

  get project(): IProject {
    return this._project;
  }
}
