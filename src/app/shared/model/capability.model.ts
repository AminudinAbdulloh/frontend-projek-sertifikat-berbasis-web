export interface CreateCapability {
  ratingCode: string;
  trainingCode: string;
  trainingName: string;
}

export interface UpdateCapability {
  ratingCode?: string;
  trainingCode?: string;
  trainingName?: string;
}

export interface Capability {
  id: string;
  ratingCode: string;
  trainingCode: string;
  trainingName: string;
  totalTheoryDurationRegGse?: string;
  totalPracticeDurationRegGse?: string;
  totalTheoryDurationCompetency?: string;
  totalPracticeDurationCompetency?: string;
  totalDuration?: string;
  curriculumSyllabus?: CurriculumSyllabus[];
}

export interface CapabilityResponse {
  code: number;
  status: string;
  data: Capability[] | Capability | string,
  actions: ActionAccessRigts,
  paging: Paging;
}

type CurriculumSyllabus = {
  id: string;
  capabilityId: string;
  name: string;
  theoryDuration: number;
  practiceDuration: number;
  type: string;
}

type ActionAccessRigts = {
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
}

type Paging = {
  currentPage: number;
  totalPage: number;
  size: number;
}
