export const KICK_FORM = 'KICK_FORM';

export type IKickForm = {
  visibil: boolean;
  initiator: { name: string; lastName: string };
  exclusion: { name: string; lastName: string };
};

export const kickForm = (kickData: IKickForm): any => ({
  type: KICK_FORM,
  kickData,
});
