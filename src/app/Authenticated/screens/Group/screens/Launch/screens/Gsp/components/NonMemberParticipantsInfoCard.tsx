import React, { FC, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { getPlansQuesAndData } from 'app/api-urls';
import { FetchStates } from '../../../shared/constants';
import useApiCall from '../../../shared/useApiCall';

type QnA = {
  question: String;
  answer: String;
};

export type BasicProps = {
  load?: Boolean;
  err?: Boolean;
  title: String;
  planId?: Number;
};

const getNonMembersParticipantsValue = (qNas?: QnA[]) => {
  if (qNas) {
    const nonMemberParticipantQnA: QnA | undefined = qNas?.find(
      ({ question }) =>
        question.trim().toLowerCase() ===
        'are there any non-member participants?'
    );
    if (nonMemberParticipantQnA) {
      return nonMemberParticipantQnA.answer.trim().toLowerCase() === 'yes'
        ? 'Yes'
        : 'No';
    }
  }
  return 'No results to display';
};

const NonMemberParticipantsInfoCard: FC<BasicProps> = ({
  title,
  planId,
}): JSX.Element => {
  const {
    currentState: qNasInfoCallState,
    response: qNas = { questions: [] },
    makeApiCall: makeqNasInfoCall,
  } = useApiCall({
    url: getPlansQuesAndData(planId),
    type: 'json',
  });

  useEffect(() => {
    if (planId && qNasInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeqNasInfoCall();
    }
  }, [qNasInfoCallState, makeqNasInfoCall, planId]);

  return (
    <>
      {qNasInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {qNasInfoCallState !== FetchStates.ERROR &&
        qNasInfoCallState !== FetchStates.PENDING && (
          <>
            <Typography
              gutterBottom
              variant="h3"
              component="h3"
              style={{ marginTop: '8px' }}
            >
              {title}
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <div style={{ fontWeight: 'bold' }}>
                  Are there any Non-member participants?
                </div>
                <Typography color="textSecondary" gutterBottom>
                  {getNonMembersParticipantsValue(qNas.questions)}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
    </>
  );
};

export default NonMemberParticipantsInfoCard;
