import { ActionAccessRights, Paging } from "./web.model";

export interface addParticipantToCot {
  participantIds: string[]
}

export interface ListParticipantCotResponse {
  cot: {
    id: string;
    startDate: Date;
    endDate: Date;
    trainingLocation: string;
    theoryInstructorRegGse: string;
    theoryInstructorCompetency: string;
    practicalInstructor1: string;
    practicalInstructor2: string;
    totalParticipants: number;
    status: string;
    capability: {
        id: string;
        ratingCode: string;
        trainingCode: string;
        trainingName: string;
        totalTheoryDurationRegGse: number;
        totalPracticeDurationRegGse: number;
        totalTheoryDurationCompetency: number;
        totalPracticeDurationCompetency: number;
        totalDuration: number;
    };
    participants: {
        data: {
            name: string;
            id: string;
            idNumber: string;
            dinas: string;
            simA?: boolean;
            simB?: boolean;
            tglKeluarSuratSehatButaWarna: Date;
            tglKeluarSuratBebasNarkoba: Date;
        }[];
        paging: Paging;
        actions: ActionAccessRights;
    };
  };
}
